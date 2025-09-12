export type FileItem = {
  name: string;
  modified: string;
  fileSize: string;
  sharing: string;
};

export type CloudData = {
  id: number; // user's cloudId
  files: FileItem[];
};

// A version with id for database returns
export interface FileItemWithId extends FileItem {
  id: number;
}
