import { CloudRepository } from "@/modules/cloud/cloud.repository";
import { FileItem, FileItemWithId } from "@/modules/cloud/cloud.types";
import { UserDto } from "@/modules/users/user.types";
import { prisma } from "@/lib/prisma";

export class CloudService {
  private repo: CloudRepository;

  constructor(repo: CloudRepository) {
    this.repo = repo;
  }

  async getFilesByUser(user: UserDto) {
    let cloud = await prisma.cloud.findUnique({ where: { userId: user.id } });
    if (!cloud) {
      cloud = await this.repo.createCloudForUser(user.id);
    }

    return this.repo.getFilesByCloudId(cloud.id);
  }

  async saveFiles(user: UserDto, files: FileItem[]) {
    let cloud = await prisma.cloud.findUnique({ where: { userId: user.id } });
    if (!cloud) cloud = await this.repo.createCloudForUser(user.id);

    return this.repo.saveFilesByCloudId(cloud.id, files);
  }

  async createCloudFile(cloudId: number, fileData: FileItem): Promise<FileItemWithId> {
    return this.repo.createCloudFile(cloudId, fileData);
  }
}
