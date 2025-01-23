import { useNavigate } from "react-router-dom"

const AddNewUser = ({ user }) => {

    const navigate = useNavigate()

    const handleAddNewUser = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const email = elements.email.value.trim()
        const password = elements.password.value.trim()
        const name = elements.name.value.trim()
        const surname = elements.surname.value.trim()

        if (!email || !password || !name || !surname) {
            alert("Please fill all fields.");
            return;
        }
        fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ email, password, name, surname }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                navigate('/admin/users');
            })
            .catch(err => console.log('Error during fetch', err))
    }

    return (
        <div className="form-container">
            <div className="form-styles">
                <h2>Add new user</h2>
                <form onSubmit={handleAddNewUser}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" required />
                    <label htmlFor="surname">Surname</label>
                    <input type="text" name="surname" id="surname" required />
                    <button type="submit" className="button-styles">Add new user</button>
                </form>
            </div>
        </div>
    );
}

export default AddNewUser;