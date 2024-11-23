import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export default function FAQ() {
    const faqs = [
      { question: "What services does TechNova offer?", answer: "TechNova offers a wide range of IT services including cloud solutions, cybersecurity, data analytics, AI & machine learning, IoT solutions, and IT consulting." },
      { question: "How can I request a quote for your services?", answer: "You can request a quote by filling out the contact form on our Contact page or by emailing us directly at quotes@technova.com." },
      { question: "Do you offer support for your products?", answer: "Yes, we offer comprehensive support for all our products. Our support team is available 24/7 to assist you with any issues or questions." },
      { question: "What industries do you serve?", answer: "We serve a wide range of industries including finance, healthcare, retail, manufacturing, and more. Our solutions are customizable to meet the specific needs of each industry." },
      { question: "How do I apply for a job at TechNova?", answer: "You can view our current job openings on our Careers page. To apply, click on the job you're interested in and follow the application instructions." },
    ]
  
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-xl">Find answers to common questions about TechNova and our services.</p>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  }