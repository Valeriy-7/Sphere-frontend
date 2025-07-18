import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch all storage data with proper size information for the current FF account
export async function GET(req: NextRequest) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  try {
    console.log('Fetching all storage data with size information for FF account');
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/storage/all`, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      console.error('Error fetching all storage data:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error fetching storage data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successfully fetched all storage data with size information');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching all storage data:', error);
    return NextResponse.json(
      { message: 'Failed to fetch storage data' },
      { status: 500 }
    );
  }
} 