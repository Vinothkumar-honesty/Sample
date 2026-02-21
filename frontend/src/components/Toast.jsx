export default function Toast({ message, type = 'info' }) {
  const icons = { success: '✓', error: '✕', info: 'ℹ' }
  return (
    <div className={`toast toast-${type}`} role="alert">
      <span className="toast-icon">{icons[type]}</span>
      <span className="toast-message">{message}</span>
    </div>
  )
}
