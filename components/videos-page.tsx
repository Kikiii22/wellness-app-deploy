import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Star } from "lucide-react"
import Link from "next/link";
import { useState } from "react"

const videos = [
  {
    id: 1,
    title: "5-Минутна Утринска Медитација",
    description: "Започни го денот со позитивна енергија",
    duration: "5:15",
    category: "Медитација",
    rating: 4.8,
    thumbnail: "/mornin.webp",
    url: "http://youtube.com/watch?v=JoHN7lJxD8M",
    embedUrl: "https://www.youtube.com/embed/JoHN7lJxD8M"
  },
  {
    id: 2,
    title: "Вежби за дишење против анксиозност",
    description: "Научете ефикасни техники на дишење за справување со анксиозност и стрес",
    duration: "10:33",
    category: "Анксиозност",
    rating: 4.9,
    thumbnail: "/Sunset-Meditation.jpg",
    url: "https://www.youtube.com/watch?v=LiUnFJ8P4gM",
    embedUrl: "https://www.youtube.com/embed/LiUnFJ8P4gM"

  },
  {


    id: 3,
    title: " Прогресивна мускулна релаксација",
    description: " Техника за релаксација на целото тело, наменета за намалување на стресот, ослободување од напнатост и подобрување на квалитетот на сонот.",
    duration: "14:55",
    category: "Релаксација",
    rating: 4.7,
    embedUrl: "https://www.youtube.com/embed/ihO02wUzgkc",
    thumbnail: "Fotolia_80166945_Subscription_Monthly_M-2.jpg",
    url: "https://www.youtube.com/watch?v=ihO02wUzgkc"
  },
  {
    id: 4,
    title: "Медитација за ослободување на стресот",
    description: "Ослободи се од стресот и прочисти ја внатрешната енергија",
    duration: "10:08",
    category: "Стрес",
    rating: 4.6,
    thumbnail: "/Stress-Relief-HD-Background-Wallpaper-44305.jpg",
    embedUrl: "https://www.youtube.com/embed/X4WjbW6amQw"
,
    url: "https://www.youtube.com/watch?v=X4WjbW6amQw"
  },
  {
    id: 5,
    title: "Медитација за благодарност",
    description: "Развиј благодарност и позитивно размислување",
    duration: "5:15",
    category: "Медитација",
    rating: 4.8,
    thumbnail: "/gratitude-meditation.jpg",
    embedUrl: "https://www.youtube.com/embed/zyUy9w953L0"
,
    url: "https://www.youtube.com/watch?v=zyUy9w953L0"
  },
  {
    id: 6,
    title: "Приказна за подобар сон и релаксација",
    description: "Смирувачки раскажана приказна што ќе ти помогне полесно да заспиеш и имаш мирен сон",
    duration: "1:40:53",
    category: "Сон",
    rating: 4.9,
    thumbnail: "/sleep.jpeg",
    embedUrl: "https://www.youtube.com/embed/_q5L0JLi0zo"
,
    url: "https://www.youtube.com/watch?v=_q5L0JLi0zo"
  },
]
type Video = {
  id: number
  title: string
  description: string
  duration: string
  category: string
  rating: number
  thumbnail: string
  embedUrl: string
}
const categories = ["Се", "Медитација", "Анксиозност", "Релаксација", "Стрес", "Сон"]

export function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Предлог видеа</h1>
          <p className="text-muted-foreground">
            Откриј медитации, техники за релаксација и за благосостојба.          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
              <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Badge>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
              <div key={video.id} className="block" onClick={() => setSelectedVideo(video)}>
                <Card className="group cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative flex-shrink-0">
                    <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-t-lg flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">{video.category}</Badge>
                  </div>
                  <CardHeader className="pb-2 flex-shrink-0">
                    <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{video.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{video.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
          ))}
        </div>


        {selectedVideo && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-xl font-semibold">{selectedVideo.title}</h2>
                  <button onClick={() => setSelectedVideo(null)} className="text-gray-500 hover:text-black text-sm">
                    Close ✕
                  </button>
                </div>
                <div className="aspect-video">
                  <iframe
                      src={selectedVideo.embedUrl}
                      title={selectedVideo.title}
                      className="w-full h-full rounded-b-lg"
                      frameBorder="0"
                      allowFullScreen
                  />
                </div>
              </div>
            </div>
        )}
      </div>
  )
}
