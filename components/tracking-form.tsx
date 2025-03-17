"use client"

import type React from "react"

import { useState } from "react"
import { Search, Package, Truck, AlertCircle, FileText, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface TrackingHistoryItem {
  Name: string
  Date: string
}

interface TrackingData {
  status: string
  trackingNumber: string
  recipient: string
  sender: string
  weight: number
  cost: number
  Statuses: TrackingHistoryItem[]
}

export function TrackingForm() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber }),
      })

      const responseText = await response.text()
      let data

      try {
        // Try to parse the JSON response
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error("Error parsing response:", parseError, "Response text:", responseText)
        throw new Error("Failed to parse server response. Please try again later.")
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to track package")
      }

      setTrackingData(data.data)
    } catch (err) {
      console.error("Tracking form error:", err)
      setError(
        err instanceof Error ? err.message : "An error occurred while tracking your package. Please try again later.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes("доставке")) {
      return <Truck className="h-5 w-5" />
    } else if (statusLower.includes("складе")) {
      return <Package className="h-5 w-5" />
    } else if (statusLower.includes("таможенном")) {
      return <FileText className="h-5 w-5" />
    } else if (statusLower.includes("отправлено")) {
      return <Truck className="h-5 w-5" />
    } else if (statusLower.includes("упаковке")) {
      return <Package className="h-5 w-5" />
    } else {
      return <Package className="h-5 w-5" />
    }
  }

  // Function to check if a status has a date (is completed)
  const isStatusCompleted = (date: string) => date !== ""

  // Function to get the current active status index
  const getCurrentStatusIndex = () => {
    if (!trackingData) return -1

    // Find the last status with a date
    for (let i = trackingData.Statuses.length - 1; i >= 0; i--) {
      if (isStatusCompleted(trackingData.Statuses[i].Date)) {
        return i
      }
    }
    return -1
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="overflow-hidden border-none shadow-lg">
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              placeholder="Enter tracking number (e.g., OTB00002)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              disabled={isLoading}
              className="border-2 focus-visible:ring-primary"
            />
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Tracking...
                </span>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Track
                </>
              )}
            </Button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {trackingData && (
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="bg-muted/30 rounded-xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Tracking Number</p>
                    <p className="font-medium">{trackingData.trackingNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Weight</p>
                    <p className="font-medium">{trackingData.weight} kg</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Sender</p>
                    <p className="font-medium">{trackingData.sender}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Recipient</p>
                    <p className="font-medium">{trackingData.recipient}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="pt-4"
                >
                  <h3 className="text-lg font-semibold mb-8 text-center">Delivery Status</h3>

                  <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-2">
                    {trackingData.Statuses.map((item, index) => {
                      const isCompleted = isStatusCompleted(item.Date)
                      const isActive = index === getCurrentStatusIndex()
                      const isLast = index === trackingData.Statuses.length - 1

                      return (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center relative w-full"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                        >
                          {/* Status indicator */}
                          <motion.div
                            className={`w-16 h-16 rounded-full flex items-center justify-center relative z-10 border-4 ${
                              isActive
                                ? "border-primary bg-primary text-white"
                                : isCompleted
                                  ? "border-primary bg-white text-primary"
                                  : "border-gray-200 bg-white text-gray-300"
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 15,
                              delay: index * 0.1 + 0.5,
                            }}
                          >
                            {isCompleted ? (
                              isActive ? (
                                getStatusIcon(item.Name)
                              ) : (
                                <Check className="h-8 w-8" />
                              )
                            ) : (
                              getStatusIcon(item.Name)
                            )}
                          </motion.div>

                          {/* Connection line */}
                          {!isLast && (
                            <div className="hidden md:block absolute top-8 left-[calc(50%+8px)] right-0 h-0.5 bg-gray-200 z-0">
                              {isCompleted && (
                                <motion.div
                                  className="absolute top-0 left-0 h-full bg-primary"
                                  initial={{ width: 0 }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
                                />
                              )}
                            </div>
                          )}

                          {/* Status content */}
                          <motion.div
                            className={`text-center mt-4 max-w-[150px] ${
                              isActive
                                ? "text-primary font-medium"
                                : isCompleted
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                            }`}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
                          >
                            <div className={`${isActive ? "font-semibold" : "font-medium"}`}>{item.Name}</div>
                            {item.Date && (
                              <div className={`text-sm ${isActive ? "text-primary/70" : "text-muted-foreground"}`}>
                                {item.Date}
                              </div>
                            )}
                          </motion.div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

