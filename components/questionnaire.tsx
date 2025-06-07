"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle } from "lucide-react"
import { saveQuestionnaireResponse } from "@/lib/actions"

interface QuestionnaireProps {
  onSubmit: (responses: any) => void
}

const questions = [
  {
    id: "sleep",
    type: "slider",
    question: "Колку часа спиеше минатата ноќ?",
    min: 0,
    max: 12,
    step: 0.5,
  },
  {
    id: "energy",
    type: "radio",
    question: "Кое е нивото на енергија што го чуствуваш денес?",
    options: ["Многу Ниско", "Ниско", "Средно", "Високо", "Многу Високо"],
  },
  {
    id: "exercise",
    type: "radio",
    question: "Дали вежбаше или имаше физичка активност денес?",
    options: [
      "Без активност",
      "Лесна активност (10-30 мин)",
      "Умерена активност (30-60 мин)",
      "Интензивна активност (60+ мин)",
    ],
  },
  {
    id: "social",
    type: "radio",
    question: "Дали денес имаше социјална интеракција и како ќе ја опишеш?",
    options: ["Никаква", "Многу малку", "Умерено", "Прилично многу", "Многу"],
  },
  {
    id: "stress",
    type: "slider",
    question: "Оцени го нивото на стрес денес (1-10)",
    min: 1,
    max: 10,
    step: 1,
  },
  {
    id: "productivity",
    type: "radio",
    question: "Колку се чуствуваше продуктивно денес?",
    options: [
      "Воопшто не продуктивно",
      "Малку продуктивно",
      "Умерено продуктивно",
      "Многу продуктивно",
      "Исклучително продуктивно ",
    ],
  },
  {
    id: "thoughts",
    type: "textarea",
    question: "Некои дополнителни размислувања за денешниот ден?",
  },
]

export function Questionnaire({ onSubmit }: QuestionnaireProps) {
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleResponse = (questionId: string, value: any) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const submissionData = {
      ...responses,
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString(),
    }

    const result = await saveQuestionnaireResponse(submissionData)

    if (result.success) {
      onSubmit(submissionData)
      setIsComplete(true)
    } else {
      alert("Прашалникот не се зачува успешно. Ве молиме обидете се повторно.")
    }

    setIsSubmitting(false)
  }

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Успешно го заврши прашалникот!</h2>
            <p className="text-muted-foreground mb-4">
              Ти благодариме што одвои време да ни кажеш за твојот ден. Твоите одговори се зачувани и ни помагаат да ти обезбедиме што е можно
              подобар извештај.
            </p>
            <Button
              onClick={() => {
                setIsComplete(false)
                setCurrentQuestion(0)
                setResponses({})
              }}
            >
             Почни повторно!
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Дневен прашалник</h1>
        <p className="text-muted-foreground">Помогни ни да ги разбереме подобро твоите дневни навики!</p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Прашање {currentQuestion + 1} од {questions.length}
          </CardTitle>
          <CardDescription>{question.question}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {question.type === "radio" && (
            <RadioGroup
              value={responses[question.id] || ""}
              onValueChange={(value) => handleResponse(question.id, value)}
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                  <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === "slider" && (
            <div className="space-y-4">
              <Slider
                value={[responses[question.id] || question.min]}
                onValueChange={(value) => handleResponse(question.id, value[0])}
                min={question.min}
                max={question.max}
                step={question.step}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{question.min}</span>
                <span className="font-medium"> {responses[question.id] || question.min}</span>
                <span>{question.max}</span>
              </div>
            </div>
          )}

          {question.type === "textarea" && (
            <Textarea
              value={responses[question.id] || ""}
              onChange={(e) => handleResponse(question.id, e.target.value)}
              placeholder="Сподели ги своите мисли со нас..."
              className="min-h-[100px]"
            />
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Претходно
            </Button>
            <Button
              onClick={handleNext}
              disabled={(!responses[question.id] && question.type !== "textarea") || isSubmitting}
            >
              {isSubmitting ? "Saving..." : currentQuestion === questions.length - 1 ? "Заврши" : "Следно"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
