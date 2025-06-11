import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// PATCH: Redirect to the correct logistics-provider endpoint
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = (await cookies()).get('auth.access_token')?.value;

  if (!token) {
    console.error('No auth token found when updating logistics provider');
    return NextResponse.json(
      { message: 'Unauthorized: No token provided' },
      { status: 401 }
    );
  }

  const { id } = params;
  console.log(`Redirecting logistics request for delivery ${id} to logistics-provider endpoint`);

  try {
    // Extract the body
    const body = await req.json();
    
    // Forward to the correct endpoint
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-account/deliveries/${id}/logistics-provider`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error updating logistics provider:', response.status, response.statusText, errorText);
      return NextResponse.json(
        { message: `Error updating logistics provider: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    console.log(`Successfully updated logistics provider for delivery ${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error updating logistics provider for delivery ${id}:`, error);
    return NextResponse.json(
      { message: 'Failed to update logistics provider', error: String(error) },
      { status: 500 }
    );
  }
} 