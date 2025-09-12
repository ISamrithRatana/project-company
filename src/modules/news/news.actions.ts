"use server";

import { NewsService } from "@/modules/news/news.service";
import { NewsRepository } from "@/modules/news/news.repository";
import { CreateNewsDto, UpdateNewsDto } from "@/modules/news/news.types";

const newsService = new NewsService(new NewsRepository());

export async function getAllNews() {
  return newsService.getAll();
}

export async function createNews(dto: CreateNewsDto) {
  return newsService.create(dto);
}

export async function updateNews(dto: UpdateNewsDto) {
  return newsService.update(dto);
}

export async function deleteNews(id: number) {
  return newsService.delete(id);
}
