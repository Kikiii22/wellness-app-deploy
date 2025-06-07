import { getCurrentUser } from "@/lib/auth"
import { getUserQuestionnaireResponses, getUserDailyMoods } from "@/lib/actions"
import { ClientApp } from "@/components/client-app"
import { LoginPage } from "@/components/login-page"

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) {
    return <LoginPage />
  }

  const userResponses = await getUserQuestionnaireResponses()
  const dailyMoods = await getUserDailyMoods()

  return <ClientApp user={user} initialResponses={userResponses} initialMoods={dailyMoods} />
}
