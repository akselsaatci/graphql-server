import { NextResponse } from "next/server";
import { prisma } from "@/../lib/db";
export async function GET() {
  var users = await prisma.user.findMany({include: {posts: true}});

  return NextResponse.json(users);
}
