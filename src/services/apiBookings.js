import { PAGE_SIZE } from '../utils/constants'
import { getToday } from '../utils/helpers'
import supabase from './supabase'

export async function getAllBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    .select(
      'id, createdAt, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
      { count: 'exact' },
    )

  if (filter)
    query = query[filter.method ?? 'eq'](filter.field, filter.value)

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.order === 'asc',
    })

  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = page * PAGE_SIZE - 1
    query = query.range(from, to)
  }

  const { data, error, count } = await query

  if (error) {
    console.error(error)
    throw new Error('Bookings could not be loaded!')
  }

  return { bookings: data, count }
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking not found')
  }

  return data
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('createdAt, totalPrice, extrasPrice')
    .gte('createdAt', date)
    .lte('createdAt', getToday({ end: true }))

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday())

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  const confirmedStays = data?.filter(
    (stay) => stay.status !== 'unconfirmed',
  )

  return confirmedStays
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order('createdAt')

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking could not be updated')
  }

  return data
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Booking could not be deleted')
  }

  return data
}
