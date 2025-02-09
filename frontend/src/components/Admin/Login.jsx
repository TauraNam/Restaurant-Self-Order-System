import { useState } from "react"
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const email = elements.email.value
        const password = elements.password.value

        fetch('/api/users/login', {
            method: "POST",
            body: JSON.stringify
                ({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                const data = await response.json()

                if (!response.ok) {
                    setErrorMessage(data.error || "Login failed.")
                    return
                }
                if (data) {
                    login(data.token, data.user)
                    navigate('/admin/products')
                }
            })
            .catch((err) => {
                console.log('Error during fetch', err)
                setErrorMessage('Login error')
            })
    }

    return (
        <div className="login-form-container">
            <div className="login-form-styles">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-block">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required />
                    </div>
                    <div className="form-block">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" minLength="8" id="password" required />
                    </div>
                    <button type="submit" className="button-styles">Login</button>

                    {errorMessage && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;