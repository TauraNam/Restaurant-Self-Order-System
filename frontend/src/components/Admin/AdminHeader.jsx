const AdminHeader = ({setUser}) => {

    const handleLogout = () => {
        localStorage.removeItem('user')

        setUser(null)
    }
    return (
        <header className="admin-header">
            <div>Logo</div>
            <input type="search" placeholder="Search..." />
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </header>);
}

export default AdminHeader;