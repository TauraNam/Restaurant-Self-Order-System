import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MdDeleteOutline } from "react-icons/md"
import { MdOutlineEdit } from "react-icons/md"
import { useSearch } from "../../../context/SearchContext"

const Users = () => {

    const [users, setUsers] = useState([])
    const { searchText } = useSearch()

    const getUsers = () => {
        fetch('/api/users')
            .then(response => {
                if (!response.ok) throw new Error('Network response.')
                return response.json()
            })
            .then(usersData => {
                setUsers(usersData)
            })
            .catch(err => console.log('Error during fetch.', err))
    }

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.surname.toLowerCase().includes(searchText.toLowerCase()) ||
        user.createdAt.toString().includes(searchText)
    )

    useEffect(() => {
        getUsers()
    }, [])

    const handleDelete = (userId) => {
        const confirm = window.confirm("Ar you sure you want to DELETE this user?")
        if (confirm) {
            fetch('/api/users/' + userId, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) throw new Error('Cannot delete.')
                    return response.json()
                })
                .then(deleteUser => {
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== deleteUser._id))
                })
                .catch(err => console.log('Error during delete', err))
        }
    }

    return (
        <div className="table-container">
            <div className="buttons-container">
                <Link to="/admin/users/addUser" className="button-styles">Add new user</Link>
            </div>
            <table className="table-overview">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Created</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredUsers && filteredUsers.map((user, index) => {
                        return <tr key={index} className="table-overview-row">
                            <td data-label="Email">{user.email}</td>
                            <td data-label="Name">{user.name}</td>
                            <td data-label="Surname">{user.surname}</td>
                            <td data-label="Created">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="table-actions-col" data-label="Actions">
                                <div className="table-actions">
                                    <MdDeleteOutline onClick={() => handleDelete(user._id)} className="action-icon" />
                                    <Link to={"/admin/users/edit/" + user._id}>
                                        <MdOutlineEdit className="action-icon" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Users;