import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/mockData'

const categories = ['ทั้งหมด', 'Figurine', 'Beauty', 'Collectible', 'Vintage', 'Fashion']
const sorts = ['ล่าสุด', 'ราคาน้อย-มาก', 'ราคามาก-น้อย', 'ยอดนิยม']

export default function Marketplace() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('ทั้งหมด')
  const [sort, setSort] = useState('ล่าสุด')

  let list = products.filter(p =>
    (cat === 'ทั้งหมด' || p.category === cat) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase()))
  )
  if (sort === 'ราคาน้อย-มาก') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'ราคามาก-น้อย') list = [...list].sort((a, b) => b.price - a.price)
  if (sort === 'ยอดนิยม') list = [...list].sort((a, b) => b.likes - a.likes)

  return (
    <div className="page" style={{ background: '#111' }}>
      <div style={{ padding: '16px 16px 8px', background: '#111', position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>🛍️ Marketplace</h1>
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <input placeholder="ค้นหาสินค้า..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 40, borderRadius: 12 }} />
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#666', fontSize: 16 }}>🔍</span>
        </div>
        {/* Categories */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 20,
              background: cat === c ? '#FF0080' : '#1a1a1a',
              color: '#fff', border: 'none', fontSize: 12, cursor: 'pointer', fontWeight: cat === c ? 700 : 400,
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Sort + count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px 12px' }}>
        <span style={{ color: '#888', fontSize: 13 }}>{list.length} รายการ</span>
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: 8, padding: '6px 10px', fontSize: 12 }}>
          {sorts.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 16px' }}>
        {list.map(p => (
          <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="card" style={{ cursor: 'pointer' }}>
            <div style={{ position: 'relative' }}>
              <img src={p.image} alt={p.title} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
              {p.isLive && <span className="live-badge" style={{ position: 'absolute', top: 6, left: 6 }}>LIVE</span>}
            </div>
            <div style={{ padding: '10px 10px 12px' }}>
              <p style={{ fontSize: 11, color: '#888', marginBottom: 3 }}>{p.seller}</p>
              <p className="line-clamp-2" style={{ fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: 1.4, marginBottom: 6 }}>{p.title}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#FF0080' }}>฿{p.price.toLocaleString()}</p>
              <p style={{ fontSize: 11, color: '#666', textDecoration: 'line-through' }}>฿{p.originalPrice?.toLocaleString()}</p>
              <p style={{ fontSize: 11, color: '#666', marginTop: 4 }}>❤️ {p.likes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
