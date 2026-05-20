import { useParams, useNavigate } from 'react-router-dom'
import { orders } from '../data/mockData'
import Header from '../components/Header'

const steps = {
  waiting_payment: 0,
  preparing: 1,
  shipping: 2,
  done: 3,
  cancelled: -1,
}

const stepLabels = ['รอชำระเงิน', 'เตรียมสินค้า', 'กำลังจัดส่ง', 'ได้รับสินค้า']

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = orders.find(o => o.id === id) || orders[0]
  const stepIdx = steps[order.status]

  return (
    <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column' }}>
      <Header title="รายละเอียดคำสั่งซื้อ" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: 24 }}>
        {/* Order ID */}
        <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ color: '#888', fontSize: 13 }}>รหัสคำสั่งซื้อ</p>
            <p style={{ fontSize: 13, fontWeight: 600 }}>#ASP{order.id.slice(-4)}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <p style={{ color: '#888', fontSize: 13 }}>วันที่สั่งซื้อ</p>
            <p style={{ fontSize: 13 }}>{order.date}</p>
          </div>
          {order.trackingCode && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <p style={{ color: '#888', fontSize: 13 }}>เลขพัสดุ</p>
              <p style={{ fontSize: 13, color: '#00BFFF', fontWeight: 600 }}>{order.trackingCode}</p>
            </div>
          )}
        </div>

        {/* Progress */}
        {order.status !== 'cancelled' ? (
          <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <p style={{ fontWeight: 600, marginBottom: 16 }}>สถานะคำสั่งซื้อ</p>
            {stepLabels.map((label, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < 3 ? 0 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: i <= stepIdx ? '#FF0080' : '#333',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: '#fff', fontWeight: 700, flexShrink: 0,
                  }}>{i < stepIdx ? '✓' : i + 1}</div>
                  {i < 3 && <div style={{ width: 2, height: 28, background: i < stepIdx ? '#FF0080' : '#333', margin: '2px 0' }} />}
                </div>
                <div style={{ paddingBottom: i < 3 ? 20 : 0, paddingTop: 4 }}>
                  <p style={{ fontSize: 14, fontWeight: i === stepIdx ? 700 : 400, color: i <= stepIdx ? '#fff' : '#555' }}>{label}</p>
                  {i === stepIdx && <p style={{ fontSize: 12, color: '#888', marginTop: 2 }}>กำลังดำเนินการ...</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: '#2a0a0a', borderRadius: 12, padding: 16, marginBottom: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>❌</div>
            <p style={{ color: '#FF4444', fontWeight: 700 }}>คำสั่งซื้อถูกยกเลิก</p>
          </div>
        )}

        {/* Product */}
        <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <p style={{ color: '#888', fontSize: 12, marginBottom: 10 }}>สินค้า</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <img src={order.product.image} alt={order.product.title}
              style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />
            <div>
              <p className="line-clamp-2" style={{ fontSize: 13, fontWeight: 600 }}>{order.product.title}</p>
              <p style={{ color: '#888', fontSize: 12, marginTop: 4 }}>{order.product.seller}</p>
              <p style={{ color: '#FF0080', fontWeight: 700, fontSize: 15, marginTop: 4 }}>฿{order.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {order.status === 'waiting_payment' && (
            <button className="btn-pink" onClick={() => navigate(`/payment/${order.product.id}`)}>ชำระเงิน</button>
          )}
          {order.status === 'done' && (
            <button className="btn-pink">เขียนรีวิว</button>
          )}
          <button className="btn-outline" onClick={() => navigate(`/chat/c1`)}>ติดต่อร้านค้า</button>
          {['waiting_payment', 'preparing'].includes(order.status) && (
            <button style={{ background: 'none', border: '1px solid #FF4444', borderRadius: 30, padding: '13px', color: '#FF4444', fontSize: 14, cursor: 'pointer', width: '100%' }}>
              ยกเลิกคำสั่งซื้อ
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
