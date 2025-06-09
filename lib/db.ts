// db.ts
import prisma from "./generated/prisma" // your Prisma client instance

// No need to initialize tables manually with Prisma; migrations handle that.

// User interface (optional, you can rely on Prisma generated types)
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

// Helper functions to fetch data if needed (example):

export async function getUserById(id: number): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  })
  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    created_at: user.createdAt.toISOString(),
  }
}

// Similarly, add other query wrappers as needed.

