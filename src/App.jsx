import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from './context/AppContext'
import BottomNav from './components/BottomNav'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ProductDetail from './pages/ProductDetail'
import MakeOffer from './pages/MakeOffer'
import Payment from './pages/Payment'
import Messages from './pages/Messages'
import ChatRoom from './pages/ChatRoom'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import SellerProfile from './pages/SellerProfile'
import BecomeSeller from './pages/BecomeSeller'
import SellerDashboard from './pages/SellerDashboard'
import MyShop from './pages/MyShop'
import LiveViewer from './pages/LiveViewer'

function Protected({ user, children }) {
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  const [user, setUser] = useState(null)
  const [notifList, setNotifList] = useState([])
  const [unreadMsg, setUnreadMsg] = useState(3)

  return (
    <AppContext.Provider value={{ user, setUser, notifList, setNotifList, unreadMsg, setUnreadMsg }}>
      <div className="app-shell">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={user ? '/home' : '/login'} replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Protected user={user}><Home /></Protected>} />
            <Route path="/marketplace" element={<Protected user={user}><Marketplace /></Protected>} />
            <Route path="/product/:id" element={<Protected user={user}><ProductDetail /></Protected>} />
            <Route path="/offer/:id" element={<Protected user={user}><MakeOffer /></Protected>} />
            <Route path="/payment/:id" element={<Protected user={user}><Payment /></Protected>} />
            <Route path="/messages" element={<Protected user={user}><Messages /></Protected>} />
            <Route path="/chat/:id" element={<Protected user={user}><ChatRoom /></Protected>} />
            <Route path="/notifications" element={<Protected user={user}><Notifications /></Protected>} />
            <Route path="/profile" element={<Protected user={user}><Profile /></Protected>} />
            <Route path="/orders" element={<Protected user={user}><Orders /></Protected>} />
            <Route path="/order/:id" element={<Protected user={user}><OrderDetail /></Protected>} />
            <Route path="/seller/:id" element={<Protected user={user}><SellerProfile /></Protected>} />
            <Route path="/become-seller" element={<Protected user={user}><BecomeSeller /></Protected>} />
            <Route path="/seller-dashboard" element={<Protected user={user}><SellerDashboard /></Protected>} />
            <Route path="/my-shop" element={<Protected user={user}><MyShop /></Protected>} />
            <Route path="/live/:id" element={<Protected user={user}><LiveViewer /></Protected>} />
          </Routes>
          {user && <BottomNav />}
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  )
}
