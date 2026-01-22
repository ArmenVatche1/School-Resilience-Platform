export default function SRPButton({ children, onClick, className = "", ...props }) {
    return (
      <button
        onClick={onClick}
        className={
          "bg-srpAqua hover:bg-srpTeal text-white px-4 py-2 rounded-lg font-semibold transition shadow-md " +
          className
        }
        {...props}
      >
        {children}
      </button>
    )
  }
  