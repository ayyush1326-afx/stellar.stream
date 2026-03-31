import { NextResponse } from 'next/server';
import { addContent, getFeed, ContentItem } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body: ContentItem = await request.json();
    addContent(body);
    return NextResponse.json({ success: true, item: body });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add content' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(getFeed());
}
