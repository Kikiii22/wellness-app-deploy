import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Heart, Brain } from "lucide-react"

interface DashboardProps {
  userResponses: any[]
  dailyMoods: any[]
}

export function Dashboard({ userResponses, dailyMoods }: DashboardProps) {
  const today = new Date().toLocaleDateString()
  const todayMood = dailyMoods.find((mood) => mood.date === today)
  const weeklyProgress = Math.min(userResponses.length * 20, 100)

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Здраво!</h1>
          <p className="text-muted-foreground">Добредојде назад! Мило ми е што повторно си тука :)</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Денешно расположение</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayMood ? todayMood.mood : "Не е внесено"}</div>
              <p className="text-xs text-muted-foreground">
                {todayMood ? "Внесено денес" : "Кажи ни како се чувствуваш денес?"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Прашалници</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userResponses.length}</div>
              <p className="text-xs text-muted-foreground">Завршени оваа недела</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Неделен напредок</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyProgress}%</div>
              <Progress value={weeklyProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dailyMoods.length}</div>
              <p className="text-xs text-muted-foreground">Денови</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Последни активности</CardTitle>
              <CardDescription>Твоите најнови активности</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userResponses.length > 0 ? (
                  userResponses.slice(-3).map((response, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Завршени прашалници</p>
                          <p className="text-sm text-muted-foreground">{response.date}</p>
                        </div>
                        <Badge variant="secondary">Завршено</Badge>
                      </div>
                  ))
              ) : (
                  <p className="text-muted-foreground">Сè уште нема активности. Започни со пополнување на прашалникот!</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Што следно?</CardTitle>
              <CardDescription>Продолжи со твоето патување кон благосостојба!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Прашалници</p>
                  <p className="text-sm text-muted-foreground">Следи ја твојата дневна активност и расположение</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Дневно расположение</p>
                  <p className="text-sm text-muted-foreground">Кажи ни како се чуствуваш денес</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Предлог видеа</p>
                  <p className="text-sm text-muted-foreground">Научи некои техники за како да постигнеш благосостојба</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
