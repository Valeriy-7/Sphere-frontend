import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  console.log("Attempting to read token cookie...");
  const token = (await cookies()).get('auth.access_token')?.value;
  console.log("Token from cookie ('auth.access_token'):", token ? "Token found" : "Token not found");

  // TODO: We also need the current FF cabinet ID. Assuming it's stored in a cookie or needs to be passed.
  // For now, let's assume it's part of the backend's context based on the token.

  if (!token) {
    console.error("Authorization failed: Token not found in cookies under name 'auth.access_token'.");
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ff-config/linked-wb-cabinets`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // If the backend expects the cabinet ID in a header (e.g., 'X-Cabinet-Id'), add it here
          // based on how it's stored/retrieved on the frontend side (e.g. another cookie).
        },
      },
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.text();
      console.error('Backend error fetching linked WB cabinets:', errorData);
      return NextResponse.json(
        { message: 'Failed to fetch linked WB cabinets', details: errorData },
        { status: backendResponse.status },
      );
    }

    const linkedWbCabinets = await backendResponse.json();
    return NextResponse.json(linkedWbCabinets);
  } catch (error: any) {
    console.error('Error fetching linked WB cabinets:', error);
    return NextResponse.json(
      { message: 'Internal server error', details: error.message },
      { status: 500 },
    );
  }
} 