"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { Questionnaire } from "@/components/questionnaire"
import { VideosPage } from "@/components/videos-page"
import { DailyFeeling } from "@/components/daily-feeling"
import { AnalysisPage } from "@/components/analysis-page"
import type { User, QuestionnaireResponse, DailyMood } from "@/lib/db"

interface ClientAppProps {
  user: User
  initialResponses: QuestionnaireResponse[]
  initialMoods: DailyMood[]
}

export function ClientApp({ user, initialResponses, initialMoods }: ClientAppProps) {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [userResponses, setUserResponses] = useState(initialResponses)
  const [dailyMoods, setDailyMoods] = useState(initialMoods)

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard userResponses={userResponses} dailyMoods={dailyMoods} />
      case "questionnaire":
        return <Questionnaire onSubmit={(response) => setUserResponses([response, ...userResponses])} />
      case "videos":
        return <VideosPage />
      case "feeling":
        return (
          <DailyFeeling
            onSubmit={(mood) => {
              // Update or add mood for today
              const today = new Date().toLocaleDateString()
              const updatedMoods = dailyMoods.filter((m) => m.date !== today)
              setDailyMoods([mood, ...updatedMoods])
            }}
          />
        )
      case "analysis":
        return <AnalysisPage userResponses={userResponses} dailyMoods={dailyMoods} />
      default:
        return <Dashboard userResponses={userResponses} dailyMoods={dailyMoods} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} user={user} />
        <main className="flex-1 p-6 bg-gray-50">{renderCurrentPage()}</main>
      </div>
    </SidebarProvider>
  )
}
