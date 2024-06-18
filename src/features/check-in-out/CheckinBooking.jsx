import styled from 'styled-components'
import BookingDataBox from '../../features/bookings/BookingDataBox'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from '../bookings/useBooking'
import Spinner from '../../ui/Spinner'
import Checkbox from '../../ui/Checkbox'
import { useLayoutEffect, useState } from 'react'
import { formatCurrency } from '../../utils/helpers'
import { useCheckIn } from '../bookings/useCheckInBooking'
import { useSettings } from '../settings/useSettings'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakFast, setAddBreakFast] = useState(false)
  const moveBack = useMoveBack()
  const { booking, isLoading } = useBooking()
  const { checkIn, isCheckingIn } = useCheckIn()

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking ?? {}

  const { settings, isLoading: isLoadingSettings } = useSettings()

  useLayoutEffect(() => {
    setConfirmPaid(isPaid ?? false)
  }, [isPaid])

  if (isLoading || isLoadingSettings) return <Spinner />

  function handleCheckin() {
    if (!confirmPaid) return
    if (addBreakFast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast, // true
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      })
    } else {
      checkIn({ bookingId })
    }
  }

  const optionalBreakfast =
    settings.breakfastPrice * numGuests * numNights

  const finalPrice = !addBreakFast
    ? formatCurrency(totalPrice)
    : `${formatCurrency(
        totalPrice + optionalBreakfast
      )} (${formatCurrency(totalPrice)} + ${formatCurrency(
        optionalBreakfast
      )})`

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox
        booking={{
          ...booking,
          extrasPrice: optionalBreakfast,
          totalPrice: !addBreakFast
            ? totalPrice
            : totalPrice + optionalBreakfast,
        }}
      />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((b) => !b)
              setConfirmPaid(false) // to re-calculate totalPrice
            }}
            disabled={addBreakFast}
          >
            Add Breakfast ({formatCurrency(optionalBreakfast)})
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="paid"
          checked={confirmPaid}
          onChange={() => setConfirmPaid((c) => !c)}
          disabled={confirmPaid}
        >
          I confirm guest &quot; {guests.fullName} &quot; has paid for
          the entire stay {finalPrice}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={!confirmPaid || isCheckingIn}
          onClick={handleCheckin}
        >
          {isCheckingIn
            ? 'Checking in...'
            : `Check in booking #${bookingId}`}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
