import { News, CreateNewsDto, UpdateNewsDto } from "@/modules/news/news.types";
import { NewsRepository } from "@/modules/news/news.repository";

export class NewsService {
  private repo: NewsRepository;

  constructor(repo: NewsRepository) {
    this.repo = repo;
  }

  // Get all news
  async getAll(): Promise<News[]> {
    return this.repo.findAll();
  }

  // Create a news item
  async create(dto: CreateNewsDto): Promise<News> {
    return this.repo.create(dto);
  }
  
    async createMany(dtos: CreateNewsDto[]): Promise<{ count: number }> {
    return this.repo.createMany(dtos);
  }

  // Update a news item
  async update(dto: UpdateNewsDto): Promise<News | null> {
    try {
      return await this.repo.update(dto.id, dto);
    } catch (err) {
      // If the record doesn't exist, Prisma throws an error
      return null;
    }
  }

  // Delete a news item
  async delete(id: number): Promise<boolean> {
    try {
      await this.repo.delete(id);
      return true;
    } catch (err) {
      // If the record doesn't exist, Prisma throws an error
      return false;
    }
  }
}
