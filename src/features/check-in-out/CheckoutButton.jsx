import Button from '../../ui/Button'
import ConfirmCheckout from '../../ui/ConfirmCheckout'
import Modal from '../../ui/Modal'
import { useCheckOut } from '../bookings/useCheckOutBooking'

function CheckoutButton({ bookingId, guestName }) {
  const { checkOut, isCheckingOut } = useCheckOut()

  return (
    <Modal>
      <Modal.Open opens="check out">
        <Button size="small" $variation="danger">
          check out
        </Button>
      </Modal.Open>
      <Modal.Window name="check out">
        <ConfirmCheckout
          guestName={guestName}
          onConfirm={() => checkOut(bookingId)}
          disabled={isCheckingOut}
        />
      </Modal.Window>
    </Modal>
  )
}

export default CheckoutButton
