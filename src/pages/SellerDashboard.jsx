import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'

const metrics = [
  { label: 'รายได้วันนี้', value: '฿12,450', change: '+18%', up: true },
  { label: 'คำสั่งซื้อใหม่', value: '8', change: '+3', up: true },
  { label: 'ผู้ติดตาม', value: '2,341', change: '+24', up: true },
  { label: 'รีวิว', value: '4.8 ⭐', change: '234 รีวิว', up: true },
]

export default function SellerDashboard() {
  const { user } = useApp()
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column' }}>
      <Header title="แดชบอร์ดผู้ขาย" />
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 24 }}>
        {/* Welcome */}
        <div style={{ background: 'linear-gradient(135deg, #FF0080 0%, #7b00ff 100%)', padding: '20px 20px' }}>
          <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>สวัสดี, {user?.name} 👋</p>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>ร้านค้าของคุณ</h2>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button onClick={() => navigate('/live/l1')} style={{
              background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 20, padding: '8px 16px', color: '#fff', fontSize: 13, cursor: 'pointer',
            }}>🔴 เริ่ม Live</button>
            <button onClick={() => navigate('/my-shop')} style={{
              background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 20, padding: '8px 16px', color: '#fff', fontSize: 13, cursor: 'pointer',
            }}>➕ เพิ่มสินค้า</button>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '16px' }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: '#1a1a1a', borderRadius: 12, padding: 14 }}>
              <p style={{ color: '#888', fontSize: 11, marginBottom: 6 }}>{m.label}</p>
              <p style={{ fontSize: 20, fontWeight: 800 }}>{m.value}</p>
              <p style={{ fontSize: 11, color: m.up ? '#00FF9D' : '#FF4444', marginTop: 4 }}>{m.change}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ padding: '0 16px 16px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>เมนูลัด</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { icon: '📦', label: 'สินค้า', path: '/my-shop' },
              { icon: '🛒', label: 'คำสั่งซื้อ', path: '/orders' },
              { icon: '💬', label: 'ข้อความ', path: '/messages' },
              { icon: '💰', label: 'รายได้', path: null },
              { icon: '⭐', label: 'รีวิว', path: null },
              { icon: '📊', label: 'สถิติ', path: null },
            ].map(item => (
              <button key={item.label} onClick={() => item.path && navigate(item.path)} style={{
                background: '#1a1a1a', border: 'none', borderRadius: 12,
                padding: '16px 8px', cursor: 'pointer', color: '#fff',
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                <p style={{ fontSize: 12 }}>{item.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>คำสั่งซื้อล่าสุด</h3>
            <button onClick={() => navigate('/orders')} style={{ background: 'none', border: 'none', color: '#FF0080', fontSize: 12, cursor: 'pointer' }}>ดูทั้งหมด</button>
          </div>
          {[
            { id: '#001', customer: 'สมชาย ใจดี', product: 'Anime Figure', price: 1750, status: 'ใหม่' },
            { id: '#002', customer: 'มาลี รัก', product: 'Make Up Set', price: 890, status: 'เตรียม' },
            { id: '#003', customer: 'วิชัย สุข', product: 'Rare Figure', price: 4200, status: 'จัดส่ง' },
          ].map(o => (
            <div key={o.id} style={{ background: '#1a1a1a', borderRadius: 10, padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{o.id}</span>
                <span style={{
                  fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 700,
                  background: o.status === 'ใหม่' ? '#FF0080' : o.status === 'เตรียม' ? '#00BFFF22' : '#00FF9D22',
                  color: o.status === 'ใหม่' ? '#fff' : o.status === 'เตรียม' ? '#00BFFF' : '#00FF9D',
                }}>{o.status}</span>
              </div>
              <p style={{ color: '#888', fontSize: 12 }}>{o.customer} · {o.product}</p>
              <p style={{ color: '#FF0080', fontWeight: 700, fontSize: 14, marginTop: 4 }}>฿{o.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
