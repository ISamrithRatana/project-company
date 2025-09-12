import { ContactRepository } from "@/modules/contact/contact.repository";
import { ContactForm } from "@/modules/contact/contact.types";

export class ContactService {
  private repo: ContactRepository;

  constructor(repo: ContactRepository) {
    this.repo = repo;
  }

  // Submit a single contact form
  async submit(data: Omit<ContactForm, "submittedAt" | "id">): Promise<{ success: boolean; message: string; data?: ContactForm }> {
    try {
      const saved = await this.repo.save(data);
      return { success: true, message: "Message saved successfully!", data: saved };
    } catch (err) {
      console.error("Error saving contact:", err);
      return { success: false, message: "Failed to save message" };
    }
  }

  // Get all contact forms
  async getAll(): Promise<ContactForm[]> {
    return this.repo.readAll();
  }

  // Optional: bulk submit
  async submitMany(data: Omit<ContactForm, "submittedAt" | "id">[]) {
    try {
      const result = await this.repo.saveMany(data);
      return { success: true, message: `Inserted ${result.count} contacts successfully` };
    } catch (err) {
      console.error("Error bulk saving contacts:", err);
      return { success: false, message: "Failed to save contacts" };
    }
  }
}
