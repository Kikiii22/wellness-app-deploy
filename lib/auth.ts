import { cookies } from "next/headers"
import { getDb, type User } from "./db"
import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(email: string, password: string, name: string): Promise<User | null> {
  try {
    const db = getDb()
    const hashedPassword = await hashPassword(password)

    const stmt = db.prepare(`
      INSERT INTO users (email, password, name)
      VALUES (?, ?, ?)
    `)

    const result = stmt.run(email, hashedPassword, name)

    const user = db
      .prepare("SELECT id, email, name, created_at FROM users WHERE id = ?")
      .get(result.lastInsertRowid) as User
    return user
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const db = getDb()
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?")
    const user = stmt.get(email) as any

    if (!user) return null

    const isValid = await verifyPassword(password, user.password)
    if (!isValid) return null

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
    }
  } catch (error) {
    console.error("Error authenticating user:", error)
    return null
  }
}

export async function setUserSession(userId: number) {
  const cookieStore = await cookies()
  cookieStore.set("user_id", userId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getUserSession(): Promise<number | null> {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value
    return userId ? Number.parseInt(userId) : null
  } catch {
    return null
  }
}

export async function clearUserSession() {
  const cookieStore = await cookies()
  cookieStore.delete("user_id")
}

export async function getCurrentUser(): Promise<User | null> {
  const userId = await getUserSession()
  if (!userId) return null

  try {
    const db = getDb()
    const stmt = db.prepare("SELECT id, email, name, created_at FROM users WHERE id = ?")
    const user = stmt.get(userId) as User
    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}
