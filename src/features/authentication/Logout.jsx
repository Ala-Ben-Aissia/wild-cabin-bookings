import { HiArrowRightEndOnRectangle } from 'react-icons/hi2'
import ButtonIcon from '../../ui/ButtonIcon'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogout } from './useLogout'

function Logout() {
  const { logout, isLogginOut } = useLogout()
  return (
    <ButtonIcon disabled={isLogginOut} onClick={logout}>
      {isLogginOut ? <SpinnerMini /> : <HiArrowRightEndOnRectangle />}
    </ButtonIcon>
  )
}

export default Logout
