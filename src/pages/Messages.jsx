import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { chats } from '../data/mockData'

export default function Messages() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [chatList, setChatList] = useState(chats)

  const filtered = chatList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const deleteChat = (id, e) => {
    e.stopPropagation()
    setChatList(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="page" style={{ background: '#111' }}>
      <div style={{ padding: '16px 16px 12px', position: 'sticky', top: 0, background: '#111', zIndex: 10 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>💬 ข้อความ</h1>
        <input placeholder="ค้นหาการสนทนา..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ borderRadius: 12 }} />
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 32px', color: '#555' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
          <p>ยังไม่มีการสนทนา</p>
        </div>
      ) : (
        <div>
          {filtered.map(chat => (
            <div key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', borderBottom: '1px solid #1e1e1e',
                cursor: 'pointer', position: 'relative',
              }}>
              <div style={{
                width: 50, height: 50, borderRadius: '50%', background: '#2a2a2a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0, overflow: 'hidden',
              }}>
                <img src={chat.avatar} alt={chat.name} style={{ width: '100%', height: '100%' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: chat.unread ? 700 : 400, fontSize: 14 }}>{chat.name}</span>
                  <span style={{ color: '#666', fontSize: 11 }}>{chat.time}</span>
                </div>
                <p className="line-clamp-1" style={{ color: '#888', fontSize: 13 }}>{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="badge">{chat.unread}</span>
              )}
              <button onClick={e => deleteChat(chat.id, e)} style={{
                position: 'absolute', right: 0, top: 0, bottom: 0,
                width: 70, background: '#FF3333', border: 'none', color: '#fff',
                fontSize: 12, cursor: 'pointer', display: 'none',
              }}>ลบ</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
