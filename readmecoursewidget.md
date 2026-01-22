import { useState } from "react"

export default function CourseStatementWidget() {
  const [form, setForm] = useState({
    skill: "Resilience",
    context: "",
    action: "",
    impact: "",
  })

  const [result, setResult] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch("http://localhost:8000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, mode: "single" }),
    })
    const data = await res.json()
    setResult(data.result || null)
  }

  return (
    <div className="bg-white border rounded p-4 text-sm">
      <p className="font-semibold mb-2">AI Skills Statement Helper</p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <select
          name="skill"
          onChange={handleChange}
          value={form.skill}
          className="w-full border p-1 rounded"
        >
          <option>Resilience</option>
          <option>Adaptability</option>
          <option>Problem-Solving</option>
          <option>Communication</option>
          <option>Collaboration</option>
        </select>
        <input
          name="context"
          onChange={handleChange}
          value={form.context}
          placeholder="Context"
          className="w-full border p-1 rounded"
        />
        <input
          name="action"
          onChange={handleChange}
          value={form.action}
          placeholder="Action"
          className="w-full border p-1 rounded"
        />
        <input
          name="impact"
          onChange={handleChange}
          value={form.impact}
          placeholder="Impact"
          className="w-full border p-1 rounded"
        />
        <button className="bg-blue-600 text-white w-full py-1 rounded text-sm">
          Generate
        </button>
      </form>

      {result && (
        <div className="mt-2 bg-gray-50 p-2 rounded">
          <p className="font-medium">Suggested statement:</p>
          <p>{result.statement}</p>
        </div>
      )}
    </div>
  )
}
