import { createHash, timingSafeEqual } from 'crypto';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

function verifyCloudinarySignature(
  rawBody: string,
  signature: string | null,
): boolean {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!signature || !apiSecret) return false;

  const expected = createHash('sha1')
    .update(rawBody + apiSecret)
    .digest('hex');

  try {
    return timingSafeEqual(
      Buffer.from(expected, 'utf8'),
      Buffer.from(signature, 'utf8'),
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  const cloudinarySignature = request.headers.get('x-cld-signature');
  const secret = request.nextUrl.searchParams.get('secret');
  const revalidationSecret = process.env.REVALIDATION_SECRET;

  const isValidCloudinary = verifyCloudinarySignature(
    rawBody,
    cloudinarySignature,
  );
  const isValidSecret =
    Boolean(revalidationSecret) &&
    Boolean(secret) &&
    secret === revalidationSecret;

  if (!isValidCloudinary && !isValidSecret) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/photos');
  revalidatePath('/videos');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
