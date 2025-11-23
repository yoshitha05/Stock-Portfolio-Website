import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import StockDetails from './pages/StockDetails'
import Portfolio from './pages/Portfolio'
import ProtectedRoute from './components/ProtectedRoute'


const App: React.FC = () => {
return (
<Routes>
<Route path='/' element={<Login />} />
<Route path='/register' element={<Register />} />
<Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path='/portfolio' element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
<Route path='/stock/:symbol' element={<ProtectedRoute><StockDetails /></ProtectedRoute>} />
</Routes>
)
}


export default App 