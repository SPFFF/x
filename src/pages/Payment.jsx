import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/mockData'
import Header from '../components/Header'

const methods = [
  { id: 'qr', label: 'QR Code พร้อมเพย์', icon: '📱' },
  { id: 'card', label: 'บัตรเครดิต/เดบิต', icon: '💳' },
  { id: 'bank', label: 'โอนเงินผ่านธนาคาร', icon: '🏦' },
]

export default function Payment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const p = products.find(x => x.id === id) || products[0]
  const [method, setMethod] = useState('qr')
  const [address, setAddress] = useState('123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110')
  const [done, setDone] = useState(false)
  const shipping = 50
  const total = p.price + shipping

  const confirm = () => {
    setDone(true)
    setTimeout(() => navigate('/orders'), 2500)
  }

  if (done) {
    return (
      <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>ชำระเงินสำเร็จ!</h2>
        <p style={{ color: '#888', textAlign: 'center' }}>คำสั่งซื้อของคุณกำลังดำเนินการ</p>
        <p style={{ color: '#FF0080', marginTop: 8 }}>รหัสคำสั่งซื้อ: #ASP{Date.now().toString().slice(-6)}</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column' }}>
      <Header title="ชำระเงิน" />
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', paddingBottom: 120 }}>
        {/* Product */}
        <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>สินค้า</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <img src={p.image} alt={p.title} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
            <div>
              <p className="line-clamp-2" style={{ fontSize: 13, fontWeight: 600 }}>{p.title}</p>
              <p style={{ color: '#888', fontSize: 12 }}>{p.seller}</p>
              <p style={{ color: '#FF0080', fontWeight: 700, fontSize: 14 }}>฿{p.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <p style={{ fontSize: 13, fontWeight: 600 }}>📍 ที่อยู่จัดส่ง</p>
            <button style={{ background: 'none', border: 'none', color: '#FF0080', fontSize: 12, cursor: 'pointer' }}>แก้ไข</button>
          </div>
          <textarea rows={2} value={address} onChange={e => setAddress(e.target.value)} style={{ fontSize: 13 }} />
        </div>

        {/* Payment method */}
        <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>วิธีชำระเงิน</p>
          {methods.map(m => (
            <label key={m.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 0', borderBottom: '1px solid #2a2a2a', cursor: 'pointer',
            }}>
              <input type="radio" name="method" value={m.id} checked={method === m.id}
                onChange={() => setMethod(m.id)} style={{ width: 'auto', accentColor: '#FF0080' }} />
              <span style={{ fontSize: 18 }}>{m.icon}</span>
              <span style={{ fontSize: 14 }}>{m.label}</span>
            </label>
          ))}
        </div>

        {/* QR Code placeholder */}
        {method === 'qr' && (
          <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 16 }}>
            <div style={{
              width: 160, height: 160, background: '#fff', borderRadius: 8,
              margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 60,
            }}>◼◼◼<br/>◻◼◻<br/>◼◼◼</div>
            <p style={{ color: '#888', fontSize: 13 }}>สแกน QR Code เพื่อชำระเงิน</p>
            <p style={{ color: '#FF0080', fontWeight: 700, fontSize: 18, marginTop: 8 }}>฿{total.toLocaleString()}</p>
          </div>
        )}

        {/* Summary */}
        <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 14 }}>
          <SumRow label="ราคาสินค้า" value={`฿${p.price.toLocaleString()}`} />
          <SumRow label="ค่าจัดส่ง" value={`฿${shipping}`} />
          <div style={{ borderTop: '1px solid #333', marginTop: 8, paddingTop: 8 }}>
            <SumRow label="รวมทั้งหมด" value={`฿${total.toLocaleString()}`} bold />
          </div>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: 16, background: '#111', borderTop: '1px solid #222' }}>
        <button className="btn-pink" onClick={confirm}>
          ยืนยันการชำระเงิน ฿{total.toLocaleString()}
        </button>
      </div>
    </div>
  )
}

function SumRow({ label, value, bold }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
      <span style={{ color: bold ? '#fff' : '#888', fontSize: bold ? 15 : 13, fontWeight: bold ? 700 : 400 }}>{label}</span>
      <span style={{ color: bold ? '#FF0080' : '#fff', fontSize: bold ? 16 : 13, fontWeight: bold ? 800 : 400 }}>{value}</span>
    </div>
  )
}
