import srpLogo from "../assets/srp-logo.png"

export default function CornerLogo() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-srpNavy/80 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg border border-srpTeal/40">
        <img
          src={srpLogo}
          alt="School Resilience Platform"
          className="h-8 w-auto"
        />
      </div>
    </div>
  )
}
