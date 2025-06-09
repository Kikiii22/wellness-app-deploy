"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

interface DailyFeelingProps {
  onSubmit: (mood: any) => void
}

const moods = [
  { emoji: "😢", label: "Многу Тажно", value: 1, color: "text-red-500" },
  { emoji: "😔", label: "Тажно", value: 2, color: "text-orange-500" },
  { emoji: "😐", label: "Неутрално", value: 3, color: "text-gray-500" },
  { emoji: "😊", label: "Среќно", value: 4, color: "text-green-500" },
  { emoji: "😄", label: "Многу Среќно", value: 5, color: "text-blue-500" },
]

export function DailyFeeling({ onSubmit }: DailyFeelingProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [notes, setNotes] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selectedMood !== null) {
      const moodData = {
        mood: moods.find((m) => m.value === selectedMood)?.label,
        value: selectedMood,
        notes,
        date: new Date().toLocaleDateString(),
        timestamp: new Date().toISOString(),
      }
      onSubmit(moodData)
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Твоето расположение е зачувано!</h2>
              <p className="text-muted-foreground mb-4">
                Ти благодариме што сподели со нас како се чуствуваш денес. Твојот одговор е зачуван и ни помага да ја следиме твојата емоционална состојба со текот на времето.
              </p>
              <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setSelectedMood(null)
                    setNotes("")
                  }}
              >
                Смени го денешното расположение!

              </Button>
            </CardContent>
          </Card>
        </div>
    )
  }

  return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Дневна проверка на расположението</h1>
          <p className="text-muted-foreground">Како се чувствуваш денес? Твојата емоционална состојба е важна.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Селектирај го твоето расположение</CardTitle>
            <CardDescription>Избери го емотиконот што најдобро го претставува твоето чувство во моментов</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-5 gap-4">
              {moods.map((mood) => (
                  <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedMood === mood.value ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="text-4xl mb-2">{mood.emoji}</div>
                    <div className={`text-sm font-medium ${mood.color}`}>{mood.label}</div>
                  </button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Дополнителни забелешки (опционално)</Label>
              <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Што придонесе да се чувствуваш вака денес? Некој специфичен момент или настан?"
                  className="min-h-[100px]"
              />
            </div>

            <Button onClick={handleSubmit} disabled={selectedMood === null} className="w-full">
              Забележете го моето чувство
            </Button>
          </CardContent>
        </Card>

        {selectedMood !== null && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-6xl mb-2">{moods.find((m) => m.value === selectedMood)?.emoji}</div>
                  <p className="text-lg font-medium">
                    Се чувствуваш {moods.find((m) => m.value === selectedMood)?.label.toLowerCase()} денес
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Не заборавај, во ред е да имаш различни чувства. Секоја емоција е валидна и ние сме со тебе!                  </p>
                </div>
              </CardContent>
            </Card>
        )}
      </div>
  )
}
