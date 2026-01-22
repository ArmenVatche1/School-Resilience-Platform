import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!data.success) {
        setError(data.error || "Login failed")
      } else {
        localStorage.setItem("username", form.username)
        localStorage.setItem("role", data.role)

        if (data.role === "student") navigate("/student")
        else if (data.role === "teacher") navigate("/teacher")
        else setError("Unknown role.")
      }
    } catch (err) {
      console.error(err)
      setError("Unable to contact server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-srpNavy">
      <div className="bg-white/95 text-srpNavy p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-srpTeal/30">
        <h1 className="text-2xl font-bold mb-2 text-center">
          FPP Statement System
        </h1>
        <p className="text-xs text-gray-600 mb-4 text-center">
          Prototype accounts:<br />
          <strong>Student</strong>: student1 / student123 &nbsp; • &nbsp;
          <strong>Teacher</strong>: teacher1 / teacher123
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="username"
            onChange={handleChange}
            value={form.username}
            placeholder="Username"
            className="w-full border border-srpTeal/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-srpAqua"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
            className="w-full border border-srpTeal/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-srpAqua"
          />
          <button
            className="bg-srpAqua hover:bg-srpTeal transition text-white w-full py-2 rounded-lg text-sm font-semibold disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mt-3 rounded text-xs">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
