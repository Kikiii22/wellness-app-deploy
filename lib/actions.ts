"use server"

import { redirect } from "next/navigation"
import { getDb, type QuestionnaireResponse, type DailyMood } from "./db"
import { authenticateUser, createUser, setUserSession, clearUserSession, getCurrentUser } from "./auth"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const user = await authenticateUser(email, password)

  if (!user) {
    return { error: "Invalid email or password" }
  }

  await setUserSession(user.id)
  return { success: true, user }
}

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  if (!email || !password || !name) {
    return { error: "All fields are required" }
  }

  const user = await createUser(email, password, name)

  if (!user) {
    return { error: "Email already exists or registration failed" }
  }

  await setUserSession(user.id)
  return { success: true, user }
}

export async function logoutAction() {
  await clearUserSession()
  redirect("/")
}

export async function saveQuestionnaireResponse(data: any) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  try {
    const db = getDb()
    const stmt = db.prepare(`
      INSERT INTO questionnaire_responses 
      (user_id, sleep, energy, exercise, social, stress, productivity, thoughts, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      user.id,
      data.sleep || null,
      data.energy || null,
      data.exercise || null,
      data.social || null,
      data.stress || null,
      data.productivity || null,
      data.thoughts || null,
      data.date,
    )

    return { success: true }
  } catch (error) {
    console.error("Error saving questionnaire response:", error)
    return { error: "Failed to save response" }
  }
}

export async function saveDailyMood(data: any) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  try {
    const db = getDb()
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO daily_moods 
      (user_id, mood, value, notes, date)
      VALUES (?, ?, ?, ?, ?)
    `)

    stmt.run(user.id, data.mood, data.value, data.notes || null, data.date)

    return { success: true }
  } catch (error) {
    console.error("Error saving daily mood:", error)
    return { error: "Failed to save mood" }
  }
}

export async function getUserQuestionnaireResponses(): Promise<QuestionnaireResponse[]> {
  const user = await getCurrentUser()
  if (!user) return []

  try {
    const db = getDb()
    const stmt = db.prepare(`
      SELECT * FROM questionnaire_responses 
      WHERE user_id = ? 
      ORDER BY created_at DESC
    `)

    return stmt.all(user.id) as QuestionnaireResponse[]
  } catch (error) {
    console.error("Error getting questionnaire responses:", error)
    return []
  }
}

export async function getUserDailyMoods(): Promise<DailyMood[]> {
  const user = await getCurrentUser()
  if (!user) return []

  try {
    const db = getDb()
    const stmt = db.prepare(`
      SELECT * FROM daily_moods 
      WHERE user_id = ? 
      ORDER BY date DESC
    `)

    return stmt.all(user.id) as DailyMood[]
  } catch (error) {
    console.error("Error getting daily moods:", error)
    return []
  }
}
