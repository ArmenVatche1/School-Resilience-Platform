// src/components/StatementForm.jsx
import { useState } from "react"

export default function StatementForm({ studentId }) {
  const [form, setForm] = useState({
    skill: "Resilience",
    context: "",
    action: "",
    impact: "",
  })

  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setResult(null)

    if (!studentId) {
      setError("No student ID found. Please log in again.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          ...form,
        }),
      })

      const data = await res.json()

      if (data.statement) {
        setResult(data)
      } else if (data.error) {
        setError(data.error)
      } else {
        setError("Unexpected response from server.")
      }
    } catch (err) {
      console.error(err)
      setError("Unable to contact the server.")
    } finally {
      setLoading(false)
    }
  }

  function handleRegenerate() {
    // Simply resubmit same form
    handleSubmit({ preventDefault: () => {} })
  }

  return (
    <div className="bg-white text-srpNavy p-6 rounded-2xl shadow-xl border border-srpTeal/30">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Skill</label>
          <select
            name="skill"
            onChange={handleChange}
            value={form.skill}
            className="w-full border border-srpTeal/40 rounded-lg px-3 py-2 text-sm text-srpNavy focus:outline-none focus:ring-2 focus:ring-srpAqua"
          >
            <option>Resilience</option>
            <option>Adaptability</option>
            <option>Problem-Solving</option>
            <option>Communication</option>
            <option>Collaboration</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Context</label>
          <input
            name="context"
            onChange={handleChange}
            value={form.context}
            placeholder="When/where did this happen?"
            className="w-full border border-srpTeal/40 rounded-lg px-3 py-2 text-sm text-srpNavy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-srpAqua"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Action</label>
          <input
            name="action"
            onChange={handleChange}
            value={form.action}
            placeholder="What did you do?"
            className="w-full border border-srpTeal/40 rounded-lg px-3 py-2 text-sm text-srpNavy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-srpAqua"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Impact</label>
          <input
            name="impact"
            onChange={handleChange}
            value={form.impact}
            placeholder="What difference did it make?"
            className="w-full border border-srpTeal/40 rounded-lg px-3 py-2 text-sm text-srpNavy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-srpAqua"
          />
        </div>

        <button
          className="bg-srpAqua hover:bg-srpTeal transition text-white px-4 py-2 rounded-lg w-full text-sm font-semibold disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Generating…" : "Generate Statement"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mt-4 rounded text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="bg-slate-50 p-4 mt-4 rounded-xl text-sm text-srpNavy">
          <strong>Generated Statement:</strong>
          <p className="mt-1">{result.statement}</p>

          <p className="text-xs text-gray-600 mt-2">
            Word count: <strong>{result.word_count}</strong>
          </p>

          {result.ofsted_check && (
            <div className="mt-2">
              <p className="font-medium text-sm">Ofsted Checklist:</p>
              <ul className="mt-1 space-y-0.5">
                {Object.entries(result.ofsted_check).map(([cat, ok]) => (
                  <li key={cat}>
                    <span className="font-semibold">{cat}:</span>{" "}
                    <span className={ok ? "text-green-700" : "text-gray-500"}>
                      {ok ? "✔ evidence" : "– not obvious"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="button"
            onClick={handleRegenerate}
            className="mt-3 inline-block bg-srpNavy text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-srpTeal transition"
          >
            Generate another version
          </button>
        </div>
      )}
    </div>
  )
}
