import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { products, liveStreams } from '../data/mockData'

export default function Home() {
  const { user } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.seller.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page" style={{ background: '#111' }}>
      {/* Top bar */}
      <div style={{ padding: '16px 16px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>ASAPH</span>
            <span style={{
              background: '#FF0080', color: '#fff', fontSize: 10,
              padding: '2px 6px', borderRadius: 4, fontWeight: 700,
            }}>LIVE</span>
          </div>
          <p style={{ color: '#666', fontSize: 12, marginTop: 2 }}>สวัสดี, {user?.name?.split(' ')[0]} 👋</p>
        </div>
        <button onClick={() => navigate('/notifications')} style={{
          background: '#1a1a1a', border: 'none', borderRadius: 10,
          padding: 10, cursor: 'pointer', position: 'relative',
        }}>
          <BellIcon />
          <span style={{
            position: 'absolute', top: 6, right: 6, width: 8, height: 8,
            background: '#FF0080', borderRadius: '50%',
          }} />
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '8px 16px 16px' }}>
        <div style={{ position: 'relative' }}>
          <input placeholder="ค้นหาสินค้า, ร้านค้า..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 40, borderRadius: 12 }} />
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#666', fontSize: 16 }}>🔍</span>
        </div>
      </div>

      {/* Live Now */}
      <div style={{ padding: '0 16px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>🔴 Live ตอนนี้</h2>
          <button style={{ background: 'none', border: 'none', color: '#FF0080', fontSize: 13, cursor: 'pointer' }}>ดูทั้งหมด</button>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {liveStreams.map(stream => (
            <div key={stream.id}
              onClick={() => navigate(`/live/${stream.id}`)}
              style={{
                minWidth: 140, borderRadius: 12, overflow: 'hidden',
                cursor: 'pointer', position: 'relative', flexShrink: 0,
              }}>
              <img src={stream.thumbnail} alt={stream.title}
                style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.8))',
              }} />
              {stream.isLive && (
                <span className="live-badge" style={{ position: 'absolute', top: 6, left: 6 }}>LIVE</span>
              )}
              <div style={{ position: 'absolute', bottom: 6, left: 8, right: 8 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#fff', lineHeight: 1.3 }} className="line-clamp-2">{stream.title}</p>
                <p style={{ fontSize: 10, color: '#ccc', marginTop: 2 }}>👁 {stream.viewers.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          borderRadius: 16, overflow: 'hidden', position: 'relative', height: 140,
          background: 'linear-gradient(135deg, #3d0066 0%, #1a0033 50%, #000 100%)',
        }}>
          <div style={{ padding: '20px 16px' }}>
            <p style={{ fontSize: 11, color: '#FF0080', fontWeight: 700, marginBottom: 4 }}>THE ULTIMATE</p>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>
              LIVE AUCTION<br />MARKETPLACE
            </h3>
            <button onClick={() => navigate('/marketplace')} style={{
              background: '#FF0080', color: '#fff', border: 'none',
              borderRadius: 20, padding: '7px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>ดูสินค้า →</button>
          </div>
          <div style={{ position: 'absolute', right: -10, bottom: -20, fontSize: 80, opacity: 0.15 }}>🏆</div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {['ทั้งหมด', 'Figurine', 'Beauty', 'Collectible', 'Vintage', 'Fashion'].map(cat => (
            <button key={cat} style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 20,
              background: cat === 'ทั้งหมด' ? '#FF0080' : '#1a1a1a',
              color: '#fff', border: 'none', fontSize: 12, cursor: 'pointer',
              fontWeight: cat === 'ทั้งหมด' ? 700 : 400,
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>สินค้าแนะนำ</h2>
          <button onClick={() => navigate('/marketplace')} style={{ background: 'none', border: 'none', color: '#FF0080', fontSize: 13, cursor: 'pointer' }}>ดูทั้งหมด</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onClick={() => navigate(`/product/${p.id}`)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product: p, onClick }) {
  return (
    <div onClick={onClick} className="card" style={{ cursor: 'pointer' }}>
      <div style={{ position: 'relative' }}>
        <img src={p.image} alt={p.title}
          style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
        {p.isLive && (
          <span className="live-badge" style={{ position: 'absolute', top: 6, left: 6 }}>LIVE</span>
        )}
        <button style={{
          position: 'absolute', top: 6, right: 6,
          background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
          width: 28, height: 28, cursor: 'pointer', color: '#fff', fontSize: 14,
        }}>♡</button>
      </div>
      <div style={{ padding: '10px 10px 12px' }}>
        <p style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>{p.seller}</p>
        <p className="line-clamp-2" style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.4, marginBottom: 8 }}>{p.title}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#FF0080' }}>฿{p.price.toLocaleString()}</span>
        </div>
        {p.originalPrice && (
          <span style={{ fontSize: 11, color: '#666', textDecoration: 'line-through' }}>฿{p.originalPrice.toLocaleString()}</span>
        )}
      </div>
    </div>
  )
}

function BellIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  )
}
