import { NextRequest, NextResponse } from "next/server";

import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();

    const updateUser = await db.user.update({
      where: {
        id: userId,
      },
      data: data,
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}
