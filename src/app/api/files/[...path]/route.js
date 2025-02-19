import { createReadStream } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const filePath = join(process.cwd(), 'public', 'uploads', params.path.join('/'));
  
  try {
    const stream = createReadStream(filePath);
    return new NextResponse(stream);
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
} 