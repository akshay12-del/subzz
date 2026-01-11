import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    // Mock authentication - accepts any username/password
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && password) {
          const mockUser = {
            id: Date.now().toString(),
            username,
            email: `${username}@example.com`,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=000000&color=ffffff&size=128`,
          }
          setUser(mockUser)
          localStorage.setItem('user', JSON.stringify(mockUser))
          resolve(mockUser)
        } else {
          reject(new Error('Username and password are required'))
        }
      }, 500) // Simulate API delay
    })
  }

  const signup = async (username, email, password) => {
    // Mock signup - accepts any valid input
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && email && password) {
          if (password.length < 6) {
            reject(new Error('Password must be at least 6 characters'))
            return
          }
          resolve({ success: true, message: 'Account created successfully' })
        } else {
          reject(new Error('All fields are required'))
        }
      }, 500) // Simulate API delay
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
