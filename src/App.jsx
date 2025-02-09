import '../src/pages/Admin/Admin.css'
import '../src/pages/Restaurant/Restaurant.css'
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom'
import AdminPanel from './pages/Admin/AdminPanel'
import MainProductsOverview from './pages/Restaurant/MainProductsOverview'
import OrderDetails from "./components/Restaurant/OrderDetails"
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import { SearchProvider } from './context/SearchContext'
import { useEffect } from 'react'


function App() {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const setTableNumber = () => {
    if (searchParams.get("tableNumber")) {
      localStorage.setItem('tableNumber', searchParams.get("tableNumber") || 'Take Away')
      navigate('/')
    } else if (!localStorage.getItem('tableNumber')) {
      localStorage.setItem('tableNumber', 99)
    }
  }

  useEffect(() => {
    setTableNumber()
  }, [])

  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            <Route path="/admin/*" element={<AdminPanel />} />
            <Route path="/" element={<MainProductsOverview />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </>
  )
}

export default App
