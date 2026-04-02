import { v4 as uuidv4 } from 'uuid'
import { generateRoster } from './playerGenerator'
import type { Player } from './playerGenerator'

export type Conference = 'AFC' | 'NFC'
export type Division = 'North' | 'South' | 'East' | 'West'

export interface Team {
  id: string
  city: string
  name: string
  abbreviation: string
  conference: Conference
  division: Division
  roster: Player[]
  salaryCap: number
  currentSalary: number
  balance: number
  wins: number
  losses: number
  draws: number
  points: number
  stadiumName: string
  stadiumCapacity: number
}

const SALARY_CAP = 224800000

const teamData = [
  // AFC North
  { city: 'Baltimore', name: 'Blackbirds', abbreviation: 'BAL', conference: 'AFC' as Conference, division: 'North' as Division, stadiumName: 'Blackbird Stadium', stadiumCapacity: 71000 },
  { city: 'Pittsburgh', name: 'Ironworkers', abbreviation: 'PIT', conference: 'AFC' as Conference, division: 'North' as Division, stadiumName: 'Steel Arena', stadiumCapacity: 68400 },
  { city: 'Cleveland', name: 'Dockmen', abbreviation: 'CLE', conference: 'AFC' as Conference, division: 'North' as Division, stadiumName: 'Lakefront Field', stadiumCapacity: 67895 },
  { city: 'Cincinnati', name: 'Stripes', abbreviation: 'CIN', conference: 'AFC' as Conference, division: 'North' as Division, stadiumName: 'Riverfront Arena', stadiumCapacity: 65515 },
  // AFC South
  { city: 'Houston', name: 'Roughnecks', abbreviation: 'HOU', conference: 'AFC' as Conference, division: 'South' as Division, stadiumName: 'Oil City Stadium', stadiumCapacity: 72220 },
  { city: 'Indianapolis', name: 'Speedway', abbreviation: 'IND', conference: 'AFC' as Conference, division: 'South' as Division, stadiumName: 'Speedway Dome', stadiumCapacity: 67000 },
  { city: 'Jacksonville', name: 'Predators', abbreviation: 'JAX', conference: 'AFC' as Conference, division: 'South' as Division, stadiumName: 'Predator Park', stadiumCapacity: 69132 },
  { city: 'Nashville', name: 'Titans', abbreviation: 'NAS', conference: 'AFC' as Conference, division: 'South' as Division, stadiumName: 'Cumberland Stadium', stadiumCapacity: 69143 },
  // AFC East
  { city: 'Boston', name: 'Minutemen', abbreviation: 'BOS', conference: 'AFC' as Conference, division: 'East' as Division, stadiumName: 'Revolution Field', stadiumCapacity: 65878 },
  { city: 'New York', name: 'Aviators', abbreviation: 'NYA', conference: 'AFC' as Conference, division: 'East' as Division, stadiumName: 'Skyline Stadium', stadiumCapacity: 82500 },
  { city: 'Miami', name: 'Marlins', abbreviation: 'MIA', conference: 'AFC' as Conference, division: 'East' as Division, stadiumName: 'Suncoast Arena', stadiumCapacity: 65326 },
  { city: 'Buffalo', name: 'Blizzard', abbreviation: 'BUF', conference: 'AFC' as Conference, division: 'East' as Division, stadiumName: 'Snowstorm Field', stadiumCapacity: 71608 },
  // AFC West
  { city: 'Kansas City', name: 'Monarchs', abbreviation: 'KCC', conference: 'AFC' as Conference, division: 'West' as Division, stadiumName: 'Crown Stadium', stadiumCapacity: 76416 },
  { city: 'Denver', name: 'Mountaineers', abbreviation: 'DEN', conference: 'AFC' as Conference, division: 'West' as Division, stadiumName: 'Mile High Arena', stadiumCapacity: 76125 },
  { city: 'Las Vegas', name: 'Gamblers', abbreviation: 'LVG', conference: 'AFC' as Conference, division: 'West' as Division, stadiumName: 'Neon Stadium', stadiumCapacity: 65000 },
  { city: 'Los Angeles', name: 'Surge', abbreviation: 'LAS', conference: 'AFC' as Conference, division: 'West' as Division, stadiumName: 'Pacific Arena', stadiumCapacity: 70240 },
  // NFC North
  { city: 'Chicago', name: 'Grizzlies', abbreviation: 'CHI', conference: 'NFC' as Conference, division: 'North' as Division, stadiumName: 'Windy City Field', stadiumCapacity: 61500 },
  { city: 'Green Bay', name: 'Packers', abbreviation: 'GBP', conference: 'NFC' as Conference, division: 'North' as Division, stadiumName: 'Tundra Stadium', stadiumCapacity: 81441 },
  { city: 'Detroit', name: 'Motors', abbreviation: 'DET', conference: 'NFC' as Conference, division: 'North' as Division, stadiumName: 'Motor City Arena', stadiumCapacity: 65000 },
  { city: 'Minneapolis', name: 'Norsemen', abbreviation: 'MIN', conference: 'NFC' as Conference, division: 'North' as Division, stadiumName: 'Nordic Dome', stadiumCapacity: 66860 },
  // NFC South
  { city: 'Atlanta', name: 'Falcons', abbreviation: 'ATL', conference: 'NFC' as Conference, division: 'South' as Division, stadiumName: 'Peach State Stadium', stadiumCapacity: 71000 },
  { city: 'New Orleans', name: 'Krewe', abbreviation: 'NOS', conference: 'NFC' as Conference, division: 'South' as Division, stadiumName: 'Bayou Dome', stadiumCapacity: 73208 },
  { city: 'Tampa Bay', name: 'Corsairs', abbreviation: 'TAM', conference: 'NFC' as Conference, division: 'South' as Division, stadiumName: 'Gulf Coast Arena', stadiumCapacity: 65618 },
  { city: 'Charlotte', name: 'Cougars', abbreviation: 'CHA', conference: 'NFC' as Conference, division: 'South' as Division, stadiumName: 'Carolinas Stadium', stadiumCapacity: 74455 },
  // NFC East
  { city: 'Dallas', name: 'Outlaws', abbreviation: 'DAL', conference: 'NFC' as Conference, division: 'East' as Division, stadiumName: 'Lone Star Arena', stadiumCapacity: 80000 },
  { city: 'New York', name: 'Giants', abbreviation: 'NYG', conference: 'NFC' as Conference, division: 'East' as Division, stadiumName: 'Empire Stadium', stadiumCapacity: 82500 },
  { city: 'Philadelphia', name: 'Liberty', abbreviation: 'PHI', conference: 'NFC' as Conference, division: 'East' as Division, stadiumName: 'Liberty Bell Field', stadiumCapacity: 69596 },
  { city: 'Washington', name: 'Commanders', abbreviation: 'WAS', conference: 'NFC' as Conference, division: 'East' as Division, stadiumName: 'Capitol Arena', stadiumCapacity: 67617 },
  // NFC West
  { city: 'San Francisco', name: 'Gold Rush', abbreviation: 'SFG', conference: 'NFC' as Conference, division: 'West' as Division, stadiumName: 'Bay Area Stadium', stadiumCapacity: 68500 },
  { city: 'Seattle', name: 'Stormers', abbreviation: 'SEA', conference: 'NFC' as Conference, division: 'West' as Division, stadiumName: 'Emerald Arena', stadiumCapacity: 69000 },
  { city: 'Los Angeles', name: 'Rams', abbreviation: 'LAR', conference: 'NFC' as Conference, division: 'West' as Division, stadiumName: 'SoCal Stadium', stadiumCapacity: 70240 },
  { city: 'Phoenix', name: 'Desert Hawks', abbreviation: 'PHX', conference: 'NFC' as Conference, division: 'West' as Division, stadiumName: 'Desert Sun Arena', stadiumCapacity: 63400 },
]

export function generateAllTeams(): Team[] {
  return teamData.map(data => {
    const roster = generateRoster()
    const currentSalary = roster.reduce((total, player) => total + player.salary, 0)
    return {
      id: uuidv4(),
      ...data,
      roster,
      salaryCap: SALARY_CAP,
      currentSalary,
      balance: 50000000 + Math.floor(Math.random() * 50000000),
      wins: 0,
      losses: 0,
      draws: 0,
      points: 0,
    }
  })
}

export function getTeamsByConference(teams: Team[], conference: Conference): Team[] {
  return teams.filter(t => t.conference === conference)
}

export function getTeamsByDivision(teams: Team[], conference: Conference, division: Division): Team[] {
  return teams.filter(t => t.conference === conference && t.division === division)
}

export function getCapSpace(team: Team): number {
  return team.salaryCap - team.currentSalary
}