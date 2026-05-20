import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/mockData'
import Header from '../components/Header'

export default function MakeOffer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const p = products.find(x => x.id === id) || products[0]
  const [price, setPrice] = useState('')
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  const submit = () => {
    if (!price) return
    setSent(true)
    setTimeout(() => navigate(-1), 2000)
  }

  if (sent) {
    return (
      <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>🔔</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>ส่งข้อเสนอแล้ว!</h2>
        <p style={{ color: '#888', textAlign: 'center' }}>รอร้านค้าตอบรับข้อเสนอของคุณ</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column' }}>
      <Header title="เสนอราคา" />
      <div style={{ flex: 1, padding: '20px 20px' }}>
        {/* Product summary */}
        <div style={{ display: 'flex', gap: 12, background: '#1a1a1a', borderRadius: 12, padding: 14, marginBottom: 24 }}>
          <img src={p.image} alt={p.title} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />
          <div>
            <p className="line-clamp-2" style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{p.title}</p>
            <p style={{ color: '#888', fontSize: 12 }}>{p.seller}</p>
            <p style={{ color: '#FF0080', fontWeight: 700, fontSize: 14, marginTop: 4 }}>ราคาตั้ง ฿{p.price.toLocaleString()}</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, display: 'block' }}>ราคาที่ต้องการเสนอ (บาท)</label>
            <input type="number" placeholder="กรอกราคา" value={price} onChange={e => setPrice(e.target.value)}
              style={{ fontSize: 24, fontWeight: 700, color: '#FF0080', textAlign: 'center', padding: '16px' }} />
            {price && +price < p.price && (
              <p style={{ color: '#FF0080', fontSize: 12, marginTop: 6, textAlign: 'center' }}>
                ลด {Math.round((1 - price / p.price) * 100)}% จากราคาตั้ง
              </p>
            )}
          </div>

          {/* Quick pick */}
          <div>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>เลือกเร็ว</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[0.9, 0.85, 0.8, 0.75].map(r => (
                <button key={r} onClick={() => setPrice(String(Math.floor(p.price * r)))}
                  style={{
                    flex: 1, padding: '8px 4px', background: '#1a1a1a', border: '1px solid #333',
                    borderRadius: 8, color: '#fff', fontSize: 11, cursor: 'pointer',
                  }}>
                  -{Math.round((1 - r) * 100)}%<br />
                  <span style={{ color: '#FF0080', fontSize: 12, fontWeight: 700 }}>฿{Math.floor(p.price * r).toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, display: 'block' }}>ข้อความถึงร้านค้า (ไม่บังคับ)</label>
            <textarea rows={3} placeholder="เช่น ต้องการราคานี้เพราะ..." value={note} onChange={e => setNote(e.target.value)} />
          </div>
        </div>

        <button className="btn-pink" onClick={submit} disabled={!price} style={{ marginTop: 24 }}>
          ส่งข้อเสนอ ฿{price ? (+price).toLocaleString() : '...'}
        </button>
      </div>
    </div>
  )
}
