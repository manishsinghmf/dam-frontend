import {
  UploadCloud,
  ShieldCheck,
} from "lucide-react";

import useAssetUpload from "../../hooks/useAssetUpload";

import UploadDropzone from "./UploadDropzone";
import SelectedFiles from "./SelectedFiles";
import UploadButton from "./UploadButton";

function AssetUploader() {
  const {
    files,
    isUploading,
    error,
    maxFiles,
    maxFileSize,
    addFiles,
    removeFile,
    uploadFiles,
    clearError,
  } = useAssetUpload();

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      const assets = await uploadFiles();

      if (assets.length > 0) {
        console.log(
          "Assets uploaded successfully:",
          assets,
        );
      }
    } catch (error) {
      console.error(
        "Error uploading assets:",
        error,
      );
    }
  };

  const handleDropError = (
    message: string,
  ) => {
    clearError();

    console.error(message);
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">

        {/* Header */}
        <div className="mb-7 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <UploadCloud className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900">
                  Upload assets
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Add files to your asset library
                </p>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              {files.length}{" "}
              {files.length === 1
                ? "file"
                : "files"}
            </span>
          )}
        </div>

        <form
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
        >
          <UploadDropzone
            maxFiles={maxFiles}
            maxFileSize={maxFileSize}
            isUploading={isUploading}
            onFilesSelected={addFiles}
            onError={handleDropError}
          />

          <SelectedFiles
            files={files}
            isUploading={isUploading}
            onRemove={removeFile}
          />

          {error && (
            <p className="mt-4 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <UploadButton
            fileCount={files.length}
            isUploading={isUploading}
          />
        </form>

        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />

          <span>
            Your files are securely uploaded and processed
          </span>
        </div>
      </div>
    </div>
  );
}

export default AssetUploader;