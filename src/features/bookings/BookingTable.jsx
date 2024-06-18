import BookingRow from './BookingRow'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import Spinner from '../../ui/Spinner'
import Empty from '../../ui/Empty'
import useBookings from './useBookings'
import Pagination from '../../ui/Pagination'
// import { useSearchParams } from 'react-router-dom'

function BookingTable() {
  const { bookings, isLoading, count } = useBookings()
  // const [searchParams] = useSearchParams()

  // const filterValue = searchParams.get('status')

  if (isLoading) return <Spinner />

  if (!bookings.length) return <Empty resource="bookings" />

  // const filteredBookings =
  //   filterValue === 'checked-in'
  //     ? bookings.filter((b) => b.status === 'checked-in')
  //     : filterValue === 'checked-out'
  //     ? bookings.filter((b) => b.status === 'checked-out')
  //     : filterValue === 'unconfirmed'
  //     ? bookings.filter((b) => b.status === 'unconfirmed')
  //     : bookings

  // let's filter the bookings on the server side this time.

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  )
}

export default BookingTable
