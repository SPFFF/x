import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/mockData'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const p = products.find(x => x.id === id) || products[0]

  return (
    <div className="page" style={{ background: '#111' }}>
      {/* Back button */}
      <div style={{ position: 'relative' }}>
        <img src={p.image} alt={p.title} style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(transparent 60%, rgba(0,0,0,0.6))',
        }} />
        <button onClick={() => navigate(-1)} style={{
          position: 'absolute', top: 16, left: 16,
          background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
          width: 38, height: 38, cursor: 'pointer', color: '#fff', fontSize: 18,
        }}>←</button>
        {p.isLive && (
          <span className="live-badge" style={{ position: 'absolute', top: 16, right: 16 }}>🔴 LIVE</span>
        )}
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <span style={{ background: '#1a1a1a', color: '#aaa', fontSize: 11, padding: '3px 8px', borderRadius: 4 }}>{p.category}</span>
          <span style={{ color: '#aaa', fontSize: 12 }}>❤️ {p.likes}</span>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1.4, margin: '8px 0 12px' }}>{p.title}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: '#FF0080' }}>฿{p.price.toLocaleString()}</span>
          {p.originalPrice && (
            <span style={{ fontSize: 16, color: '#666', textDecoration: 'line-through' }}>฿{p.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Seller */}
        <div onClick={() => navigate('/seller/s1')} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: '#1a1a1a', borderRadius: 12, padding: 14, marginBottom: 20, cursor: 'pointer',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', background: '#333',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}>🏪</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{p.seller}</p>
            <p style={{ color: '#888', fontSize: 12 }}>⭐ 4.8 · 892 ยอดขาย</p>
          </div>
          <span style={{ color: '#666' }}>›</span>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>รายละเอียดสินค้า</h3>
          <p style={{ color: '#aaa', fontSize: 14, lineHeight: 1.7 }}>
            สินค้าของแท้ 100% นำเข้าโดยตรง พร้อมใบรับรอง
            สภาพใหม่ ยังไม่แกะ กล่องสมบูรณ์ จัดส่งด้วยบรรจุภัณฑ์พิเศษ
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate(`/offer/${p.id}`)} className="btn-outline" style={{ flex: 1 }}>
            เสนอราคา
          </button>
          <button onClick={() => navigate(`/payment/${p.id}`)} className="btn-pink" style={{ flex: 1 }}>
            ซื้อเลย
          </button>
        </div>

        <button onClick={() => navigate('/messages')} style={{
          width: '100%', background: 'none', border: '1px solid #333',
          borderRadius: 30, padding: '13px', color: '#fff', fontSize: 14,
          cursor: 'pointer', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          💬 ส่งข้อความหาร้านค้า
        </button>
      </div>
    </div>
  )
}
