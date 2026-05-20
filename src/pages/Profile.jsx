import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Profile() {
  const { user, setUser } = useApp()
  const navigate = useNavigate()

  const logout = () => {
    setUser(null)
    navigate('/login', { replace: true })
  }

  return (
    <div className="page" style={{ background: '#111' }}>
      {/* Profile header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a0030 0%, #2d0050 100%)',
        padding: '32px 20px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: '#FF0080', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 28, border: '3px solid #FF0080',
          }}>
            {user?.name?.[0] || '?'}
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{user?.name}</h2>
            <p style={{ color: '#aaa', fontSize: 13 }}>{user?.email}</p>
            {user?.isSeller && (
              <span style={{ background: '#FF0080', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 700, marginTop: 4, display: 'inline-block' }}>
                ผู้ขาย
              </span>
            )}
          </div>
        </div>
        {/* Stats */}
        <div style={{ display: 'flex', gap: 0 }}>
          {[['128', 'ติดตาม'], ['45', 'กำลังติดตาม'], ['12', 'รีวิว']].map(([n, l]) => (
            <div key={l} style={{ flex: 1, textAlign: 'center', padding: '10px 0', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: 18, fontWeight: 700 }}>{n}</p>
              <p style={{ fontSize: 11, color: '#aaa' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div style={{ padding: '8px 0' }}>
        <Section title="คำสั่งซื้อของฉัน">
          <MenuItem icon="⏳" label="รอชำระเงิน" onClick={() => navigate('/orders?tab=waiting_payment')} />
          <MenuItem icon="📦" label="กำลังเตรียมสินค้า" onClick={() => navigate('/orders?tab=preparing')} />
          <MenuItem icon="🚚" label="กำลังจัดส่ง" onClick={() => navigate('/orders?tab=shipping')} />
          <MenuItem icon="✅" label="เสร็จสิ้น" onClick={() => navigate('/orders?tab=done')} />
          <MenuItem icon="❌" label="ยกเลิกแล้ว" onClick={() => navigate('/orders?tab=cancelled')} />
        </Section>

        <Section title="บัญชี">
          <MenuItem icon="👤" label="แก้ไขโปรไฟล์" />
          <MenuItem icon="🔒" label="ความปลอดภัย" />
          <MenuItem icon="📍" label="ที่อยู่จัดส่ง" />
          <MenuItem icon="💳" label="วิธีชำระเงิน" />
        </Section>

        {!user?.isSeller ? (
          <Section title="สำหรับผู้ขาย">
            <MenuItem icon="🏪" label="สมัครเป็นผู้ขาย" badge="ใหม่"
              onClick={() => navigate('/become-seller')} />
          </Section>
        ) : (
          <Section title="ร้านค้าของฉัน">
            <MenuItem icon="🏪" label="แดชบอร์ดผู้ขาย" onClick={() => navigate('/seller-dashboard')} />
            <MenuItem icon="📋" label="สินค้าของฉัน" onClick={() => navigate('/my-shop')} />
            <MenuItem icon="💰" label="รายได้" />
          </Section>
        )}

        <Section title="อื่นๆ">
          <MenuItem icon="❓" label="ศูนย์ช่วยเหลือ" />
          <MenuItem icon="⚙️" label="ตั้งค่า" />
          <MenuItem icon="🚪" label="ออกจากระบบ" color="#FF4444" onClick={logout} />
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <p style={{ padding: '10px 16px 6px', color: '#666', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{title}</p>
      <div style={{ background: '#1a1a1a' }}>{children}</div>
    </div>
  )
}

function MenuItem({ icon, label, badge, color, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px', borderBottom: '1px solid #222',
      cursor: onClick ? 'pointer' : 'default',
    }}>
      <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 14, color: color || '#fff' }}>{label}</span>
      {badge && <span className="badge">{badge}</span>}
      {onClick && <span style={{ color: '#555', fontSize: 18 }}>›</span>}
    </div>
  )
}
