/**
 * Reusable progress bar for scores, form completion, loading states, etc.
 * @param {number} value - 0–100
 * @param {string} [variant] - 'default' | 'success' | 'warning' | 'danger'
 * @param {boolean} [showLabel] - show percentage label
 * @param {string} [className]
 */
export default function ProgressBar({
  value = 0,
  variant = 'default',
  showLabel = false,
  className = '',
}) {
  const clamped = Math.min(100, Math.max(0, Number(value)))
  return (
    <div className={`progress-bar-wrapper ${className}`.trim()}>
      <div className="progress-bar-track" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={`progress-bar-fill progress-bar-${variant}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="progress-bar-label">{Math.round(clamped)}%</span>
      )}
    </div>
  )
}
