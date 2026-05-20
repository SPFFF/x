import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { liveStreams, products } from '../data/mockData'

const mockComments = [
  { id: 1, user: 'มาลี', text: 'สวยมากเลยค่ะ!! 😍', time: 0 },
  { id: 2, user: 'วิชัย', text: 'ราคาเท่าไหร่ครับ', time: 2 },
  { id: 3, user: 'สมหญิง', text: 'อยากได้มากเลย 🔥', time: 4 },
  { id: 4, user: 'ประยุทธ', text: 'จัดส่งได้ไหมครับ', time: 6 },
  { id: 5, user: 'แอน', text: 'ซื้อแล้วนะคะ!! ❤️', time: 8 },
]

export default function LiveViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const stream = liveStreams.find(s => s.id === id) || liveStreams[0]
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([mockComments[0]])
  const [viewers, setViewers] = useState(stream.viewers)
  const [showBid, setShowBid] = useState(false)
  const [bidPrice, setBidPrice] = useState('')
  const [currentPrice, setCurrentPrice] = useState(850)
  const [bidWon, setBidWon] = useState(false)

  useEffect(() => {
    let idx = 1
    const iv = setInterval(() => {
      if (idx < mockComments.length) {
        setComments(prev => [...prev, mockComments[idx]])
        idx++
      }
      setViewers(v => v + Math.floor(Math.random() * 3 - 1))
    }, 2500)
    return () => clearInterval(iv)
  }, [])

  const sendComment = () => {
    if (!comment.trim()) return
    setComments(prev => [...prev, { id: Date.now(), user: 'ฉัน', text: comment, time: 0 }])
    setComment('')
  }

  const placeBid = () => {
    if (!bidPrice || +bidPrice <= currentPrice) return
    setCurrentPrice(+bidPrice)
    setShowBid(false)
    setBidPrice('')
    setTimeout(() => setBidWon(true), 3000)
  }

  return (
    <div style={{ height: '100dvh', background: '#000', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Live background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `url(${stream.thumbnail}) center/cover`,
        filter: 'brightness(0.5)',
      }} />

      {/* Top bar */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: 10, padding: '16px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', color: '#fff', fontSize: 16 }}>←</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FF0080', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏪</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700 }}>{stream.seller}</p>
            <span className="live-badge" style={{ fontSize: 10 }}>🔴 LIVE</span>
          </div>
          <button style={{ background: '#FF0080', border: 'none', borderRadius: 16, padding: '5px 12px', color: '#fff', fontSize: 11, cursor: 'pointer', marginLeft: 4 }}>ติดตาม</button>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: '5px 10px', fontSize: 12, color: '#fff' }}>
          👁 {viewers.toLocaleString()}
        </div>
      </div>

      {/* Current bid */}
      <div style={{
        position: 'relative', zIndex: 10, margin: '0 16px',
        background: 'rgba(255,0,128,0.2)', border: '1px solid rgba(255,0,128,0.4)',
        borderRadius: 12, padding: '10px 14px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 11, color: '#FF0080', fontWeight: 700 }}>ราคาปัจจุบัน</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>฿{currentPrice.toLocaleString()}</p>
          </div>
          <button onClick={() => setShowBid(true)} className="btn-pink" style={{ width: 'auto', padding: '10px 20px', fontSize: 13 }}>
            ประมูล
          </button>
        </div>
      </div>

      {/* Products strip */}
      <div style={{ position: 'relative', zIndex: 10, padding: '10px 0', display: 'flex', gap: 10, overflowX: 'auto', paddingLeft: 16 }}>
        {products.slice(0, 4).map(p => (
          <div key={p.id} style={{ flexShrink: 0, width: 56, textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' }}>
              <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <p style={{ fontSize: 9, color: '#fff', marginTop: 3, opacity: 0.8 }}>฿{(p.price/1000).toFixed(1)}K</p>
          </div>
        ))}
      </div>

      {/* Comments */}
      <div style={{ flex: 1, position: 'relative', zIndex: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column-reverse', padding: '0 16px 8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 200, overflow: 'hidden' }}>
          {[...comments].reverse().slice(0, 6).reverse().map(c => (
            <div key={c.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#FF0080', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>
                {c.user[0]}
              </div>
              <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 12, padding: '5px 10px' }}>
                <span style={{ fontWeight: 700, fontSize: 11, color: '#FF0080' }}>{c.user} </span>
                <span style={{ fontSize: 12 }}>{c.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment input */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: 10, padding: '10px 16px 32px', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}>
        <input placeholder="แสดงความคิดเห็น..." value={comment} onChange={e => setComment(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendComment()}
          style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, color: '#fff', fontSize: 13, padding: '10px 16px' }} />
        <button onClick={sendComment} style={{ background: '#FF0080', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>➤</button>
      </div>

      {/* Bid modal */}
      {showBid && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ background: '#1a1a1a', borderRadius: '20px 20px 0 0', width: '100%', padding: '24px 20px 40px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>ใส่ราคาประมูล</h3>
            <p style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>ราคาปัจจุบัน: <strong style={{ color: '#FF0080' }}>฿{currentPrice.toLocaleString()}</strong></p>
            <input type="number" placeholder={`มากกว่า ฿${currentPrice.toLocaleString()}`} value={bidPrice} onChange={e => setBidPrice(e.target.value)}
              style={{ fontSize: 24, textAlign: 'center', fontWeight: 700, color: '#FF0080', marginBottom: 16 }} />
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-outline" onClick={() => setShowBid(false)} style={{ flex: 1 }}>ยกเลิก</button>
              <button className="btn-pink" onClick={placeBid} disabled={!bidPrice || +bidPrice <= currentPrice} style={{ flex: 1 }}>
                ยืนยันราคา
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Won notification */}
      {bidWon && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div style={{ background: '#1a1a1a', borderRadius: 20, padding: 32, textAlign: 'center', width: '100%' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🏆</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>คุณชนะการประมูล!</h2>
            <p style={{ color: '#888', marginBottom: 20 }}>ราคาสุดท้าย ฿{currentPrice.toLocaleString()}</p>
            <button className="btn-pink" onClick={() => { setBidWon(false); navigate('/payment/p1') }}>ชำระเงิน</button>
            <button className="btn-outline" onClick={() => setBidWon(false)} style={{ marginTop: 10 }}>ดูต่อ</button>
          </div>
        </div>
      )}
    </div>
  )
}
