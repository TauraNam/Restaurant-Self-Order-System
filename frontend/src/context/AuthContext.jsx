import React, { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [token] = useState(localStorage.getItem('token') || null)
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem('user')
        return userData ? JSON.parse(userData) : null
    })
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('token')
        return !!token
    })
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn && !user) {
            const userData = localStorage.getItem('user')
            if (userData) {
                setUser(JSON.parse(userData))
            }
        }
    }, [isLoggedIn, user])

    const login = (token, userData, showWelcome = true) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setIsLoggedIn(true)
        setUser(userData)

        if (showWelcome) {
            toast.success(`Welcome back, ${userData.name}!`)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        setUser(null)
        toast.success('Logout successful!')
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}