import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Newsletter service not configured." }, { status: 503 });
  }

  const res = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email, type: "regular" }),
  });

  if (res.status === 201) {
    return NextResponse.json({ success: true });
  }

  if (res.status === 400) {
    const body = await res.json().catch(() => ({}));
    // Already subscribed
    if (JSON.stringify(body).includes("already")) {
      return NextResponse.json({ error: "You're already subscribed!" }, { status: 409 });
    }
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
}
