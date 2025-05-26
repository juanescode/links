import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { link } = await req.json();

    if (!id || !link) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const updatedLink = await db.link.update({
      where: { id },
      data: {
        link: link,
      },
    });

    return NextResponse.json(updatedLink, { status: 200 });
  } catch (error) {
    console.error("PATCH LINK ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update link" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
 
    if (!id) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const deleteLink = await db.link.delete({
      where: { id },
    });

    return NextResponse.json(deleteLink);
  } catch (error) {
    console.error("DELETE LINK ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}