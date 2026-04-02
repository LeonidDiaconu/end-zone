import { useState } from 'react'
import { useAuth } from './auth/AuthContext'
import { generateAllTeams } from './engine/teamBuilder'
import type { Team } from './engine/teamBuilder'

function LoginPage() {
  const { login, register } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      if (isRegister) {
        await register(email, password, username)
      } else {
        await login(email, password)
      }
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#111827', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid #1e3a5f' }}>
        <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '8px' }}>🏈 End Zone</h1>
        <p style={{ textAlign: 'center', color: '#7eb3ff', marginBottom: '32px' }}>The ultimate American football manager</p>

        <h2 style={{ color: 'white', marginBottom: '20px', fontSize: '18px' }}>{isRegister ? 'Create Account' : 'Sign In'}</h2>

        {isRegister && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#7eb3ff', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)}
              style={{ width: '100%', background: '#0a0f1e', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder='Your manager name' />
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#7eb3ff', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', background: '#0a0f1e', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }}
            placeholder='your@email.com' type='email' />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#7eb3ff', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', background: '#0a0f1e', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }}
            placeholder='••••••••' type='password' />
        </div>

        {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

        <button onClick={handleSubmit} disabled={loading}
          style={{ width: '100%', background: '#1d4ed8', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', marginBottom: '16px' }}>
          {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
        </button>

        <p style={{ textAlign: 'center', color: '#7eb3ff', fontSize: '13px' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsRegister(!isRegister)} style={{ color: '#60a5fa', cursor: 'pointer', marginLeft: '6px' }}>
            {isRegister ? 'Sign In' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  )
}

function GamePage() {
  const { user, logout } = useAuth()
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const handleGenerate = () => {
    setTeams(generateAllTeams())
    setSelectedTeam(null)
  }

  const formatSalary = (n: number) => `$${(n / 1000000).toFixed(1)}M`

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', margin: 0 }}>🏈 End Zone</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#7eb3ff', fontSize: '14px' }}>Welcome, {user?.username}</span>
          <button onClick={logout} style={{ background: '#1e3a5f', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <button onClick={handleGenerate} style={{ background: '#1d4ed8', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
          Generate All 32 Teams
        </button>
      </div>

      {teams.length > 0 && !selectedTeam && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {['AFC', 'NFC'].map(conf => (
            <div key={conf} style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#7eb3ff', marginBottom: '12px' }}>{conf}</h2>
              {['North', 'South', 'East', 'West'].map(div => (
                <div key={div} style={{ marginBottom: '16px' }}>
                  <h3 style={{ color: '#a78bfa', marginBottom: '8px', fontSize: '14px' }}>{conf} {div}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {teams.filter(t => t.conference === conf && t.division === div).map(team => (
                      <div key={team.id} onClick={() => setSelectedTeam(team)}
                        style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '12px', cursor: 'pointer' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{team.city} {team.name}</div>
                        <div style={{ fontSize: '12px', color: '#7eb3ff', marginBottom: '4px' }}>{team.abbreviation}</div>
                        <div style={{ fontSize: '12px', color: '#a78bfa' }}>Cap: {formatSalary(team.currentSalary)} / {formatSalary(team.salaryCap)}</div>
                        <div style={{ fontSize: '12px', color: '#22c55e' }}>Space: {formatSalary(team.salaryCap - team.currentSalary)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {selectedTeam && (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <button onClick={() => setSelectedTeam(null)} style={{ background: '#1e3a5f', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', marginBottom: '16px' }}>
            ← Back
          </button>
          <h2 style={{ marginBottom: '16px' }}>{selectedTeam.city} {selectedTeam.name}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#1e3a5f' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>#</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Pos</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Age</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>OVR</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>POT</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Salary</th>
              </tr>
            </thead>
            <tbody>
              {selectedTeam.roster.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 0 ? '#111827' : '#0a0f1e', borderBottom: '1px solid #1e3a5f' }}>
                  <td style={{ padding: '8px' }}>{p.jerseyNumber}</td>
                  <td style={{ padding: '8px' }}>{p.firstName} {p.lastName}</td>
                  <td style={{ padding: '8px', color: '#7eb3ff' }}>{p.position}</td>
                  <td style={{ padding: '8px' }}>{p.age}</td>
                  <td style={{ padding: '8px', color: p.overall >= 80 ? '#22c55e' : p.overall >= 60 ? '#eab308' : '#ef4444' }}>{p.overall}</td>
                  <td style={{ padding: '8px', color: '#a78bfa' }}>{p.potential}</td>
                  <td style={{ padding: '8px', color: '#7eb3ff' }}>${p.salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function App() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' }}>
      <p>Loading End Zone...</p>
    </div>
  )

  return user ? <GamePage /> : <LoginPage />
}

export default App