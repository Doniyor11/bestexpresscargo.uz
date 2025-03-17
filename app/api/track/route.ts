import { NextResponse } from "next/server"

interface Status {
  Name: string
  Date: string
}

interface TrackingResponse {
  Recipient: string
  Sender: string
  TrackNumber: string
  Weight: number
  Sum: number
  Statuses: Status[]
}

export async function POST(request: Request) {
  try {
    const { trackingNumber } = await request.json()

    if (!trackingNumber) {
      return NextResponse.json({ error: "Tracking number is required" }, { status: 400 })
    }

    // Using the provided credentials
    const username = "Интегратор"
    const password = "ddx3355@"

    const auth = Buffer.from(`${username}:${password}`).toString("base64")

    const apiUrl = `http://cn23.uz:8855/bestexpressexpo/hs/InvoicesInformation/${trackingNumber}`
    console.log(`Fetching from API URL: ${apiUrl}`)

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Package not found. Please check your tracking number and try again." },
          { status: 404 },
        )
      }

      // Try to get more information about the error
      const errorText = await response.text()
      console.error(`API Error: ${response.status}, Response: ${errorText}`)
      throw new Error(`API Error: ${response.status}, Response: ${errorText || "No response body"}`)
    }

    // Check if the response is empty
    const responseText = await response.text()
    if (!responseText || responseText.trim() === "") {
      console.error("Empty response received from API")
      return NextResponse.json(
        { error: "The tracking service returned an empty response. Please try again later." },
        { status: 500 },
      )
    }

    // Parse the JSON response safely
    let data: TrackingResponse
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Response text:", responseText)
      return NextResponse.json(
        { error: "Failed to parse tracking information. Please try again later." },
        { status: 500 },
      )
    }

    // Validate the response data
    if (!data || !data.Statuses) {
      console.error("Invalid data structure received:", data)
      return NextResponse.json({ error: "Invalid tracking data received. Please try again later." }, { status: 500 })
    }

    // Transform the data to match our frontend format
    const transformedData = {
      status: data.Statuses.find((s) => s.Date !== "")?.Name || "Processing",
      trackingNumber: data.TrackNumber,
      recipient: data.Recipient,
      sender: data.Sender,
      weight: data.Weight,
      cost: data.Sum,
      Statuses: data.Statuses,
    }

    return NextResponse.json({ success: true, data: transformedData })
  } catch (error) {
    console.error("Tracking error:", error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to retrieve tracking information. Please try again later.",
      },
      { status: 500 },
    )
  }
}

