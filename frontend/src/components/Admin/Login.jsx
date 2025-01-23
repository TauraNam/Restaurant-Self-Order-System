import { useState } from "react"

const Login = ({ setUser }) => {

    const [errorMessage, setErrorMessage] = useState('')

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
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json()
                    setErrorMessage(errorData.error || "Login failed.")
                }
                return response.json()
            })
            .then(userData => {
                if (userData) {
                    localStorage.setItem('user', JSON.stringify(userData))
                    setUser(userData)
                    setErrorMessage('')
                }
            })
            .catch(err => {
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