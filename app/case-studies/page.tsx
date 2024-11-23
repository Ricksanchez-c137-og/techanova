import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CaseStudies() {
  const caseStudies = [
    { title: "Revolutionizing Retail with IoT", client: "MegaMart", industry: "Retail", description: "How we helped MegaMart implement IoT solutions to optimize inventory management and improve customer experience." },
    { title: "Securing Financial Data with Blockchain", client: "SecureBank", industry: "Finance", description: "Our blockchain solution for SecureBank that enhanced data security and streamlined transactions." },
    { title: "AI-Driven Manufacturing Efficiency", client: "TechFactory", industry: "Manufacturing", description: "Implementing AI and machine learning to boost TechFactory's production efficiency by 40%." },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Case Studies</h1>
      <p className="text-xl">Discover how we&apos;ve helped businesses across various industries achieve their goals.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{study.title}</CardTitle>
              <CardDescription>{study.client} - {study.industry}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{study.description}</p>
              <Button variant="outline">Read Full Case Study</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}