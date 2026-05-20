import { useState } from 'react'
import { notifications as notifData } from '../data/mockData'

export default function Notifications() {
  const [notifs, setNotifs] = useState(notifData)
  const [modal, setModal] = useState(null)

  const markRead = (id) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const open = (n) => {
    setModal(n)
    markRead(n.id)
  }

  const markAll = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))

  return (
    <div className="page" style={{ background: '#111' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 16px 12px', position: 'sticky', top: 0, background: '#111', zIndex: 10 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>🔔 แจ้งเตือน</h1>
        <button onClick={markAll} style={{ background: 'none', border: 'none', color: '#FF0080', fontSize: 12, cursor: 'pointer' }}>
          อ่านทั้งหมด
        </button>
      </div>

      {notifs.map(n => (
        <div key={n.id} onClick={() => open(n)} style={{
          display: 'flex', gap: 14, padding: '14px 16px',
          borderBottom: '1px solid #1e1e1e', cursor: 'pointer',
          background: n.read ? 'transparent' : 'rgba(255,0,128,0.04)',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: n.read ? '#1e1e1e' : '#2a0020',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
          }}>{n.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <p style={{ fontWeight: n.read ? 400 : 700, fontSize: 14 }}>{n.title}</p>
              {!n.read && <span style={{ width: 8, height: 8, background: '#FF0080', borderRadius: '50%', flexShrink: 0, marginTop: 4 }} />}
            </div>
            {n.body && <p style={{ color: '#888', fontSize: 12, lineHeight: 1.4 }}>{n.body}</p>}
            <p style={{ color: '#555', fontSize: 11, marginTop: 4 }}>{n.time}</p>
          </div>
        </div>
      ))}

      {/* Modal */}
      {modal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24, zIndex: 200,
        }} onClick={() => setModal(null)}>
          <div style={{ background: '#1a1a1a', borderRadius: 16, padding: 24, width: '100%', maxWidth: 340 }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{modal.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{modal.title}</h3>
              {modal.body && <p style={{ color: '#aaa', fontSize: 14, lineHeight: 1.6 }}>{modal.body}</p>}
              <p style={{ color: '#666', fontSize: 12, marginTop: 12 }}>{modal.time}</p>
            </div>
            <button className="btn-pink" onClick={() => setModal(null)}>ตกลง</button>
          </div>
        </div>
      )}
    </div>
  )
}
