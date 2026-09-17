import { useState } from "react";
import { AssetsService } from "../services/AssetsService";
import type { Asset } from "../types/Assets";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 10;

function useAssetUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] =
    useState(false);
  const [error, setError] = useState("");

  const addFiles = (acceptedFiles: File[]) => {
    setError("");

    if (acceptedFiles.length === 0) {
      return;
    }

    setFiles((previousFiles) => {
      const existingFiles = new Set(
        previousFiles.map(
          (file) =>
            `${file.name}-${file.size}-${file.lastModified}`,
        ),
      );

      const newFiles = acceptedFiles.filter(
        (file) =>
          !existingFiles.has(
            `${file.name}-${file.size}-${file.lastModified}`,
          ),
      );

      const combinedFiles = [
        ...previousFiles,
        ...newFiles,
      ];

      if (combinedFiles.length > MAX_FILES) {
        setError(
          `You can select a maximum of ${MAX_FILES} files.`,
        );

        return combinedFiles.slice(0, MAX_FILES);
      }

      return combinedFiles;
    });
  };

  const removeFile = (fileToRemove: File) => {
    setFiles((previousFiles) =>
      previousFiles.filter(
        (file) => file !== fileToRemove,
      ),
    );
  };

  const uploadFiles = async (): Promise<Asset[]> => {
    if (files.length === 0) {
      setError(
        "Please select at least one file to upload.",
      );

      return [];
    }

    try {
      setIsUploading(true);
      setError("");

      const assets =
        await AssetsService.uploadAssets(files);

      setFiles([]);

      return assets;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again.";

      setError(message);

      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  return {
    files,
    isUploading,
    error,

    maxFiles: MAX_FILES,
    maxFileSize: MAX_FILE_SIZE,

    addFiles,
    removeFile,
    uploadFiles,
    clearError,
  };
}

export default useAssetUpload;