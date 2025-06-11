import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch a specific logistics provider by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  const { id } = params;

  try {
    console.log(`Fetching logistics provider with ID: ${id}`);
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/logistics-providers/${id}`, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      console.error('Error fetching logistics provider:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error fetching logistics provider: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching logistics provider with ID ${id}:`, error);
    return NextResponse.json(
      { message: 'Failed to fetch logistics provider' },
      { status: 500 }
    );
  }
}

// PATCH: Update a specific logistics provider by ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  const { id } = params;

  try {
    const logisticsData = await req.json();
    console.log(`Updating logistics provider with ID: ${id}`, logisticsData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/logistics-providers/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(logisticsData)
      }
    );

    if (!response.ok) {
      console.error('Error updating logistics provider:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error updating logistics provider: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error updating logistics provider with ID ${id}:`, error);
    return NextResponse.json(
      { message: 'Failed to update logistics provider' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a specific logistics provider by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  const { id } = params;

  try {
    console.log(`Deleting logistics provider with ID: ${id}`);
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/logistics-providers/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      console.error('Error deleting logistics provider:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error deleting logistics provider: ${response.statusText}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting logistics provider with ID ${id}:`, error);
    return NextResponse.json(
      { message: 'Failed to delete logistics provider' },
      { status: 500 }
    );
  }
} 