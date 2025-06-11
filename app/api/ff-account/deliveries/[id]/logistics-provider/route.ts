import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// PATCH: Update the logistics provider for a delivery
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
  console.log(`Updating logistics provider for delivery ${id}`);

  try {
    const body = await req.json();
    const { logisticsProviderId } = body;
    console.log(`Logistics provider ID: ${logisticsProviderId}`);
    console.log(`Request body: ${JSON.stringify(body)}`);
    
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/ff-account/deliveries/${id}/logistics-provider`;
    console.log(`Sending request to: ${apiUrl}`);
    
    // Custom endpoint to only update logistics provider without changing status
    const response = await fetch(
      apiUrl,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ logisticsProviderId })
      }
    );

    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error updating logistics provider:', response.status, response.statusText);
      console.error('Error details:', errorText);
      
      // Try to parse the error as JSON
      try {
        const errorJson = JSON.parse(errorText);
        console.error('Parsed error:', errorJson);
      } catch (e) {
        console.error('Could not parse error as JSON');
      }
      
      return NextResponse.json(
        { message: `Error updating logistics provider: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    console.log(`Successfully updated logistics provider for delivery ${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error updating logistics provider for delivery ${id}:`, error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { message: 'Failed to update logistics provider', error: String(error) },
      { status: 500 }
    );
  }
} 