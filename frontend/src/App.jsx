// import { useState } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import AdminPanel from './pages/Admin/AdminPanel'
import MainProductsOverview from './pages/Restaurant/MainProductsOverview'
import OrderDetails from "./components/Restaurant/OrderDetails"


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/" element={<MainProductsOverview />}/>
        <Route path="/orders/:id" element={<OrderDetails />}/>
      </Routes>
    </>
  )
}

export default App
