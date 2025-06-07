import type { Database } from "better-sqlite3"
import path from "path"

let db: Database | null = null

export function getDb() {
  if (!db) {
    const dbPath = path.join(process.cwd(), "wellness.db")
    db = new (require("better-sqlite3"))(dbPath)

    // Initialize tables
    initializeTables()
  }
  return db
}

function initializeTables() {
  const db = getDb()

  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Questionnaire responses table
  db.exec(`
    CREATE TABLE IF NOT EXISTS questionnaire_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      sleep REAL,
      energy TEXT,
      exercise TEXT,
      social TEXT,
      stress INTEGER,
      productivity TEXT,
      thoughts TEXT,
      date TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `)

  // Daily moods table
  db.exec(`
    CREATE TABLE IF NOT EXISTS daily_moods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      mood TEXT NOT NULL,
      value INTEGER NOT NULL,
      notes TEXT,
      date TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      UNIQUE(user_id, date)
    )
  `)
}

export interface User {
  id: number
  email: string
  name: string
  created_at: string
}

export interface QuestionnaireResponse {
  id: number
  user_id: number
  sleep: number
  energy: string
  exercise: string
  social: string
  stress: number
  productivity: string
  thoughts: string
  date: string
  created_at: string
}

export interface DailyMood {
  id: number
  user_id: number
  mood: string
  value: number
  notes: string
  date: string
  created_at: string
}
