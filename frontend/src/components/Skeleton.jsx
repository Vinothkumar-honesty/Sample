export default function Skeleton({ variant = 'text', className = '', style }) {
  const base = 'skeleton'
  const variantClass = variant === 'card' ? 'skeleton-card' : variant === 'title' ? 'skeleton-title' : 'skeleton-text'
  return <div className={`${base} ${variantClass} ${className}`.trim()} style={style} aria-hidden />
}

export function DashboardSkeleton() {
  return (
    <div className="dashboard">
      <div className="skeleton skeleton-title" style={{ height: '1.5rem', width: '200px', marginBottom: '1rem' }} />
      <section className="dashboard-cards">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card stat-card">
            <div className="skeleton skeleton-text" style={{ width: 36, height: 36, borderRadius: '50%', marginBottom: '0.35rem' }} />
            <div className="skeleton skeleton-text" style={{ width: '70%', marginBottom: '0.75rem' }} />
            <div className="skeleton skeleton-text" style={{ width: '40%', height: '1.25rem', marginBottom: '0.35rem' }} />
            <div className="skeleton skeleton-text" style={{ width: '60%' }} />
            <div className="skeleton skeleton-text" style={{ width: '80px', height: '36px', marginTop: '1rem', borderRadius: 'var(--radius)' }} />
          </div>
        ))}
      </section>
      <h2 style={{ marginTop: '2rem' }}>
        <div className="skeleton skeleton-text" style={{ width: 200, height: 24 }} />
      </h2>
      <div className="card" style={{ maxWidth: 600, marginTop: '1rem' }}>
        <div className="skeleton skeleton-text" style={{ width: '30%', marginBottom: '1rem' }} />
        <div className="skeleton skeleton-text" style={{ width: '50%', height: '2.5rem', marginBottom: '1rem' }} />
        <div className="skeleton skeleton-text" style={{ width: '100%', height: 80, borderRadius: 'var(--radius)' }} />
      </div>
    </div>
  )
}
