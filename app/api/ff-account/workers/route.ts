import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch all workers for the current FF account
export async function GET(req: NextRequest) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  try {
    console.log('Fetching workers for FF account');
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/workers`, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      console.error('Error fetching workers:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error fetching workers: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching workers:', error);
    return NextResponse.json(
      { message: 'Failed to fetch workers' },
      { status: 500 }
    );
  }
}

// POST: Create a new worker for the current FF account
export async function POST(req: NextRequest) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  try {
    const workerData = await req.json();
    console.log('Creating new worker with data:', workerData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/workers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(workerData)
      }
    );

    if (!response.ok) {
      console.error('Error creating worker:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error creating worker: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating worker:', error);
    return NextResponse.json(
      { message: 'Failed to create worker' },
      { status: 500 }
    );
  }
} 