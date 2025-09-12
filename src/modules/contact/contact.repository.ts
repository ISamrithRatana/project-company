import { prisma } from "@/lib/prisma";
import { ContactForm } from "@/modules/contact/contact.types";

export class ContactRepository {
  // Get all contacts
  async readAll(): Promise<ContactForm[]> {
    return prisma.contact.findMany({
      orderBy: { submittedAt: "desc" },
    });
  }

  // Save a single contact
  async save(data: Omit<ContactForm, "submittedAt" | "id">): Promise<ContactForm> {
    return prisma.contact.create({
      data,
    });
  }

  // Optional: bulk insert
  async saveMany(data: Omit<ContactForm, "submittedAt" | "id">[]) {
    return prisma.contact.createMany({
      data,
    });
  }
}
