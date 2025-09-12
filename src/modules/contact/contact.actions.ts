"use server";

import { ContactRepository } from "@/modules/contact/contact.repository";
import { ContactService } from "@/modules/contact/contact.service";
import { ContactForm } from "@/modules/contact/contact.types";

const contactService = new ContactService(new ContactRepository());

export async function sendContactForm(data: Omit<ContactForm, "submittedAt">) {
  return contactService.submit(data);
}

export async function getContactMessages() {
  return contactService.getAll();
}
