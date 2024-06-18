import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'
import styled from 'styled-components'
import React from 'react'
import useOutsideClick from '../hooks/useOutsideClick'

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`

const ModalContext = React.createContext()

function Modal(props) {
  const [openName, setOpenName] = React.useState('')

  const open = setOpenName

  function close() {
    setOpenName('')
  }

  return (
    <ModalContext.Provider
      value={{ openName, open, close }}
      {...props}
    />
  )
}

function Open({ children, opens: windowName }) {
  const { open } = React.useContext(ModalContext)

  return React.cloneElement(children, {
    onClick: () => open(windowName),
  })
}

function Window({ children, name }) {
  const { openName, close } = React.useContext(ModalContext)
  const modalRef = useOutsideClick(close)

  return (
    name === openName &&
    createPortal(
      <Overlay>
        <StyledModal ref={modalRef}>
          <Button onClick={close}>
            <HiXMark />
          </Button>
          <div>
            {React.cloneElement(children, { closeModal: close })}
            {/* Form type is modal when closeModal is defined */}
          </div>
        </StyledModal>
      </Overlay>,
      document.body // where to render this portal in the DOM
      // document.getElementById("root")
      // now, while this portal Modal is outside the DOM structure of the app itself, it keeps the same place in the component tree... => No problems when passing props (invisible tunnel)
      // we usually use portal to avoid conflicts with css overflow and make sure the modal won't ever be cut off by and overflow property set to hidden on some parent element.
    )
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
