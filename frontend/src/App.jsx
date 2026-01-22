import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import StudentPage from "./pages/StudentPage"
import TeacherPage from "./pages/TeacherPage"
import CornerLogo from "./components/CornerLogo"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <CornerLogo />
    </>
  )
}
