import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
   const data = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const socialNetwork = await db.link.create({
        data: {
            userId,
            link: data.link,
            icon: data.icon,
            name: data.name
        }
    })

    return NextResponse.json(socialNetwork)
  } catch (error) {
    console.error("POST LINK ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}