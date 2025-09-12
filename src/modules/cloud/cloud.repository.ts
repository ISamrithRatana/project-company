import { prisma } from "@/lib/prisma";
import { FileItem, FileItemWithId } from "@/modules/cloud/cloud.types";

export class CloudRepository {
  async getFilesByCloudId(cloudId: number) {
    const cloud = await prisma.cloud.findUnique({
      where: { id: cloudId },
      include: { files: true },
    });

    return cloud?.files.map(f => ({
      id: f.id,
      name: f.name,
      modified: f.modified.toISOString(),
      fileSize: f.fileSize,
      sharing: f.sharing,
    })) as FileItemWithId[];
  }

  async saveFilesByCloudId(cloudId: number, files: FileItem[]) {
    await prisma.file.deleteMany({ where: { cloudId } });

    const createData = files.map(f => ({
      cloudId,
      name: f.name,
      modified: new Date(f.modified),
      fileSize: f.fileSize,
      sharing: f.sharing,
    }));

    await prisma.file.createMany({ data: createData });
    return createData;
  }

  async createCloudForUser(userId: number) {
    return prisma.cloud.create({ data: { userId } });
  }

  async createCloudFile(cloudId: number, fileData: FileItem): Promise<FileItemWithId> {
    const newFile = await prisma.file.create({
      data: {
        cloudId,
        name: fileData.name,
        modified: new Date(fileData.modified),
        fileSize: fileData.fileSize,
        sharing: fileData.sharing,
      },
    });

    return {
      id: newFile.id,
      name: newFile.name,
      modified: newFile.modified.toISOString(),
      fileSize: newFile.fileSize,
      sharing: newFile.sharing,
    };
  }
}
