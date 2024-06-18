import styled from 'styled-components'
import Button from './Button'
import Heading from './Heading'

const StyledConfirmCheckout = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`

function ConfirmCheckout({
  guestName,
  onConfirm,
  closeModal,
  disabled,
}) {
  return (
    <StyledConfirmCheckout>
      <Heading as="h3">{`Checking out ' ${guestName} '`}</Heading>
      <p>Are you sure {guestName} is leaving ?</p>

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={closeModal}
        >
          No
        </Button>
        <Button
          $variation="danger"
          disabled={disabled}
          onClick={onConfirm}
        >
          Yes
        </Button>
      </div>
    </StyledConfirmCheckout>
  )
}

export default ConfirmCheckout
