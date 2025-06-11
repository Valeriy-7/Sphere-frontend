import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const token = (await cookies()).get('auth.access_token')?.value;
  
  // Only show the first and last 5 characters of the token for security
  let maskedToken = 'Not set';
  if (token) {
    if (token.length > 10) {
      maskedToken = `${token.substring(0, 5)}...${token.substring(token.length - 5)}`;
    } else {
      maskedToken = 'Token exists but is too short';
    }
  }

  console.log('Auth token exists:', !!token);

  return NextResponse.json({
    message: 'Auth token check',
    tokenExists: !!token,
    maskedToken: maskedToken,
    tokenLength: token ? token.length : 0,
  });
} 