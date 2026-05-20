import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sellers, products } from '../data/mockData'

export default function SellerProfile() {
  const navigate = useNavigate()
  const [seller, setSeller] = useState(sellers[0])
  const [tab, setTab] = useState('products')
  const [showBlock, setShowBlock] = useState(false)

  const toggleFollow = () => setSeller(s => ({ ...s, isFollowing: !s.isFollowing }))
  const block = () => {
    setSeller(s => ({ ...s, isBlocked: true }))
    setShowBlock(false)
    navigate(-1)
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column' }}>
      {/* Banner */}
      <div style={{ position: 'relative', height: 160 }}>
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2d0050, #0a0a2e)', objectFit: 'cover' }} />
        <button onClick={() => navigate(-1)} style={{
          position: 'absolute', top: 16, left: 16,
          background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
          width: 38, height: 38, cursor: 'pointer', color: '#fff', fontSize: 18,
        }}>←</button>
        <button onClick={() => setShowBlock(true)} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
          width: 38, height: 38, cursor: 'pointer', color: '#fff', fontSize: 18,
        }}>⋮</button>
      </div>

      {/* Profile info */}
      <div style={{ padding: '0 20px 16px', marginTop: -30, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', background: '#FF0080',
            border: '3px solid #111', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 28,
          }}>🏪</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigate('/messages')} style={{
              background: '#1a1a1a', border: 'none', borderRadius: 20,
              padding: '8px 14px', color: '#fff', fontSize: 13, cursor: 'pointer',
            }}>💬 ส่งข้อความ</button>
            <button onClick={toggleFollow} style={{
              background: seller.isFollowing ? '#1a1a1a' : '#FF0080',
              border: seller.isFollowing ? '1px solid #444' : 'none',
              borderRadius: 20, padding: '8px 16px', color: '#fff', fontSize: 13,
              cursor: 'pointer', fontWeight: 700,
            }}>
              {seller.isFollowing ? 'กำลังติดตาม' : 'ติดตาม'}
            </button>
          </div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{seller.name}</h2>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 12 }}>{seller.description}</p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontWeight: 700 }}>{seller.followers.toLocaleString()}</p>
            <p style={{ fontSize: 11, color: '#888' }}>ผู้ติดตาม</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontWeight: 700 }}>{seller.totalSales.toLocaleString()}</p>
            <p style={{ fontSize: 11, color: '#888' }}>ยอดขาย</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontWeight: 700 }}>⭐ {seller.rating}</p>
            <p style={{ fontSize: 11, color: '#888' }}>{seller.reviewCount} รีวิว</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #222', background: '#1a1a1a' }}>
        {['products', 'live', 'reviews'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '12px 0', background: 'none', border: 'none',
            color: tab === t ? '#FF0080' : '#666',
            borderBottom: tab === t ? '2px solid #FF0080' : '2px solid transparent',
            fontSize: 13, cursor: 'pointer', fontWeight: tab === t ? 700 : 400,
          }}>
            {t === 'products' ? 'สินค้า' : t === 'live' ? 'Live' : 'รีวิว'}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {tab === 'products' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {products.slice(0, 4).map(p => (
              <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="card" style={{ cursor: 'pointer' }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '8px 10px 12px' }}>
                  <p className="line-clamp-2" style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{p.title}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#FF0080' }}>฿{p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'live' && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#555' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📺</div>
            <p>ไม่มี Live ในขณะนี้</p>
          </div>
        )}
        {tab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[5, 5, 4, 4, 3].map((r, i) => (
              <div key={i} style={{ background: '#1a1a1a', borderRadius: 12, padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>ผู้ใช้ {i + 1}</span>
                  <span style={{ color: '#FFB800' }}>{'⭐'.repeat(r)}</span>
                </div>
                <p style={{ color: '#aaa', fontSize: 13 }}>สินค้าตรงปก จัดส่งเร็ว แพ็คดี แนะนำเลยครับ</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Block modal */}
      {showBlock && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-end', zIndex: 200 }}
          onClick={() => setShowBlock(false)}>
          <div style={{ background: '#1a1a1a', borderRadius: '20px 20px 0 0', width: '100%', padding: '20px 16px 40px' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <button onClick={() => setShowBlock(false)} style={{ background: 'none', border: 'none', color: '#fff', padding: '14px 0', fontSize: 15, cursor: 'pointer', borderBottom: '1px solid #2a2a2a', textAlign: 'left' }}>
                🔗 แชร์โปรไฟล์
              </button>
              <button onClick={() => setShowBlock(false)} style={{ background: 'none', border: 'none', color: '#fff', padding: '14px 0', fontSize: 15, cursor: 'pointer', borderBottom: '1px solid #2a2a2a', textAlign: 'left' }}>
                🚩 รายงาน
              </button>
              <button onClick={block} style={{ background: 'none', border: 'none', color: '#FF4444', padding: '14px 0', fontSize: 15, cursor: 'pointer', textAlign: 'left' }}>
                🚫 บล็อกผู้ใช้
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
