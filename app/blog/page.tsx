import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Blog() {
  const blogPosts = [
    { title: "The Future of Cloud Computing", date: "2023-06-15", excerpt: "Explore the latest trends and predictions for cloud computing in the coming years." },
    { title: "Cybersecurity Best Practices for Remote Work", date: "2023-06-10", excerpt: "Learn how to keep your business secure with a distributed workforce." },
    { title: "Leveraging AI for Customer Service", date: "2023-06-05", excerpt: "Discover how AI is transforming customer service and improving satisfaction." },
    { title: "The Rise of Edge Computing", date: "2023-05-30", excerpt: "Understand the benefits and applications of edge computing in various industries." },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Al Hosn Blog</h1>
      <p className="text-xl">Stay updated with the latest in technology and IT solutions.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.excerpt}</p>
              <Button variant="outline">Read More</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}