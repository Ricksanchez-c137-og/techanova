export default function About() {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">About Al Hosn</h1>
        <p className="text-xl">TechNova is a leading IT solutions provider, dedicated to empowering businesses through innovative technology.</p>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>To deliver cutting-edge IT solutions that drive business growth and efficiency.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p>To be the global leader in transformative IT services, shaping the future of technology.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc list-inside">
            <li>Innovation</li>
            <li>Integrity</li>
            <li>Collaboration</li>
            <li>Excellence</li>
          </ul>
        </section>
      </div>
    )
  }