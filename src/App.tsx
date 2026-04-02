import { useState } from 'react'
import { generateAllTeams } from './engine/teamBuilder'
import type { Team } from './engine/teamBuilder'

function App() {
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const handleGenerate = () => {
    const allTeams = generateAllTeams()
    setTeams(allTeams)
    setSelectedTeam(null)
  }

  const formatSalary = (n: number) => `$${(n / 1000000).toFixed(1)}M`

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '8px' }}>🏈 End Zone</h1>
      <p style={{ textAlign: 'center', color: '#7eb3ff', marginBottom: '24px' }}>Team Builder Test</p>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <button onClick={handleGenerate} style={{ background: '#1d4ed8', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
          Generate All 32 Teams
        </button>
      </div>

      {teams.length > 0 && !selectedTeam && (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ color: '#7eb3ff', marginBottom: '16px' }}>Click any team to view their roster</p>
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
                        <div style={{ fontSize: '12px', color: '#7eb3ff', marginBottom: '4px' }}>{team.abbreviation} · {team.stadiumName}</div>
                        <div style={{ fontSize: '12px', color: '#a78bfa' }}>Cap: {formatSalary(team.currentSalary)} / {formatSalary(team.salaryCap)}</div>
                        <div style={{ fontSize: '12px', color: '#22c55e' }}>Space: {formatSalary(team.salaryCap - team.currentSalary)}</div>
                        <div style={{ fontSize: '12px', color: '#7eb3ff', marginTop: '4px' }}>👥 {team.roster.length} players</div>
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
            ← Back to All Teams
          </button>
          <h2 style={{ marginBottom: '4px' }}>{selectedTeam.city} {selectedTeam.name}</h2>
          <p style={{ color: '#7eb3ff', marginBottom: '16px', fontSize: '14px' }}>
            {selectedTeam.conference} {selectedTeam.division} · {selectedTeam.stadiumName} ({selectedTeam.stadiumCapacity.toLocaleString()} capacity)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            <div style={{ background: '#111827', padding: '12px', borderRadius: '8px' }}>
              <div style={{ color: '#7eb3ff', fontSize: '12px' }}>Salary Cap</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatSalary(selectedTeam.salaryCap)}</div>
            </div>
            <div style={{ background: '#111827', padding: '12px', borderRadius: '8px' }}>
              <div style={{ color: '#7eb3ff', fontSize: '12px' }}>Current Salaries</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: selectedTeam.currentSalary > selectedTeam.salaryCap ? '#ef4444' : '#22c55e' }}>{formatSalary(selectedTeam.currentSalary)}</div>
            </div>
            <div style={{ background: '#111827', padding: '12px', borderRadius: '8px' }}>
              <div style={{ color: '#7eb3ff', fontSize: '12px' }}>Cap Space</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#a78bfa' }}>{formatSalary(selectedTeam.salaryCap - selectedTeam.currentSalary)}</div>
            </div>
          </div>
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
              {selectedTeam.roster.map((p, i) => (
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