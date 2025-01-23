import { NavLink } from "react-router-dom"
import { BiSolidDish } from "react-icons/bi"
import { FaUsers } from "react-icons/fa"
import { BiSolidCategory } from "react-icons/bi"
import { FaCartArrowDown } from "react-icons/fa"




const AdminNavigation = ({ setUser }) => {


    return (
        <nav className="navigation">
            <div className="admin-navbar">
                <NavLink to="/admin/products" className={({ isActive }) => (isActive ? 'nav-link nav-link-selected' : 'nav-link')}>
                <BiSolidDish className="nav-icon"/> Products
                </NavLink>
                <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'nav-link nav-link-selected' : 'nav-link')}>
                <FaUsers className="nav-icon"/> Users
                </NavLink>
                <NavLink to="/admin/categories" className={({ isActive}) => (isActive ? 'nav-link nav-link-selected' : 'nav-link')}>
                <BiSolidCategory className="nav-icon"/> Categories
                </NavLink>   
                <NavLink to="/admin/orders" className={({ isActive}) => (isActive ? 'nav-link nav-link-selected' : 'nav-link')}> 
                <FaCartArrowDown className="nav-icon" /> Orders
                </NavLink>
            </div>

        </nav>
    );
}

export default AdminNavigation;