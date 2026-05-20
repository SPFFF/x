import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/mockData'
import Header from '../components/Header'

export default function MyShop() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('active')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title: '', price: '', category: 'Figurine', description: '' })
  const [myProducts, setMyProducts] = useState(products.slice(0, 4))

  const add = () => {
    if (!form.title || !form.price) return
    setMyProducts(prev => [{
      id: `p_${Date.now()}`,
      title: form.title,
      seller: 'ร้านของฉัน',
      price: +form.price,
      image: 'https://images.unsplash.com/photo-1608889476518-738c9b1dcb40?w=400&q=80',
      category: form.category,
      likes: 0,
      isLive: false,
    }, ...prev])
    setShowAdd(false)
    setForm({ title: '', price: '', category: 'Figurine', description: '' })
  }

  const del = (id) => setMyProducts(prev => prev.filter(p => p.id !== id))

  return (
    <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column' }}>
      <Header title="สินค้าของฉัน" right={
        <button onClick={() => setShowAdd(true)} style={{
          background: '#FF0080', border: 'none', borderRadius: 20,
          padding: '7px 14px', color: '#fff', fontSize: 12, cursor: 'pointer', fontWeight: 700,
        }}>+ เพิ่มสินค้า</button>
      } />

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#1a1a1a', borderBottom: '1px solid #222' }}>
        {['active', 'draft', 'sold'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '12px 0', background: 'none', border: 'none',
            color: tab === t ? '#FF0080' : '#666',
            borderBottom: tab === t ? '2px solid #FF0080' : '2px solid transparent',
            fontSize: 13, cursor: 'pointer',
          }}>{t === 'active' ? 'กำลังขาย' : t === 'draft' ? 'แบบร่าง' : 'ขายแล้ว'}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {myProducts.map(p => (
          <div key={p.id} style={{ background: '#1a1a1a', borderRadius: 12, padding: 14, marginBottom: 12, display: 'flex', gap: 12 }}>
            <img src={p.image} alt={p.title} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8 }} />
            <div style={{ flex: 1 }}>
              <p className="line-clamp-2" style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{p.title}</p>
              <p style={{ color: '#FF0080', fontWeight: 700, fontSize: 14 }}>฿{p.price.toLocaleString()}</p>
              <p style={{ color: '#888', fontSize: 11, marginTop: 2 }}>{p.category} · ❤️ {p.likes}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button style={{ background: '#333', border: 'none', borderRadius: 6, padding: '6px 10px', color: '#fff', fontSize: 11, cursor: 'pointer' }}>แก้ไข</button>
              <button onClick={() => del(p.id)} style={{ background: '#2a0a0a', border: 'none', borderRadius: 6, padding: '6px 10px', color: '#FF4444', fontSize: 11, cursor: 'pointer' }}>ลบ</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add product modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'flex-end', zIndex: 200 }}>
          <div style={{ background: '#1a1a1a', borderRadius: '20px 20px 0 0', width: '100%', padding: '20px 20px 40px', maxHeight: '85dvh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>เพิ่มสินค้าใหม่</h3>
              <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', color: '#888', fontSize: 22, cursor: 'pointer' }}>×</button>
            </div>

            {/* Image upload */}
            <div style={{ background: '#111', borderRadius: 12, padding: 24, textAlign: 'center', border: '2px dashed #333', marginBottom: 16 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
              <p style={{ color: '#aaa', fontSize: 13 }}>แตะเพื่ออัพโหลดรูปสินค้า</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>ชื่อสินค้า</label>
                <input placeholder="ชื่อสินค้า" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>ราคา (บาท)</label>
                <input type="number" placeholder="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>หมวดหมู่</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  style={{ background: '#111', color: '#fff', border: '1px solid #333', borderRadius: 8, padding: '12px 16px', width: '100%', fontSize: 14 }}>
                  {['Figurine', 'Beauty', 'Collectible', 'Vintage', 'Fashion'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>คำอธิบาย</label>
                <textarea rows={3} placeholder="รายละเอียดสินค้า..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <button className="btn-pink" onClick={add}>เพิ่มสินค้า</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
