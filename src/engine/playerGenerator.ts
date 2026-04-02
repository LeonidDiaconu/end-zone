import { v4 as uuidv4 } from 'uuid'

export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'OL' | 'DL' | 'LB' | 'CB' | 'S' | 'K' | 'P'

export interface Player {
  id: string
  firstName: string
  lastName: string
  age: number
  nationality: string
  position: Position
  jerseyNumber: number
  height: number
  weight: number
  overall: number
  potential: number
  salary: number
  attributes: PlayerAttributes
}

export interface PlayerAttributes {
  // Physical
  speed: number
  acceleration: number
  agility: number
  strength: number
  stamina: number
  jump: number
  balance: number
  injuryResistance: number
  // Mental
  decisionMaking: number
  composure: number
  leadership: number
  workRate: number
  coachability: number
  // Position specific
  throwPower: number
  throwAccuracy: number
  pocketPresence: number
  carrying: number
  routeRunning: number
  catching: number
  blocking: number
  passRush: number
  tackling: number
  coverage: number
  kickPower: number
  kickAccuracy: number
}

const firstNames: Record<string, string[]> = {
  USA: ['Marcus', 'Darius', 'Tyler', 'Jake', 'Malik', 'Devon', 'Jordan', 'Caleb', 'Aaron', 'Justin', 'Trevor', 'Lamar', 'Patrick', 'Josh', 'Jalen', 'Tua', 'Kyler', 'Daniel', 'Sam', 'Geno'],
  Canada: ['Liam', 'Noah', 'Ethan', 'Logan', 'Mason', 'Lucas', 'Owen', 'Aiden', 'Caden', 'Connor'],
  Brazil: ['Gabriel', 'Lucas', 'Matheus', 'Gustavo', 'Rodrigo', 'Felipe', 'Bruno', 'Diego', 'Rafael', 'Thiago'],
  Germany: ['Leon', 'Felix', 'Lukas', 'Jonas', 'Finn', 'Elias', 'Max', 'Moritz', 'Paul', 'Ben'],
  Nigeria: ['Emeka', 'Chidi', 'Tunde', 'Seun', 'Biodun', 'Kola', 'Femi', 'Dele', 'Bayo', 'Tobi'],
  UK: ['Jack', 'Harry', 'George', 'Charlie', 'James', 'Oliver', 'William', 'Thomas', 'Henry', 'Edward'],
  France: ['Hugo', 'Nathan', 'Theo', 'Mathis', 'Axel', 'Maxime', 'Romain', 'Antoine', 'Pierre', 'Louis'],
  Australia: ['Lachlan', 'Cooper', 'Riley', 'Hunter', 'Blake', 'Tanner', 'Beau', 'Kade', 'Zac', 'Flynn'],
}

const lastNames: Record<string, string[]> = {
  USA: ['Williams', 'Johnson', 'Thompson', 'Reed', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Jackson', 'Harris', 'Martin', 'White', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Hall', 'Allen', 'Young'],
  Canada: ['Smith', 'Brown', 'Wilson', 'MacDonald', 'Martin', 'Anderson', 'Taylor', 'Thomas', 'Scott', 'Campbell'],
  Brazil: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes'],
  Germany: ['Mueller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'],
  Nigeria: ['Okafor', 'Adeyemi', 'Okonkwo', 'Nwosu', 'Eze', 'Obi', 'Chukwu', 'Ogundele', 'Babatunde', 'Afolabi'],
  UK: ['Jones', 'Evans', 'Thomas', 'Roberts', 'Davies', 'Hughes', 'Lewis', 'Morgan', 'James', 'Phillips'],
  France: ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy'],
  Australia: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Martin', 'Anderson'],
}

const nationalities = [
  ...Array(65).fill('USA'),
  ...Array(5).fill('Canada'),
  ...Array(5).fill('Brazil'),
  ...Array(5).fill('Germany'),
  ...Array(5).fill('Nigeria'),
  ...Array(5).fill('UK'),
  ...Array(5).fill('France'),
  ...Array(5).fill('Australia'),
]

const jerseyRanges: Record<Position, number[]> = {
  QB: [1, 19],
  RB: [20, 49],
  WR: [80, 89],
  TE: [40, 49],
  OL: [50, 79],
  DL: [90, 99],
  LB: [50, 59],
  CB: [20, 39],
  S: [20, 39],
  K: [1, 19],
  P: [1, 19],
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateAttributes(position: Position, age: number, potential: number): PlayerAttributes {
  const base = Math.floor(potential * 0.5) + rand(10, 25)
  const boost = (stat: number) => Math.min(99, stat + rand(0, 15))
  const low = (stat: number) => Math.max(1, stat - rand(5, 20))

  const attrs: PlayerAttributes = {
    speed: rand(base - 10, base + 10),
    acceleration: rand(base - 10, base + 10),
    agility: rand(base - 10, base + 10),
    strength: rand(base - 10, base + 10),
    stamina: rand(base - 5, base + 15),
    jump: rand(base - 10, base + 10),
    balance: rand(base - 10, base + 10),
    injuryResistance: rand(40, 90),
    decisionMaking: rand(base - 10, base + 10),
    composure: rand(base - 10, base + 10),
    leadership: age > 28 ? rand(60, 95) : rand(30, 70),
    workRate: rand(50, 99),
    coachability: rand(40, 99),
    throwPower: rand(20, 50),
    throwAccuracy: rand(20, 50),
    pocketPresence: rand(20, 50),
    carrying: rand(20, 50),
    routeRunning: rand(20, 50),
    catching: rand(20, 50),
    blocking: rand(20, 50),
    passRush: rand(20, 50),
    tackling: rand(20, 50),
    coverage: rand(20, 50),
    kickPower: rand(20, 50),
    kickAccuracy: rand(20, 50),
  }

  // Boost position specific attributes
  switch (position) {
    case 'QB':
      attrs.throwPower = boost(attrs.throwPower)
      attrs.throwAccuracy = boost(attrs.throwAccuracy)
      attrs.pocketPresence = boost(attrs.pocketPresence)
      attrs.decisionMaking = boost(attrs.decisionMaking)
      break
    case 'RB':
      attrs.speed = boost(attrs.speed)
      attrs.carrying = boost(attrs.carrying)
      attrs.agility = boost(attrs.agility)
      attrs.balance = boost(attrs.balance)
      break
    case 'WR':
      attrs.speed = boost(attrs.speed)
      attrs.catching = boost(attrs.catching)
      attrs.routeRunning = boost(attrs.routeRunning)
      attrs.acceleration = boost(attrs.acceleration)
      break
    case 'TE':
      attrs.catching = boost(attrs.catching)
      attrs.blocking = boost(attrs.blocking)
      attrs.strength = boost(attrs.strength)
      break
    case 'OL':
      attrs.strength = boost(attrs.strength)
      attrs.blocking = boost(attrs.blocking)
      attrs.balance = boost(attrs.balance)
      attrs.speed = low(attrs.speed)
      break
    case 'DL':
      attrs.strength = boost(attrs.strength)
      attrs.passRush = boost(attrs.passRush)
      attrs.tackling = boost(attrs.tackling)
      break
    case 'LB':
      attrs.tackling = boost(attrs.tackling)
      attrs.coverage = boost(attrs.coverage)
      attrs.speed = boost(attrs.speed)
      break
    case 'CB':
    case 'S':
      attrs.speed = boost(attrs.speed)
      attrs.coverage = boost(attrs.coverage)
      attrs.decisionMaking = boost(attrs.decisionMaking)
      break
    case 'K':
    case 'P':
      attrs.kickPower = boost(attrs.kickPower)
      attrs.kickAccuracy = boost(attrs.kickAccuracy)
      break
  }

  return attrs
}

function calculateOverall(position: Position, attrs: PlayerAttributes): number {
  let total = 0
  let count = 0

  const add = (val: number, weight: number = 1) => {
    total += val * weight
    count += weight
  }

  // Universal attributes
  add(attrs.speed, 1)
  add(attrs.stamina, 1)
  add(attrs.decisionMaking, 2)
  add(attrs.composure, 1)

  // Position specific weights
  switch (position) {
    case 'QB':
      add(attrs.throwPower, 3)
      add(attrs.throwAccuracy, 4)
      add(attrs.pocketPresence, 3)
      break
    case 'RB':
      add(attrs.speed, 3)
      add(attrs.carrying, 3)
      add(attrs.agility, 2)
      break
    case 'WR':
      add(attrs.speed, 3)
      add(attrs.catching, 4)
      add(attrs.routeRunning, 3)
      break
    case 'TE':
      add(attrs.catching, 3)
      add(attrs.blocking, 2)
      add(attrs.strength, 2)
      break
    case 'OL':
      add(attrs.strength, 4)
      add(attrs.blocking, 4)
      break
    case 'DL':
      add(attrs.strength, 3)
      add(attrs.passRush, 4)
      add(attrs.tackling, 2)
      break
    case 'LB':
      add(attrs.tackling, 4)
      add(attrs.coverage, 2)
      add(attrs.speed, 2)
      break
    case 'CB':
    case 'S':
      add(attrs.speed, 3)
      add(attrs.coverage, 4)
      add(attrs.tackling, 2)
      break
    case 'K':
    case 'P':
      add(attrs.kickPower, 4)
      add(attrs.kickAccuracy, 4)
      break
  }

  return Math.min(99, Math.round(total / count))
}

function calculateSalary(overall: number, age: number, position: Position): number {
  const baseSalary = 750000
  const overallMultiplier = Math.pow(overall / 50, 2.5)
  const ageMultiplier = age >= 24 && age <= 30 ? 1.2 : age > 30 ? 0.9 : 0.8
  const positionMultiplier: Record<Position, number> = {
    QB: 2.5, OL: 1.3, DL: 1.4, WR: 1.6, CB: 1.4,
    RB: 1.2, TE: 1.3, LB: 1.3, S: 1.2, K: 0.8, P: 0.7,
  }
  return Math.round(baseSalary * overallMultiplier * ageMultiplier * positionMultiplier[position])
}

export function generatePlayer(position: Position): Player {
  const nationality = pick(nationalities)
  const names = firstNames[nationality] || firstNames['USA']
  const surnames = lastNames[nationality] || lastNames['USA']
  const age = rand(18, 36)
  const potential = rand(40, 99)
  const jerseyRange = jerseyRanges[position]
  const attributes = generateAttributes(position, age, potential)
  const overall = calculateOverall(position, attributes)

  return {
    id: uuidv4(),
    firstName: pick(names),
    lastName: pick(surnames),
    age,
    nationality,
    position,
    jerseyNumber: rand(jerseyRange[0], jerseyRange[1]),
    height: rand(170, 205),
    weight: rand(75, 145),
    overall,
    potential,
    salary: calculateSalary(overall, age, position),
    attributes,
  }
}

export function generateRoster(): Player[] {
  const roster: Player[] = []
  const positions: Position[] = [
    'QB', 'QB', 'QB',
    'RB', 'RB', 'RB', 'RB',
    'WR', 'WR', 'WR', 'WR', 'WR', 'WR',
    'TE', 'TE', 'TE',
    'OL', 'OL', 'OL', 'OL', 'OL', 'OL', 'OL', 'OL', 'OL',
    'DL', 'DL', 'DL', 'DL', 'DL', 'DL',
    'LB', 'LB', 'LB', 'LB', 'LB',
    'CB', 'CB', 'CB', 'CB', 'CB',
    'S', 'S', 'S',
    'K', 'K',
    'P', 'P',
    'RB', 'WR', 'OL', 'DL', 'LB',
  ]
  for (const pos of positions) {
    roster.push(generatePlayer(pos))
  }
  return roster
}