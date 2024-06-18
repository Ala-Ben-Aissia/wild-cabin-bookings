import styled from 'styled-components'

import BookingDataBox from './BookingDataBox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import Spinner from '../../ui/Spinner'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from './useBooking'
import { useNavigate } from 'react-router-dom'
import { useCheckOut } from './useCheckOutBooking'
import { useDeleteBooking } from './useDeleteBooking'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail() {
  const { booking, isLoading } = useBooking()
  const { checkOut, isCheckingOut } = useCheckOut()
  const { deleteBooking, isDeleting } = useDeleteBooking()
  const moveBack = useMoveBack()
  const navigate = useNavigate()

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  if (isLoading) return <Spinner />

  const { status, id: bookingId } = booking

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>
            {status.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkIn/${bookingId}`)}>
            Check in
          </Button>
        )}
        {status === 'checked-in' && (
          <Button onClick={() => checkOut(bookingId)}>
            {isCheckingOut ? 'Checking out...' : 'Check out'}
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button $variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => {
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                  // will get called no matter if it is a success ot an error
                })
                // navigate('/bookings')
              }}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
