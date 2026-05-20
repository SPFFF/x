import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { orders } from '../data/mockData'
import Header from '../components/Header'

const tabs = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'waiting_payment', label: 'รอชำระ' },
  { key: 'preparing', label: 'เตรียมสินค้า' },
  { key: 'shipping', label: 'จัดส่ง' },
  { key: 'done', label: 'เสร็จสิ้น' },
  { key: 'cancelled', label: 'ยกเลิก' },
]

const statusLabel = {
  waiting_payment: { label: 'รอชำระเงิน', color: '#FFB800' },
  preparing: { label: 'กำลังเตรียม', color: '#00BFFF' },
  shipping: { label: 'กำลังจัดส่ง', color: '#00FF9D' },
  done: { label: 'เสร็จสิ้น', color: '#888' },
  cancelled: { label: 'ยกเลิกแล้ว', color: '#FF4444' },
}

export default function Orders() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const initTab = params.get('tab') || 'all'
  const [tab, setTab] = useState(initTab)

  const list = tab === 'all' ? orders : orders.filter(o => o.status === tab)

  return (
    <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column' }}>
      <Header title="คำสั่งซื้อของฉัน" />
      {/* Tabs */}
      <div style={{ display: 'flex', overflowX: 'auto', background: '#1a1a1a', borderBottom: '1px solid #222' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flexShrink: 0, padding: '12px 14px', background: 'none', border: 'none',
            color: tab === t.key ? '#FF0080' : '#888',
            borderBottom: tab === t.key ? '2px solid #FF0080' : '2px solid transparent',
            fontSize: 12, cursor: 'pointer', fontWeight: tab === t.key ? 700 : 400,
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#555' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
            <p>ยังไม่มีคำสั่งซื้อ</p>
          </div>
        ) : list.map(o => {
          const s = statusLabel[o.status]
          return (
            <div key={o.id} onClick={() => navigate(`/order/${o.id}`)}
              style={{ background: '#1a1a1a', borderRadius: 12, padding: 14, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ color: '#888', fontSize: 12 }}>{o.date}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.label}</span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <img src={o.product.image} alt={o.product.title}
                  style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <p className="line-clamp-2" style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{o.product.title}</p>
                  <p style={{ color: '#888', fontSize: 12 }}>{o.product.seller}</p>
                  <p style={{ color: '#FF0080', fontWeight: 700, fontSize: 15, marginTop: 4 }}>฿{o.price.toLocaleString()}</p>
                </div>
              </div>
              {o.status === 'waiting_payment' && (
                <button className="btn-pink" style={{ marginTop: 12, padding: '10px' }}
                  onClick={e => { e.stopPropagation(); navigate(`/payment/${o.product.id}`) }}>
                  ชำระเงินทันที
                </button>
              )}
              {o.status === 'done' && (
                <button className="btn-outline" style={{ marginTop: 12, padding: '10px' }}>
                  เขียนรีวิว
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
