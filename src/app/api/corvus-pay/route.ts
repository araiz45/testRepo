import { NextResponse } from "next/server";

export function GET(req: Request) {
  return NextResponse.json({ message: "CorvusPay Api" });
}

export async function POST(req: Request) {
  const { data } = await req.json();
  try {
    return NextResponse.redirect(
      "https://test-wallet.corvuspay.com/checkout/?" + data
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 502,
      message: "Greška, ne šaljete sve potrebne podatke za plaćanje!",
    });
  }
  return NextResponse.json({ message: "CorvusPay Api" });
}
