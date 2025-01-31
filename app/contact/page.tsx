'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "test' -- ",  // Example SQL injection payload
      email: "test@test.com",
      subject: "' OR '1'='1", // Another SQL injection attempt
      message: "'; DROP TABLE messages; -- ", // Dangerous SQL query attempt
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      console.log("Server Response:", responseData); // Logs API response for debugging

      if (response.ok) {
        toast(
          <div>
            <strong>Message Sent!</strong>
            <p>We will get back to you as soon as possible.</p>
          </div>,
          { type: "success" }
        );
      } else {
        toast(`Error: ${responseData.message}`, { type: "error" });
      }
    } catch (error) {
      toast("Failed to send the message. Please try again later.", { type: "error" });
      console.error("Error submitting the form:", error);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Contact Us</h1>
      <p className="text-xl">Get in touch with our team for any inquiries or support.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name (SQL Injection Allowed)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject (SQL Injection Allowed)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your Message (SQL Injection Allowed)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Send Message</Button>
          </form>
        </Form>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <p>Email: info@alhosn.com</p>
          <p>Phone: +971 (050) 123-4567</p>
          <p>Address: 123 Tech Street, Abu Dhabi, UAE 94105</p>
          <h2 className="text-2xl font-semibold">Office Hours</h2>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday - Sunday: Closed</p>
        </div>
      </div>
    </div>
  )
}
