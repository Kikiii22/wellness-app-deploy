"use server"

import { redirect } from "next/navigation"
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

  try {
    const user = await createUser(email, password, name)

    if (!user) {
      return { error: "Email already exists or registration failed" }
    }

    await setUserSession(user.id)
    return { success: true, user }
  } catch (error) {
    console.error("Error registering user:", error)
    return { error: "Registration failed" }
  }
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
    await prisma.questionnaireResponse.create({
      data: {
        userId: user.id,
        sleep: data.sleep ?? null,
        energy: data.energy ?? null,
        exercise: data.exercise ?? null,
        social: data.social ?? null,
        stress: data.stress ?? null,
        productivity: data.productivity ?? null,
        thoughts: data.thoughts ?? null,
        date: new Date(data.date),  // ensure this is a Date object
      },
    })

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
    await prisma.dailyMood.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: new Date(data.date),
        },
      },
      update: {
        mood: data.mood,
        value: data.value,
        notes: data.notes ?? null,
      },
      create: {
        userId: user.id,
        mood: data.mood,
        value: data.value,
        notes: data.notes ?? null,
        date: new Date(data.date),
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error saving daily mood:", error)
    return { error: "Failed to save mood" }
  }
}

export async function getUserQuestionnaireResponses() {
  const user = await getCurrentUser()
  if (!user) return []

  try {
    const responses = await prisma.questionnaireResponse.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    })

    return responses
  } catch (error) {
    console.error("Error getting questionnaire responses:", error)
    return []
  }
}

export async function getUserDailyMoods() {
  const user = await getCurrentUser()
  if (!user) return []

  try {
    const moods = await prisma.dailyMood.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    })

    return moods
  } catch (error) {
    console.error("Error getting daily moods:", error)
    return []
  }
}
