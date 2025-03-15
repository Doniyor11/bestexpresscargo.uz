"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface ContactFormProps {
  translations: {
    name: string
    email: string
    subject: string
    message: string
    send: string
    success: string
    error: string
    requiredFields: string
  }
}

export function ContactForm({ translations }: ContactFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: translations.error,
        description: translations.requiredFields,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: translations.success,
          description: "",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        toast({
          title: translations.error,
          description: data.error || "",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: translations.error,
        description: "",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Input
            name="name"
            placeholder={translations.name}
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            name="email"
            type="email"
            placeholder={translations.email}
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Input
          name="subject"
          placeholder={translations.subject}
          value={formData.subject}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <textarea
          name="message"
          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={translations.message}
          value={formData.message}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {translations.send}
          </>
        ) : (
          translations.send
        )}
      </Button>
    </form>
  )
}

