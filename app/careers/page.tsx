import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Careers() {
  const jobOpenings = [
    { title: "Senior Software Engineer", department: "Engineering", location: "Remote" },
    { title: "Data Scientist", department: "Analytics", location: "Abu Dhabi, UAE" },
    { title: "UX Designer", department: "Design", location: "Cairo, Egypt " },
    { title: "Cloud Solutions Architect", department: "Infrastructure", location: "Remote" },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Careers at Al Hosn</h1>
      <p className="text-xl">Join our team of innovators and shape the future of technology.</p>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Why Al Hosn?</h2>
        <ul className="list-disc list-inside">
          <li>Innovative projects and cutting-edge technologies</li>
          <li>Collaborative and inclusive work environment</li>
          <li>Continuous learning and growth opportunities</li>
          <li>Competitive compensation and benefits</li>
        </ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Current Openings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobOpenings.map((job, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.department} - {job.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">View Job Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}