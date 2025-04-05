import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get the request body (contains the text)
    const body = await request.json();
    
    // Forward the request to the backend
    const response = await fetch(`http://backend:5000/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // Forward the same body we received
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying to backend:", error);
    return NextResponse.json({ error: "Failed to reach backend" }, { status: 500 });
  }
}