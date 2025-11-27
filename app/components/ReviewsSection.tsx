"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Developer at Google",
    avatar: "/professional-woman-headshot.png",
    rating: 5,
    title: "Game-changer for documentation",
    content:
      "WeaveIt has completely transformed how we create developer documentation. What used to take days now takes minutes. The AI understands code context perfectly and creates engaging tutorials that our users love.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "DevRel Lead at Stripe",
    avatar: "/professional-man-headshot.png",
    rating: 5,
    title: "Essential tool for developer relations",
    content:
      "As a DevRel professional, I create tutorial content constantly. WeaveIt has 10x-ed my productivity. The quality of AI-generated scripts is remarkable - they actually sound natural and engaging.",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Tech YouTuber (500K subscribers)",
    avatar: "/young-woman-content-creator-headshot.jpg",
    rating: 5,
    title: "My secret weapon for consistent uploads",
    content:
      "I was struggling to maintain a consistent upload schedule while working full-time. WeaveIt lets me turn my code projects into polished tutorials in under an hour. My audience growth has exploded since I started using it.",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "David Park",
    role: "Engineering Manager at Meta",
    avatar: "/asian-man-professional-headshot.png",
    rating: 5,
    title: "Perfect for internal training",
    content:
      "We use WeaveIt for all our internal engineering training videos. The API integration with our CI/CD means new tutorials are automatically generated when we push code updates. Brilliant product.",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Bootcamp Instructor",
    avatar: "/woman-teacher-headshot.jpg",
    rating: 5,
    title: "Students love the tutorial quality",
    content:
      "Teaching coding bootcamps requires constantly updated content. WeaveIt helps me create professional-quality tutorials that keep up with the latest frameworks and best practices. My students are learning faster than ever.",
    date: "2 months ago",
  },
]

const ratingStats = [
  { stars: 5, percentage: 89 },
  { stars: 4, percentage: 8 },
  { stars: 3, percentage: 2 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 0 },
]

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
            Customer Reviews
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Loved by 12,500+ Creators
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what developers and content creators are saying about WeaveIt
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating Summary */}
          <div className="card-elevated">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-foreground mb-2">4.9</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">Based on 2,847 reviews</p>
            </div>
            <div className="space-y-3">
              {ratingStats.map((stat) => (
                <div key={stat.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-sm text-muted-foreground">{stat.stars}</span>
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12">{stat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Review Carousel */}
          <div className="lg:col-span-2">
            <div className="card-elevated relative">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/20" />
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={reviews[currentIndex].avatar || "/placeholder.svg"}
                  alt={reviews[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h4 className="text-lg font-semibold text-foreground">{reviews[currentIndex].name}</h4>
                  <p className="text-sm text-muted-foreground">{reviews[currentIndex].role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{reviews[currentIndex].title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{reviews[currentIndex].content}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{reviews[currentIndex].date}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevReview}
                    className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {currentIndex + 1} / {reviews.length}
                  </span>
                  <button
                    onClick={nextReview}
                    className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Reviews Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="card-elevated">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
              <h5 className="font-medium text-foreground mb-2">{review.title}</h5>
              <p className="text-sm text-muted-foreground line-clamp-3">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
