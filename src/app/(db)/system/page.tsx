import fs from "fs/promises";
import path from "path";
// Helper to get folder size in bytes
async function getFolderSize(folderPath: string): Promise<number> {
  const files = await fs.readdir(folderPath);
  let totalSize = 0;

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = await fs.stat(filePath);
    if (stat.isFile()) {
      totalSize += stat.size;
    }
  }

  return totalSize;
}

// Page Component
export default async function StatsPage() {
  const folderPath = path.join(process.cwd(), "src/storage", "data");

  // Read files in folder
  const files = await fs.readdir(folderPath);

  // Count only txt db files
  const dbFiles = files.filter((file) => file.startsWith("tbl_") && file.endsWith(".txt"));

  // Folder size in MB
  const folderSize = await getFolderSize(folderPath);
  const sizeInMB = (folderSize / (1024 * 1024)).toFixed(2);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Database Stats</h1>
      <div className="p-4 rounded-lg shadow bg-gray-100">
        <p>📂 Folder: <b>/public/data</b></p>
        <p>📊 Total Databases: <b>{dbFiles.length}</b></p>
        <p>💾 Folder Size: <b>{sizeInMB} MB</b></p>
      </div>
    </div>
  );
}
