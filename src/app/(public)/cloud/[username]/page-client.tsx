"use client";
import React, { useEffect, useState } from "react";
import { FileItem, FileItemWithId } from "@/modules/cloud/cloud.types";
import { getCloudFilesAction, createCloudFileAction } from "@/modules/cloud/cloud.actions";
import { UserDto } from "@/modules/users/user.types";

interface CloudServicePageProps {
  user: UserDto;
}

export default function CloudServicePage({ user }: CloudServicePageProps) {
  const [files, setFiles] = useState<FileItemWithId[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const cloudFiles = await getCloudFilesAction();
      setFiles(cloudFiles);
    } catch (err: any) {
      console.error("Failed to fetch cloud files:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleCreateFile = async () => {
    try {
      // Get user's cloud ID
      const cloudFiles = await getCloudFilesAction();
      const cloudId = cloudFiles.length > 0 ? cloudFiles[0].id : 1;

      const newFile = await createCloudFileAction(cloudId, {
        name: "New Document.txt",
        modified: new Date().toISOString(),
        fileSize: "20KB",
        sharing: "private",
      });

      setFiles(prev => [...prev, newFile]);
    } catch (err: any) {
      console.error("Failed to create file:", err.message || err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div className="p-4">
          <h2 className="font-bold text-xl mb-4">OneDrive - {user.name}</h2>
          <button
            onClick={handleCreateFile}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + New File
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">My Files</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading files...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Name", "Modified", "FileSize", "Sharing"].map(header => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {files.map(file => (
                    <tr key={file.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {file.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.modified}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.fileSize}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.sharing}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
