import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MdDeleteOutline } from "react-icons/md"
import { MdOutlineEdit } from "react-icons/md"

const AdminUsersOverview = ({ user }) => {

    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        getUsers()
    }, [])


    const handleDelete = (userId) => {
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
                    {users && users.map((user, index) => {
                        return <tr key={index}>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="table-actions">
                            <MdDeleteOutline onClick={() => handleDelete(user._id)} className="action-icon" />
                            <Link to={"/admin/users/edit/" + user._id}>
                            <MdOutlineEdit className="action-icon"/>
                            </Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AdminUsersOverview;