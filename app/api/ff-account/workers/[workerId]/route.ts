import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch a specific worker by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { workerId: string } }
) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  const { workerId } = params;

  try {
    console.log(`Fetching worker with ID: ${workerId}`);
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/workers/${workerId}`, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      console.error('Error fetching worker:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error fetching worker: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching worker with ID ${workerId}:`, error);
    return NextResponse.json(
      { message: 'Failed to fetch worker' },
      { status: 500 }
    );
  }
}

// PUT: Update a specific worker by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { workerId: string } }
) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  const { workerId } = params;

  try {
    const workerData = await req.json();
    console.log(`Updating worker with ID: ${workerId}`, workerData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/workers/${workerId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(workerData)
      }
    );

    if (!response.ok) {
      console.error('Error updating worker:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error updating worker: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error updating worker with ID ${workerId}:`, error);
    return NextResponse.json(
      { message: 'Failed to update worker' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a specific worker by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { workerId: string } }
) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  const { workerId } = params;

  try {
    console.log(`Deleting worker with ID: ${workerId}`);
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/workers/${workerId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      console.error('Error deleting worker:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error deleting worker: ${response.statusText}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting worker with ID ${workerId}:`, error);
    return NextResponse.json(
      { message: 'Failed to delete worker' },
      { status: 500 }
    );
  }
} 