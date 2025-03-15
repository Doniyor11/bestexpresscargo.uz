import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Please fill in all required fields" }, { status: 400 })
    }

    // Telegram bot configuration
    const botToken = "7650143276:AAFOwr4R9HPJYqcw61Be7u4zmIs42Lb9F8c"
    const chatId = "-1002340938586"

    // Format the message
    const formattedMessage = `
🔔 *New message from Best Express Expo website*

👤 *Name:* ${name}
📧 *Email:* ${email}
📝 *Subject:* ${subject || "Not specified"}

*Message:*
${message}
    `

    // Send to Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: formattedMessage,
        parse_mode: "Markdown",
      }),
    })

    const telegramData = await telegramResponse.json()

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", telegramData)
      return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ success: false, error: "An unexpected error occurred" }, { status: 500 })
  }
}

