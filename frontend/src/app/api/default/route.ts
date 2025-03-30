import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`http://backend:5000`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying to backend:", error);
    return NextResponse.json({ error: "Failed to reach backend" }, { status: 500 });
  }
}