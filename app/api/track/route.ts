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

    const response = await fetch(`http://cn23.uz:8855/cn23rofogroup/hs/InvoicesInformation/${trackingNumber}`, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Package not found. Please check your tracking number and try again." },
          { status: 404 },
        )
      }
      throw new Error(`API Error: ${response.status}`)
    }

    const data: TrackingResponse = await response.json()

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
      { error: "Failed to retrieve tracking information. Please try again later." },
      { status: 500 },
    )
  }
}

