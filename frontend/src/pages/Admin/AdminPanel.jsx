import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../../components/Admin/Login"
import AdminProductsOverview from "../../components/Admin/AdminProductsOverview"
import AdminNavigation from "../../components/Admin/AdminNavigation"
import AdminUsersOverview from "../../components/Admin/AdminUsersOverview"
import ProductEditForm from "../../components/Admin/ProductEditForm"
import UsersEditForm from "../../components/Admin/UsersEditForm"
import AddNewUser from "../../components/Admin/AddNewUser"
import AddNewProduct from "../../components/Admin/AddNewProduct"
import AdminHeader from "../../components/Admin/AdminHeader"
import Categories from "../../components/Admin/Categories"
import AddNewCategory from "../../components/Admin/AddNewCategory"
import CategoriesEditForm from "../../components/Admin/CategoriesEditForm"
import Orders from "../../components/Admin/Orders"
import './Admin.css'
import OrderDetails from "../../components/Admin/OrderDetails"

const AdminPanel = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    return (
        <>
            {user ? <AdminHeader setUser={setUser} /> : null}
            <div className="admin-panel-container">
                {user ? <AdminNavigation setUser={setUser} /> : null}

                <Routes>
                    <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/admin/products" />} />
                    <Route path="/products" element={user ? <AdminProductsOverview user={user} /> : <Navigate to="/admin/login" />} />
                    <Route path="/products/edit/:id" element={user ? <ProductEditForm /> : <Navigate to="/admin/login" />} />
                    <Route path="/products/addProduct" element={user ? <AddNewProduct /> : <Navigate to="/admin/login" />} />
                    <Route path="/users" element={user ? <AdminUsersOverview user={user} setUser={setUser} /> : <Navigate to="/admin/login" />} />
                    <Route path="/users/edit/:id" element={user ? <UsersEditForm user={user} setUser={setUser} /> : <Navigate to="/admin/login" />} />
                    <Route path="/users/addUser" element={user ? <AddNewUser user={user} setUser={setUser} /> : <Navigate to="/admin/login" />} />
                    <Route path="/categories" element={user ? <Categories user={user} /> : <Navigate to="/admin/login" />} />
                    <Route path="/categories/edit/:id" element={user ? <CategoriesEditForm user={user} setUser={setUser} /> : <Navigate to="/admin/login" />} />
                    <Route path="/categories/addCategory" element={user ? <AddNewCategory user={user}/> : <Navigate to="/admin/login" />}></Route>
                    <Route path="/orders" element={user? <Orders user={user} /> : <Navigate to="/admin/login" />} />
                    <Route path="/orders/:id" element={<OrderDetails />}/>
                </Routes>
            </div>
        </>
    );
}

export default AdminPanel;