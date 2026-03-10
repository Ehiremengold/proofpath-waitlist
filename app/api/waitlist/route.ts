import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, role } = body as { email?: string; role?: string };

  if (!email || !role) {
    return NextResponse.json({ error: "email and role are required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const { error } = await supabase
    .from("waitlist")
    .insert([{ email: email.toLowerCase().trim(), role }]);

  if (error) {
    // Postgres unique constraint violation code
    if (error.code === "23505") {
      return NextResponse.json({ message: "already on the list" }, { status: 200 });
    }
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ message: "success" }, { status: 201 });
}

export async function GET() {
  const { data, error, count } = await supabase
    .from("waitlist")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count, entries: data });
}
