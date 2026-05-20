import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { setUser } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('กรุณากรอกข้อมูลให้ครบ'); return }
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 800))
    if (email === 'test@test.com' && password === '123456') {
      setUser({ id: 'u1', name: 'สมชาย ใจดี', email, avatar: null, isSeller: false })
      navigate('/home')
    } else if (email === 'seller@test.com' && password === '123456') {
      setUser({ id: 'u2', name: 'ร้านค้า ABC', email, avatar: null, isSeller: true })
      navigate('/home')
    } else {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column' }}>
      {/* Header banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1a0030 0%, #2d0050 100%)',
        padding: '60px 24px 40px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🚪</div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#fff', letterSpacing: -1 }}>ASAPH LIVE</h1>
        <p style={{ color: '#aaa', fontSize: 14, marginTop: 6 }}>Live Auction Marketplace</p>
      </div>

      <div style={{ flex: 1, padding: '32px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>เข้าสู่ระบบ</h2>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 24 }}>
          ยังไม่มีบัญชี?{' '}
          <Link to="/register" style={{ color: '#FF0080', textDecoration: 'none', fontWeight: 600 }}>
            สมัครสมาชิก
          </Link>
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>อีเมล / เบอร์โทร</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ borderColor: error && !email ? '#FF4444' : '#333' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>รหัสผ่าน</label>
            <input
              type="password"
              placeholder="รหัสผ่าน"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ borderColor: error ? '#FF4444' : '#333' }}
            />
          </div>

          {error && (
            <div style={{
              background: '#2a0a0a', border: '1px solid #FF4444',
              borderRadius: 8, padding: '10px 14px', color: '#FF6666', fontSize: 13,
            }}>
              {error}
            </div>
          )}

          <button className="btn-pink" type="submit" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#333' }} />
          <span style={{ color: '#666', fontSize: 12 }}>หรือ</span>
          <div style={{ flex: 1, height: 1, background: '#333' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <span style={{ fontSize: 18 }}>f</span> เข้าสู่ระบบด้วย Facebook
          </button>
          <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <span style={{ fontSize: 18 }}>🍎</span> เข้าสู่ระบบด้วย Apple
          </button>
        </div>

        <p style={{ textAlign: 'center', color: '#555', fontSize: 11, marginTop: 24 }}>
          ทดสอบ: test@test.com / 123456
        </p>
      </div>
    </div>
  )
}
