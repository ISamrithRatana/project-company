import { prisma } from "@/lib/prisma";
import { News, CreateNewsDto, UpdateNewsDto } from "@/modules/news/news.types";

export class NewsRepository {
  async findAll(): Promise<News[]> {
    return prisma.news.findMany();
  }

    async findById(id: number): Promise<News | null> {
    return await prisma.news.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateNewsDto): Promise<News> {
    return prisma.news.create({ data: dto });
  }

  async createMany(dtos: CreateNewsDto[]): Promise<{ count: number }> {
    return prisma.news.createMany({ data: dtos });
  }

  async update(id: number, dto: UpdateNewsDto): Promise<News> {
    return prisma.news.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number): Promise<News> {
    return prisma.news.delete({ where: { id } });
  }
}
