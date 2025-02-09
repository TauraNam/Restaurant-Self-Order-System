import { useSearch } from '../../context/SearchContext'
import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo-admin.png'
import { IoMenu } from "react-icons/io5"
import { FaTimes } from "react-icons/fa"


const AdminHeader = ({ menuOpen, setMenuOpen }) => {

    const { searchText, setSearchText } = useSearch()
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <header className="admin-header">
            <Link to="/admin/products">
                <img className="logo" src={logo} alt="Asia House Logo" />
            </Link>
            <input type="search" id="search" placeholder="Search..." value={searchText}
                onChange={(e) => setSearchText(e.target.value)} />
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
            {menuOpen ? (
                <FaTimes className='burger-action-icon' onClick={toggleMenu} />
            ) : <IoMenu className='burger-action-icon' onClick={toggleMenu} />}
        </header>
    );
}

export default AdminHeader;