import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LogoutButton from "../components/LogoutButton"
import SRPButton from "../components/SRPButton"



export default function TeacherPage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const username = localStorage.getItem("username")
  const role = localStorage.getItem("role")

  useEffect(() => {
    if (!username || role !== "teacher") {
      navigate("/login")
      return
    }

    async function fetchSubmissions() {
      try {
        const res = await fetch("http://localhost:8000/api/submissions")
        const data = await res.json()
        setSubmissions(data)
      } catch (err) {
        console.error(err)
        setError("Unable to load submissions.")
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [username, role, navigate])

  if (!username || role !== "teacher") return null

  return (
    <div className="min-h-screen bg-srpNavy text-white p-6">
       <LogoutButton />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">Teacher Dashboard</h1>
        <SRPButton
            onClick={() => window.location.reload()}
            className="mb-4 text-sm px-3 py-1.5">
              Refresh Submissions
        </SRPButton>

        <p className="text-sm text-slate-200 mb-4">
          Logged in as <span className="font-semibold">{username}</span>
        </p>

        {loading && <p>Loading submissions…</p>}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-xs">
            {error}
          </div>
        )}

        {!loading && submissions.length === 0 && (
          <p className="text-slate-200">No submissions yet.</p>
        )}

        {!loading && submissions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-white text-srpNavy rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-srpTeal text-white">
                <tr>
                  <th className="px-3 py-2 text-left">Student</th>
                  <th className="px-3 py-2 text-left">Skill</th>
                  <th className="px-3 py-2 text-left">Statement</th>
                  <th className="px-3 py-2 text-left">Words</th>
                  <th className="px-3 py-2 text-left">Timestamp</th>
                  <th className="px-3 py-2 text-left">Ofsted Checklist</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s, idx) => (
                  <tr key={idx} className="border-t border-slate-200">
                    <td className="px-3 py-2">{s.student_id}</td>
                    <td className="px-3 py-2">{s.skill}</td>
                    <td className="px-3 py-2 max-w-md">{s.statement}</td>
                    <td className="px-3 py-2">{s.word_count}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">
                      {new Date(s.timestamp).toLocaleString()}
                    </td>
                    <td className="px-3 py-2">
                      {s.ofsted_check && (
                        <ul className="text-xs">
                          {Object.entries(s.ofsted_check).map(
                            ([category, ok]) => (
                              <li key={category}>
                                <span className="font-semibold">{category}:</span>{" "}
                                <span className={ok ? "text-green-700" : "text-slate-500"}>
                                  {ok ? "✔ evidence" : "– not obvious"}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
