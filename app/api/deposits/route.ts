export async function POST(req: Request) {
  const { depositDate, termDays, amount, bankName, alias } = await req.json();

  if (new Date(depositDate) > new Date()) {
    return new Response('Deposit date cannot be future', { status: 400 });
  }

  if (termDays < 1) {
    return new Response('Term days must be at least 1', { status: 400 });
  }

  if (amount < 1) {
    return new Response('Amount must be at least 1', { status: 400 });
  }

  return new Response('Deposit created successfully', { status: 200 });
}
