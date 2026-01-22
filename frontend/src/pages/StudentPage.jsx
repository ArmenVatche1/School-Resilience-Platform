import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import StatementForm from "../components/StatementForm"
import LogoutButton from "../components/LogoutButton"

export default function StudentPage() {
  const navigate = useNavigate()
  const username = localStorage.getItem("username")
  const role = localStorage.getItem("role")

  useEffect(() => {
    if (!username || role !== "student") navigate("/login")
  }, [username, role, navigate])

  if (!username || role !== "student") return null

  return (
    <div className="min-h-screen bg-srpNavy text-white flex flex-col items-center pt-10 px-4">
      <LogoutButton />
      <div className="max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-1">Student Skills Statement</h1>
        <p className="text-sm text-slate-200 mb-4">
          Logged in as <span className="font-semibold">{username}</span>
        </p>
        <StatementForm studentId={username} />
      </div>
    </div>
  )
}
