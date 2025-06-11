import { NextResponse } from 'next/server';

export async function GET() {
  const env = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'Not set',
    NODE_ENV: process.env.NODE_ENV || 'Not set',
  };

  console.log('Environment variables:', env);

  return NextResponse.json({
    message: 'Environment variables',
    env: env,
  });
} 