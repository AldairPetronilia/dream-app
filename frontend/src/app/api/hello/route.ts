import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This call happens from inside the container, so "backend" domain works
    const response = await fetch(`http://backend:5000/hello`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying to backend:", error);
    return NextResponse.json({ error: "Failed to reach backend" }, { status: 500 });
  }
}