import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Header from '../components/Header'

const steps = ['ข้อมูลบัญชี', 'ข้อมูลส่วนตัว', 'ยืนยัน']

export default function Register() {
  const { setUser } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ email: '', password: '', confirm: '', name: '', phone: '' })
  const [errors, setErrors] = useState({})

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const next = () => {
    const errs = {}
    if (step === 0) {
      if (!form.email) errs.email = 'กรุณากรอกอีเมล'
      if (form.password.length < 6) errs.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
      if (form.password !== form.confirm) errs.confirm = 'รหัสผ่านไม่ตรงกัน'
    }
    if (step === 1) {
      if (!form.name) errs.name = 'กรุณากรอกชื่อ'
      if (!form.phone) errs.phone = 'กรุณากรอกเบอร์โทร'
    }
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    if (step < 2) setStep(s => s + 1)
    else {
      setUser({ id: 'u_new', name: form.name, email: form.email, avatar: null, isSeller: false })
      navigate('/home')
    }
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column' }}>
      <Header title="สมัครสมาชิก" />

      {/* Step indicator */}
      <div style={{ display: 'flex', padding: '16px 24px', gap: 8 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', margin: '0 auto 4px',
              background: i <= step ? '#FF0080' : '#333',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#fff',
            }}>{i + 1}</div>
            <div style={{ fontSize: 10, color: i === step ? '#FF0080' : '#666' }}>{s}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, padding: '8px 24px 32px' }}>
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>ข้อมูลบัญชี</h2>
            <Field label="อีเมล" type="email" placeholder="example@email.com"
              value={form.email} onChange={v => update('email', v)} error={errors.email} />
            <Field label="รหัสผ่าน" type="password" placeholder="อย่างน้อย 6 ตัวอักษร"
              value={form.password} onChange={v => update('password', v)} error={errors.password} />
            <Field label="ยืนยันรหัสผ่าน" type="password" placeholder="กรอกรหัสผ่านอีกครั้ง"
              value={form.confirm} onChange={v => update('confirm', v)} error={errors.confirm} />
          </div>
        )}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>ข้อมูลส่วนตัว</h2>
            <Field label="ชื่อ-นามสกุล" placeholder="กรอกชื่อของคุณ"
              value={form.name} onChange={v => update('name', v)} error={errors.name} />
            <Field label="เบอร์โทรศัพท์" type="tel" placeholder="08X-XXX-XXXX"
              value={form.phone} onChange={v => update('phone', v)} error={errors.phone} />
          </div>
        )}
        {step === 2 && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>ยืนยันข้อมูล</h2>
            <p style={{ color: '#888', marginBottom: 24 }}>ตรวจสอบข้อมูลก่อนสมัคร</p>
            <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 16, textAlign: 'left' }}>
              <Row label="อีเมล" value={form.email} />
              <Row label="ชื่อ" value={form.name} />
              <Row label="เบอร์โทร" value={form.phone} />
            </div>
          </div>
        )}

        <button className="btn-pink" onClick={next} style={{ marginTop: 24 }}>
          {step < 2 ? 'ถัดไป' : 'สมัครสมาชิก'}
        </button>
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#666' }}>
          มีบัญชีแล้ว?{' '}
          <Link to="/login" style={{ color: '#FF0080', textDecoration: 'none' }}>เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  )
}

function Field({ label, type = 'text', placeholder, value, onChange, error }) {
  return (
    <div>
      <label style={{ fontSize: 13, color: '#aaa', marginBottom: 6, display: 'block' }}>{label}</label>
      <input type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        style={{ borderColor: error ? '#FF4444' : '#333' }} />
      {error && <p style={{ color: '#FF6666', fontSize: 12, marginTop: 4 }}>{error}</p>}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #2a2a2a' }}>
      <span style={{ color: '#888', fontSize: 13 }}>{label}</span>
      <span style={{ color: '#fff', fontSize: 13 }}>{value}</span>
    </div>
  )
}
