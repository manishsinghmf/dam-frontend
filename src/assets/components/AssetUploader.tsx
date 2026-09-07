import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  File,
  FileAudio,
  FileImage,
  FileVideo,
  UploadCloud,
  X,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function AssetUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    multiple: true,
    maxSize: 50 * 1024 * 1024,

    onDrop: (acceptedFiles) => {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles,
      ]);
    },
  });

  const handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    console.log("Uploading files:", files);
  };

  const removeFile = (fileToRemove: File) => {
    setFiles((previousFiles) =>
      previousFiles.filter((file) => file !== fileToRemove)
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(
      Math.log(bytes) / Math.log(1024)
    );

    return `${(bytes / Math.pow(1024, index)).toFixed(
      index === 0 ? 0 : 1
    )} ${units[index]}`;
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return FileImage;
    }

    if (file.type.startsWith("video/")) {
      return FileVideo;
    }

    if (file.type.startsWith("audio/")) {
      return FileAudio;
    }

    return File;
  };

  return (
    <div className="w-full">

      {/* =====================================================
          UPLOADER CARD
      ====================================================== */}
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
              {files.length === 1 ? "file" : "files"}
            </span>
          )}
        </div>

        <form
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
        >

          {/* =================================================
              DROPZONE
          ================================================== */}
          <div
            {...getRootProps()}
            className={`group relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${isDragActive
                ? "border-indigo-500 bg-indigo-50/80"
                : "border-slate-200 bg-slate-50/60 hover:border-indigo-300 hover:bg-indigo-50/30"
              }`}
          >
            <input {...getInputProps()} />

            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100/40 blur-2xl transition-all group-hover:bg-indigo-200/50" />

            <div
              className={`relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${isDragActive
                  ? "scale-110 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-white text-indigo-500 shadow-sm ring-1 ring-slate-200 group-hover:scale-105 group-hover:shadow-md"
                }`}
            >
              <UploadCloud className="h-7 w-7" />
            </div>

            <h3 className="relative mt-5 text-sm font-semibold text-slate-700">
              {isDragActive
                ? "Drop your files here"
                : "Drag & drop your files here"}
            </h3>

            <p className="relative mt-2 text-xs text-slate-400">
              or{" "}
              <span className="font-semibold text-indigo-600">
                browse from your computer
              </span>
            </p>

            {/* Supported formats */}
            <div className="relative mt-6 flex flex-wrap justify-center gap-2">
              {["Images", "Videos", "Audio", "Documents"].map(
                (type) => (
                  <span
                    key={type}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-medium text-slate-500"
                  >
                    {type}
                  </span>
                )
              )}
            </div>

            <p className="relative mt-4 text-[10px] text-slate-400">
              Maximum file size: 50 MB
            </p>
          </div>

          {/* =================================================
              SELECTED FILES
          ================================================== */}
          {files.length > 0 && (
            <div className="mt-7">

              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    Selected files
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Ready to upload to your library
                  </p>
                </div>

                <span className="text-xs font-medium text-slate-400">
                  {files.length}{" "}
                  {files.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                {files.map((file) => {
                  const FileIcon = getFileIcon(file);

                  return (
                    <div
                      key={`${file.name}-${file.lastModified}`}
                      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-indigo-200 hover:bg-indigo-50/30"
                    >

                      {/* Icon */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                        <FileIcon className="h-5 w-5 text-indigo-500" />
                      </div>

                      {/* File information */}
                      <div className="min-w-0 flex-1">

                        <p
                          title={file.name}
                          className="truncate text-sm font-medium text-slate-700"
                        >
                          {file.name}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">
                            {formatFileSize(file.size)}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-slate-300" />

                          <span className="text-[11px] text-emerald-600">
                            Ready
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeFile(file)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 opacity-60 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =================================================
              UPLOAD BUTTON
          ================================================== */}
          <button
            type="submit"
            disabled={files.length === 0}
            className="group mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            <UploadCloud className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />

            {files.length === 0
              ? "Select files to upload"
              : `Upload ${files.length} ${files.length === 1 ? "asset" : "assets"
              }`}
          </button>
        </form>

        {/* =====================================================
            FOOTER
        ====================================================== */}
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