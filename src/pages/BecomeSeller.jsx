import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'

const steps = ['ข้อมูลร้านค้า', 'เอกสาร', 'บัญชีธนาคาร', 'รอการยืนยัน']

export default function BecomeSeller() {
  const { setUser, user } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ shopName: '', shopDesc: '', idCard: '', bankName: '', bankAccount: '' })

  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const next = () => {
    if (step < 3) setStep(s => s + 1)
    else {
      setUser(u => ({ ...u, isSeller: true }))
      navigate('/seller-dashboard')
    }
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column' }}>
      <Header title="สมัครเป็นผู้ขาย" />

      {/* Progress */}
      <div style={{ padding: '16px 24px', background: '#1a1a1a', borderBottom: '1px solid #222' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              {i > 0 && <div style={{ position: 'absolute', left: 0, top: 14, width: '50%', height: 2, background: i <= step ? '#FF0080' : '#333' }} />}
              {i < steps.length - 1 && <div style={{ position: 'absolute', right: 0, top: 14, width: '50%', height: 2, background: i < step ? '#FF0080' : '#333' }} />}
              <div style={{
                width: 28, height: 28, borderRadius: '50%', zIndex: 1,
                background: i < step ? '#FF0080' : i === step ? '#FF0080' : '#333',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#fff',
              }}>{i < step ? '✓' : i + 1}</div>
              <p style={{ fontSize: 9, color: i === step ? '#FF0080' : '#666', marginTop: 4, textAlign: 'center' }}>{s}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px 20px' }}>
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>ข้อมูลร้านค้า</h2>
            <div>
              <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>ชื่อร้านค้า</label>
              <input placeholder="ชื่อร้านของคุณ" value={form.shopName} onChange={update('shopName')} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>คำอธิบายร้านค้า</label>
              <textarea rows={3} placeholder="เล่าเกี่ยวกับร้านของคุณ..." value={form.shopDesc} onChange={update('shopDesc')} />
            </div>
            <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 14 }}>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>📋 ข้อกำหนดการเป็นผู้ขาย</p>
              <ul style={{ color: '#aaa', fontSize: 12, lineHeight: 2, paddingLeft: 16 }}>
                <li>อายุ 18 ปีขึ้นไป</li>
                <li>มีบัตรประชาชนไทย</li>
                <li>มีบัญชีธนาคาร</li>
                <li>ยอมรับข้อกำหนดการใช้งาน</li>
              </ul>
            </div>
          </div>
        )}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>อัพโหลดเอกสาร</h2>
            <div>
              <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>เลขบัตรประชาชน</label>
              <input placeholder="X-XXXX-XXXXX-XX-X" value={form.idCard} onChange={update('idCard')} />
            </div>
            <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 20, textAlign: 'center', border: '2px dashed #333' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
              <p style={{ fontSize: 13, color: '#aaa' }}>แตะเพื่ออัพโหลดรูปบัตรประชาชน</p>
              <p style={{ fontSize: 11, color: '#666', marginTop: 4 }}>JPG, PNG ขนาดไม่เกิน 5MB</p>
            </div>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>บัญชีธนาคาร</h2>
            <div>
              <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>ธนาคาร</label>
              <select value={form.bankName} onChange={update('bankName')}
                style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: 8, padding: '12px 16px', width: '100%', fontSize: 14 }}>
                <option value="">เลือกธนาคาร</option>
                {['กสิกรไทย', 'กรุงไทย', 'ไทยพาณิชย์', 'กรุงเทพ', 'กรุงศรี'].map(b => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>เลขที่บัญชี</label>
              <input placeholder="XXX-X-XXXXX-X" value={form.bankAccount} onChange={update('bankAccount')} />
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>ยื่นเรื่องสำเร็จ!</h2>
            <p style={{ color: '#888', lineHeight: 1.7 }}>ทีมงานจะตรวจสอบข้อมูลของคุณ<br />ภายใน 1-3 วันทำการ</p>
          </div>
        )}

        <button className="btn-pink" onClick={next} style={{ marginTop: 24 }}>
          {step < 3 ? 'ถัดไป' : 'เข้าสู่แดชบอร์ดผู้ขาย'}
        </button>
      </div>
    </div>
  )
}
