import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const tabs = [
  { path: '/home', label: 'หน้าหลัก', icon: HomeIcon },
  { path: '/marketplace', label: 'ช้อปปิ้ง', icon: ShopIcon },
  { path: '/messages', label: 'ข้อความ', icon: ChatIcon },
  { path: '/notifications', label: 'แจ้งเตือน', icon: BellIcon },
  { path: '/profile', label: 'โปรไฟล์', icon: PersonIcon },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { unreadMsg } = useApp()

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: '#1a1a1a', borderTop: '1px solid #2a2a2a',
      display: 'flex', zIndex: 100, paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {tabs.map(({ path, label, icon: Icon }) => {
        const active = pathname.startsWith(path)
        const showBadge = path === '/messages' && unreadMsg > 0
        return (
          <button key={path} onClick={() => navigate(path)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 2, padding: '10px 0', background: 'none', border: 'none',
              color: active ? '#FF0080' : '#666', cursor: 'pointer', fontSize: 10,
              position: 'relative',
            }}>
            <div style={{ position: 'relative' }}>
              <Icon size={22} color={active ? '#FF0080' : '#666'} />
              {showBadge && (
                <span style={{
                  position: 'absolute', top: -4, right: -6,
                  background: '#FF0080', color: '#fff', borderRadius: 999,
                  fontSize: 9, padding: '1px 4px', fontWeight: 700,
                }}>{unreadMsg}</span>
              )}
            </div>
            <span style={{ color: active ? '#FF0080' : '#666' }}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function HomeIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  )
}
function ShopIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}
function ChatIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  )
}
function BellIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  )
}
function PersonIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
