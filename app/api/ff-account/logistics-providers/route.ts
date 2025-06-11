import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch all logistics providers for the current FF account
export async function GET(req: NextRequest) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  try {
    console.log('Fetching logistics providers for FF account');
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/logistics-providers`, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      console.error('Error fetching logistics providers:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error fetching logistics providers: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching logistics providers:', error);
    return NextResponse.json(
      { message: 'Failed to fetch logistics providers' },
      { status: 500 }
    );
  }
}

// POST: Create a new logistics provider for the current FF account
export async function POST(req: NextRequest) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  try {
    const logisticsData = await req.json();
    console.log('Creating new logistics provider with data:', logisticsData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/logistics-providers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(logisticsData)
      }
    );

    if (!response.ok) {
      console.error('Error creating logistics provider:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error creating logistics provider: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating logistics provider:', error);
    return NextResponse.json(
      { message: 'Failed to create logistics provider' },
      { status: 500 }
    );
  }
} 