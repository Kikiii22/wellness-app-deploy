"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { Questionnaire } from "@/components/questionnaire"
import { VideosPage } from "@/components/videos-page"
import { DailyFeeling } from "@/components/daily-feeling"
import { AnalysisPage } from "@/components/analysis-page"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [userResponses, setUserResponses] = useState<any[]>([])
  const [dailyMoods, setDailyMoods] = useState<any[]>([])

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard userResponses={userResponses} dailyMoods={dailyMoods} />
      case "questionnaire":
        return <Questionnaire onSubmit={(responses) => setUserResponses([...userResponses, responses])} />
      case "videos":
        return <VideosPage />
      case "feeling":
        return <DailyFeeling onSubmit={(mood) => setDailyMoods([...dailyMoods, mood])} />
      case "analysis":
        return <AnalysisPage userResponses={userResponses} dailyMoods={dailyMoods} />
      default:
        return <Dashboard userResponses={userResponses} dailyMoods={dailyMoods} />
    }
  }

  return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
          <main className="flex-1 p-6 bg-gray-50">{renderCurrentPage()}</main>
        </div>
      </SidebarProvider>
  )
}
