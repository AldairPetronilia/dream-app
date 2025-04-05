import { NextResponse } from 'next/server';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function GET() {
  try {
    // This call happens from inside the container, so "backend" domain works
    const response = await fetch(backendUrl + `/hello`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying to backend:", error);
    return NextResponse.json({ error: "Failed to reach backend" }, { status: 500 });
  }
}