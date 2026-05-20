import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { chats } from '../data/mockData'

export default function ChatRoom() {
  const { id } = useParams()
  const navigate = useNavigate()
  const chat = chats.find(c => c.id === id) || chats[0]
  const [messages, setMessages] = useState(chat.messages)
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { id: `m${Date.now()}`, text, sender: 'me', time: 'เดี๋ยวนี้' }])
    setText('')
    setTimeout(() => {
      setMessages(prev => [...prev, { id: `m${Date.now()}`, text: 'ขอบคุณที่ติดต่อมาครับ 😊', sender: 'them', time: 'เดี๋ยวนี้' }])
    }, 1200)
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#111', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#1a1a1a', borderBottom: '1px solid #2a2a2a', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', padding: '4px 8px 4px 0' }}>←</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', background: '#333' }}>
          <img src={chat.avatar} alt={chat.name} style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: 15 }}>{chat.name}</p>
          <p style={{ color: '#22cc88', fontSize: 11 }}>ออนไลน์</p>
        </div>
        <button style={{ background: 'none', border: 'none', color: '#888', fontSize: 20, cursor: 'pointer' }}>⋮</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 80 }}>
        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'me' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '75%',
              background: m.sender === 'me' ? '#FF0080' : '#2a2a2a',
              borderRadius: m.sender === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              padding: '10px 14px',
            }}>
              <p style={{ fontSize: 14, lineHeight: 1.5 }}>{m.text}</p>
              <p style={{ fontSize: 10, color: m.sender === 'me' ? 'rgba(255,255,255,0.6)' : '#666', marginTop: 4, textAlign: 'right' }}>{m.time}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 430,
        display: 'flex', gap: 10, padding: '12px 16px',
        background: '#1a1a1a', borderTop: '1px solid #2a2a2a',
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
      }}>
        <input placeholder="พิมพ์ข้อความ..." value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          style={{ flex: 1, borderRadius: 20, padding: '10px 16px', fontSize: 14 }} />
        <button onClick={send} style={{
          background: '#FF0080', border: 'none', borderRadius: '50%',
          width: 42, height: 42, cursor: 'pointer', fontSize: 18, flexShrink: 0,
        }}>➤</button>
      </div>
    </div>
  )
}
