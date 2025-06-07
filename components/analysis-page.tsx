import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertCircle, CheckCircle, Brain, Heart } from "lucide-react"

interface AnalysisPageProps {
  userResponses: any[]
  dailyMoods: any[]
}

export function AnalysisPage({ userResponses, dailyMoods }: AnalysisPageProps) {
  // Calculate insights based on user data
  const averageMood =
    dailyMoods.length > 0 ? dailyMoods.reduce((sum, mood) => sum + mood.value, 0) / dailyMoods.length : 0

  const averageSleep =
    userResponses.length > 0
      ? userResponses.reduce((sum, response) => sum + (response.sleep || 0), 0) / userResponses.length
      : 0

  const averageStress =
    userResponses.length > 0
      ? userResponses.reduce((sum, response) => sum + (response.stress || 0), 0) / userResponses.length
      : 0

  const getMoodTrend = () => {
    if (dailyMoods.length < 2) return "stable"
    const recent = dailyMoods.slice(-3).map((m) => m.value)
    const older = dailyMoods.slice(-6, -3).map((m) => m.value)

    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
    const olderAvg = older.length > 0 ? older.reduce((a, b) => a + b, 0) / older.length : recentAvg

    if (recentAvg > 4.0) return "improving"
    if (recentAvg < 2.0) return "declining"
    return "stable"
  }

  const moodTrend = getMoodTrend()

  const insights = [
    {
      title: "Сон",
      value: averageSleep.toFixed(1),
      unit: "часови",
      status: averageSleep >= 7 ? "good" : averageSleep >= 6 ? "fair" : "poor",
      recommendation:
        averageSleep >= 7
          ? "Одлични навики за спиење! Продолжи да ја одржуваш својата рутина."
          : "Размисли за воспоставување конзистентна рутина за спиење за подобар сон.Нашите видеа ќе ти помогнат",
    },
    {
      title: "Ниво на стрес",
      value: averageStress.toFixed(1),
      unit: "/10",
      status: averageStress <= 4 ? "good" : averageStress <= 6 ? "fair" : "poor",
      recommendation:
        averageStress <= 4
          ? "Добро се справуваш со стресот. Продолжи така!"
          : "Обиди се да вклучиш повеќе техники за релаксација во својата дневна рутина.",
    },
    {
      title: "Расположение",
      value: averageMood.toFixed(1),
      unit: "/5",
      status: moodTrend === "improving" ? "good" : moodTrend === "declining" ? "poor" : "fair",
      recommendation:
        moodTrend === "improving"
          ? "Твоето расположение е се подобро и подобро!"
          : moodTrend === "declining"
            ? "Размисли да побараш поддршка или да пробаш нови техники за релаксација и благосостојба."
            : "Твоето расположение е стабилно. Фокусирај се на одржување на тековните практики за благосостојба.",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "fair":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "poor":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600"
      case "fair":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Анализа & Извештај</h1>
        <p className="text-muted-foreground">Разбери ги твоите дневни навики и добиј персонализирани препораки.</p>
      </div>

      {userResponses.length === 0 && dailyMoods.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Нема доволно податоци!</h3>
            <p className="text-muted-foreground">
              Пополни го прашалникот и внеси го твоето дневно расположение за да добиеш персонализиран увид и анализа
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {insights.map((insight, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                  {getStatusIcon(insight.status)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {insight.value} <span className="text-sm font-normal text-muted-foreground">{insight.unit}</span>
                  </div>
                  <p className={`text-xs mt-1 ${getStatusColor(insight.status)}`}>
                    {insight.status === "good"
                      ? "Excellent"
                      : insight.status === "fair"
                        ? "Needs attention"
                        : "Concerning"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Ниво на Благосостојба
                </CardTitle>
                <CardDescription>Севкупна благосостојба врз основа на твоите последни податоци.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Квалитет на сон</span>
                    <span>{Math.min(100, (averageSleep / 8) * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={Math.min(100, (averageSleep / 8) * 100)} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Менаџирање на стрес</span>
                    <span>{Math.max(0, 100 - averageStress * 10).toFixed(0)}%</span>
                  </div>
                  <Progress value={Math.max(0, 100 - averageStress * 10)} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Расположение</span>
                    <span>{(averageMood * 20).toFixed(0)}%</span>
                  </div>
                  <Progress value={averageMood * 20} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                 Персонализирани Препораки
                </CardTitle>
                <CardDescription>Базирано на твоите дневни навики</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={insight.status === "good" ? "default" : "secondary"}>{insight.title}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Неделно Резиме</CardTitle>
              <CardDescription>Твојот пат кон благосостојба оваа недела </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{userResponses.length}</div>
                  <p className="text-sm text-muted-foreground">Пополнети Прашалници</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{dailyMoods.length}</div>
                  <p className="text-sm text-muted-foreground">Days Mood Tracked</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {averageSleep > 0 ? averageSleep.toFixed(1) : "0"}h
                  </div>
                  <p className="text-sm text-muted-foreground">Просечни часи сон</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {moodTrend === "improving" ? "↗️" : moodTrend === "declining" ? "↘️" : "→"}
                  </div>
                  <p className="text-sm text-muted-foreground">Расположение</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
