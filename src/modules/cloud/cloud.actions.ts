"use server";

import { CloudService } from "@/modules/cloud/cloud.service";
import { CloudRepository } from "@/modules/cloud/cloud.repository";
import { FileItem } from "@/modules/cloud/cloud.types";
import { getAuthUser } from "@/lib/auth";

const cloudService = new CloudService(new CloudRepository());

export async function getCloudFilesAction() {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  return cloudService.getFilesByUser(user);
}

export async function saveCloudFilesAction(files: FileItem[]) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  return cloudService.saveFiles(user, files);
}

export async function createCloudFileAction(
  cloudId: number,
  fileData: FileItem
) {
  return cloudService.createCloudFile(cloudId, fileData);
}
