import { useNavigate } from "react-router-dom"
import SRPButton from "./SRPButton"

export default function LogoutButton() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem("username")
    localStorage.removeItem("role")
    navigate("/login")
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <SRPButton onClick={handleLogout} className="text-sm px-3 py-1.5">
        Log Out
      </SRPButton>
    </div>
  )
}
