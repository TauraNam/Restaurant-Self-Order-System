import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UserEditForm = () => {

    const { id } = useParams()
    const [userToEdit, setUserToEdit] = useState([])
    const navigate = useNavigate()

    const getUser = () => {
        fetch('/api/users/' + id)
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                return response.json()
            })
            .then(userData => {
                setUserToEdit(userData)
            })
            .catch(err => console.log('Error during fetch', err))
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleEdit = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const email = elements.email.value.trim()
        const name = elements.name.value.trim()
        const surname = elements.surname.value.trim()

        fetch('/api/users/' + id, {
            method: 'PUT',
            body: JSON.stringify({ email, name, surname }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                navigate('/admin/users')
            })
            .catch(err => console.log('Error during fetch', err))
    }

    const handleDelete = (userId) => {
        const confirm = window.confirm("Ar you sure you want to DELETE this order?")
        if (confirm) {
            fetch('/api/users/' + userId, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) throw new Error('Nepavyko delete')
                    navigate('/admin/users')
                })
                .catch(err => console.log('Error during delete', err))
        }
    }

    return (
        <div className="form-container">
            <div className="form-styles">
                <h2>Edit Users</h2>
                <form onSubmit={handleEdit}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" defaultValue={userToEdit.email} required />
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={userToEdit.name} required />
                    <label htmlFor="surname">Surname</label>
                    <input type="text" name="surname" id="surname" defaultValue={userToEdit.surname} required />
                    <button type="submit" className="button-styles">Update</button>
                    <button type="button" onClick={() => handleDelete(userToEdit._id)} className="button-styles">Delete</button>
                </form>
            </div>
        </div>
    );
}

export default UserEditForm;