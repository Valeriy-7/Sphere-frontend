import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch all WB storage data for the current WB cabinet
export async function GET(req: NextRequest) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  try {
    console.log('Fetching WB storage data for WB cabinet');
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wb/storage`, 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      console.error('Error fetching WB storage data:', response.status, response.statusText);
      return NextResponse.json(
        { message: `Error fetching WB storage data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successfully fetched WB storage data');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching WB storage data:', error);
    return NextResponse.json(
      { message: 'Failed to fetch WB storage data' },
      { status: 500 }
    );
  }
} 