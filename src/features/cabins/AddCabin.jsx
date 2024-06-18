import React from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = React.useState(false)

//   function toggleModal() {
//     setIsOpenModal((s) => !s)
//   }

//   function closeModal() {
//     setIsOpenModal(false)
//   }

//   return (
//     <div>
//       <Button onClick={toggleModal}>Add new cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={closeModal}>
//           <CreateCabinForm closeModal={closeModal} />
//         </Modal>
//       )}
//     </div>
//   )
// }

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
        {/* <Modal.Open opens='settings-form'>
        <Button>Update hotel settings</Button>
        </Modal.Open>
        <Modal.Window name='settings-form'>
        <UpdateSettingsForm />
        </Modal.Window> */}
        {/* But only one of these modals can be open at the same time => each button (Open) should know which Window to open */}
      </Modal>
    </div>
  )
}

// in this case, this Modal is not ideal when it comes to the state management because it is rendered based on the isOpenModal state (which by the way is not its own state)
// we don't want the component who uses this modal to be responsible for creating this piece of state or to keep track of whether the modal is open or not => it's not the task of this <AddCabin />
// instead the modal itself should know if it is open or not => it should keep this state internally (encapsulated)
// Finally, this component should give us simply a way to open the modal, as well as a way to pass its content (modal = button + window)
// => Perfect use for compound component pattern

export default AddCabin
