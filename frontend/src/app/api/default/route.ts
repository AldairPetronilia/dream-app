import { NextResponse } from 'next/server';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET() {
  try {
    if (!backendUrl) {
      throw new Error("Backend URL is not defined");
    }
    const response = await fetch(backendUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying to backend:", error);
    return NextResponse.json({ error: "Failed to reach backend" }, { status: 500 });
  }
}