import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Services() {
  const services = [
    { title: "Cloud Solutions", description: "Scalable and secure cloud infrastructure for your business." },
    { title: "Cybersecurity", description: "Protect your digital assets with our advanced security solutions." },
    { title: "Data Analytics", description: "Turn your data into actionable insights with our analytics services." },
    { title: "AI & Machine Learning", description: "Harness the power of AI to automate and optimize your processes." },
    { title: "IoT Solutions", description: "Connect and manage your devices with our IoT expertise." },
    { title: "IT Consulting", description: "Strategic technology advice to drive your business forward." },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Our Services</h1>
      <p className="text-xl">Discover our comprehensive range of IT services designed to meet your business needs.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}