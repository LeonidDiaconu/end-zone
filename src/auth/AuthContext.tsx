import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

interface UserProfile {
  uid: string
  email: string
  username: string
  teamId: string | null
  createdAt: string
}

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  register: (email: string, password: string, username: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUser(docSnap.data() as UserProfile)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const register = async (email: string, password: string, username: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const profile: UserProfile = {
      uid: result.user.uid,
      email,
      username,
      teamId: null,
      createdAt: new Date().toISOString()
    }
    await setDoc(doc(db, 'users', result.user.uid), profile)
    setUser(profile)
  }

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}