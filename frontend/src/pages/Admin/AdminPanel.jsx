import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Login from "../../components/Admin/Login"
import Products from "../../components/Admin/Product/Products"
import AdminNavigation from "../../components/Admin/AdminNavigation"
import Users from "../../components/Admin/User/Users"
import ProductEditForm from "../../components/Admin/Product/ProductEditForm"
import UserEditForm from "../../components/Admin/User/UserEditForm"
import AddNewUser from "../../components/Admin/User/AddNewUser"
import AddNewProduct from "../../components/Admin/Product/AddNewProduct"
import AdminHeader from "../../components/Admin/AdminHeader"
import Categories from "../../components/Admin/Category/Categories"
import AddNewCategory from "../../components/Admin/Category/AddNewCategory"
import CategoryEditForm from "../../components/Admin/Category/CategoryEditForm"
import Orders from "../../components/Admin/Order/Orders"
import { useAuth } from "../../hooks/useAuth"
import { useSearch } from "../../context/SearchContext"

const AdminPanel = () => {

    const { user } = useAuth()
    const { setSearchText } = useSearch()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        setSearchText('')
    }, [location])

    return (
        <>
            {user ? <AdminHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> : null}
            <div className="admin-panel-container">
                {user ? <AdminNavigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> : null}

                <Routes>
                    <Route path="/" element={user ? <Navigate to="/admin/products" /> : <Navigate to="/admin/login" />} />
                    <Route path="/login" element={<Login user={user} />} />
                    <Route path="/products" element={user ? <Products user={user} /> : <Navigate to="/admin/login" />} />
                    <Route path="/products/edit/:id" element={user ? <ProductEditForm /> : <Navigate to="/admin/login" />} />
                    <Route path="/products/addProduct" element={user ? <AddNewProduct /> : <Navigate to="/admin/login" />} />
                    <Route path="/users" element={user ? <Users user={user} /> : <Navigate to="/admin/login" />} />
                    <Route path="/users/edit/:id" element={user ? <UserEditForm user={user} /> : <Navigate to="/admin/login" />} />
                    <Route path="/users/addUser" element={user ? <AddNewUser user={user} /> : <Navigate to="/admin/login" />} />
                    <Route path="/categories" element={user ? <Categories user={user} /> : <Navigate to="/admin/login" />} />
                    <Route path="/categories/edit/:id" element={user ? <CategoryEditForm user={user} /> : <Navigate to="/admin/login" />} />
                    <Route path="/categories/addCategory" element={user ? <AddNewCategory user={user} /> : <Navigate to="/admin/login" />}></Route>
                    <Route path="/orders" element={user ? <Orders/> : <Navigate to="/admin/login" />} />
                </Routes>
            </div>
        </>
    );
}

export default AdminPanel;