import { useNavigate } from 'react-router-dom'

export default function Header({ title, back, right }) {
  const navigate = useNavigate()
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '16px',
      background: '#111', borderBottom: '1px solid #222',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      {back !== false && (
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', color: '#fff',
          cursor: 'pointer', padding: '4px 12px 4px 0', fontSize: 20,
        }}>←</button>
      )}
      <h1 style={{ flex: 1, fontSize: 18, fontWeight: 700, color: '#fff', margin: 0 }}>{title}</h1>
      {right && <div>{right}</div>}
    </div>
  )
}
