import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const testimonials = [
    { name: "John Doe", company: "Company A", content: "Al Hosn transformed our IT infrastructure. Highly recommended!", avatar: "JD" },
    { name: "Jane Smith", company: "Company B", content: "Their AI solutions have significantly improved our productivity.", avatar: "JS" },
    { name: "Alex Johnson", company: "Company C", content: "Al Hosn's data analytics services provided invaluable insights for our business.", avatar: "AJ" },
  ]

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to TechNova</h1>
        <p className="text-xl">Innovative IT Solutions for the Modern World</p>
        <Button asChild>
          <Link href="/contact">Get Started</Link>
        </Button>
      </section>

      {/* Updated Carousel Items */}
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {["IT Infrastructure", "Cybersecurity", "AI Solutions"].map((service, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{service}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
          <p>Discover our wide range of IT services tailored for your business needs.</p>
          <Button variant="link" asChild>
            <Link href="/services">Learn More</Link>
          </Button>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Products</h2>
          <p>Explore our cutting-edge software products designed to boost your productivity.</p>
          <Button variant="link" asChild>
            <Link href="/products">View Products</Link>
          </Button>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Case Studies</h2>
          <p>See how we&apos;ve helped businesses like yours achieve their goals.</p>
          <Button variant="link" asChild>
            <Link href="/case-studies">Read Case Studies</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${testimonial.avatar}`} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{`"${testimonial.content}"`}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
