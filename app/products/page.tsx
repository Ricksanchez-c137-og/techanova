import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Products() {
  const products = [
    { name: "TechNova CRM", description: "Customer Relationship Management software", price: "$99/month", features: ["Contact Management", "Sales Automation", "Reporting"] },
    { name: "TechNova ERP", description: "Enterprise Resource Planning solution", price: "$199/month", features: ["Finance", "HR", "Inventory"] },
    { name: "TechNova Analytics", description: "Business Intelligence and Analytics platform", price: "$149/month", features: ["Data Visualization", "Predictive Analytics", "Custom Reports"] },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Our Products</h1>
      <p className="text-xl">Explore our range of software products designed to enhance your business operations.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-bold mb-2">{product.price}</p>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, i) => (
                  <Badge key={i} variant="secondary">{feature}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}