import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface UploadDropzoneProps {
  maxFiles: number;
  maxFileSize: number;
  isUploading: boolean;
  onFilesSelected: (files: File[]) => void;
  onError: (message: string) => void;
}

function UploadDropzone({
  maxFiles,
  maxFileSize,
  isUploading,
  onFilesSelected,
  onError,
}: UploadDropzoneProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    multiple: true,
    maxFiles,
    maxSize: maxFileSize,
    disabled: isUploading,

    onDrop: (acceptedFiles) => {
      onFilesSelected(acceptedFiles);
    },

    onDropRejected: (rejectedFiles) => {
      const firstRejectedFile =
        rejectedFiles[0];

      if (!firstRejectedFile) {
        onError(
          "File could not be selected.",
        );

        return;
      }

      const firstError =
        firstRejectedFile.errors[0];

      if (
        firstError?.code ===
        "file-too-large"
      ) {
        onError(
          `${firstRejectedFile.file.name} exceeds the 10 MB file size limit.`,
        );

        return;
      }

      if (
        firstError?.code ===
        "too-many-files"
      ) {
        onError(
          `You can select a maximum of ${maxFiles} files.`,
        );

        return;
      }

      onError(
        firstError?.message ||
        "One or more files could not be selected.",
      );
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`group relative flex min-h-65 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
        isDragActive
          ? "border-indigo-500 bg-indigo-50/80"
          : "border-slate-200 bg-slate-50/60 hover:border-indigo-300 hover:bg-indigo-50/30"
      }`}
    >
      <input {...getInputProps()} />

      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100/40 blur-2xl transition-all group-hover:bg-indigo-200/50" />

      <div
        className={`relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
          isDragActive
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

      <div className="relative mt-6 flex flex-wrap justify-center gap-2">
        {[
          "Images",
          "Videos",
          "Audio",
          "Documents",
        ].map((type) => (
          <span
            key={type}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-medium text-slate-500"
          >
            {type}
          </span>
        ))}
      </div>

      <p className="relative mt-4 text-[10px] text-slate-400">
        Maximum {maxFiles} files · 10 MB per file
      </p>
    </div>
  );
}

export default UploadDropzone;