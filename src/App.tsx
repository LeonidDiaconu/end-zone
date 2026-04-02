import { useState } from 'react'
import { generateRoster } from './engine/playerGenerator'
import type { Player } from './engine/playerGenerator'

function App() {
  const [roster, setRoster] = useState<Player[]>([])

  const handleGenerate = () => {
    setRoster(generateRoster())
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '8px' }}>🏈 End Zone</h1>
      <p style={{ textAlign: 'center', color: '#7eb3ff', marginBottom: '24px' }}>Player Engine Test</p>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <button onClick={handleGenerate} style={{ background: '#1d4ed8', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
          Generate 53 Player Roster
        </button>
      </div>
      {roster.length > 0 && (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ color: '#7eb3ff', marginBottom: '12px' }}>Generated {roster.length} players</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#1e3a5f' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>#</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Pos</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Age</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Nat</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>OVR</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>POT</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Salary</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 0 ? '#111827' : '#0a0f1e', borderBottom: '1px solid #1e3a5f' }}>
                  <td style={{ padding: '8px' }}>{p.jerseyNumber}</td>
                  <td style={{ padding: '8px' }}>{p.firstName} {p.lastName}</td>
                  <td style={{ padding: '8px', color: '#7eb3ff' }}>{p.position}</td>
                  <td style={{ padding: '8px' }}>{p.age}</td>
                  <td style={{ padding: '8px' }}>{p.nationality}</td>
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

export default App