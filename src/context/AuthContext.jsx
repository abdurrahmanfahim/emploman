import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem('auth')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  const login = (role, user) => {
    const data = { role, user }
    setAuth(data)
    localStorage.setItem('auth', JSON.stringify(data))
  }

  const logout = () => {
    setAuth(null)
    localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
