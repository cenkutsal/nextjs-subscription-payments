export async function POST(req: Request) {
  const { depositDate, termDays } = await req.json();

  if (new Date(depositDate) > new Date()) {
    return new Response('Deposit date cannot be future', { status: 400 });
  }
}
