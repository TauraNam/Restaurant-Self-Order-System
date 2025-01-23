// import { useState } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import AdminPanel from './pages/Admin/AdminPanel'
import MainProductsOverview from './pages/Restaurant/MainProductsOverview'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/" element={<MainProductsOverview />}/>
      </Routes>
    </>
  )
}

export default App
