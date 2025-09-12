import { NextRequest, NextResponse } from "next/server";
import { ContactRepository } from "@/modules/contact/contact.repository";
import { ContactService } from "@/modules/contact/contact.service";

const contactService = new ContactService(new ContactRepository());

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Call the correct service method
    const result = await contactService.submit({ name, email, message });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
