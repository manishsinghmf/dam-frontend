import {
  AlertCircle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface ProcessingCardProps {
  processing: number;
  failed: number;
  ready: number;
}

function ProcessingCard({
  processing,
  failed,
  ready,
}: ProcessingCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
          <Clock3 className="h-5 w-5 text-amber-600" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Processing
          </h3>

          <p className="text-xs text-slate-400">
            Asset processing status
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <StatusRow
          icon={<Clock3 className="h-4 w-4 text-amber-500" />}
          label="Processing"
          value={processing}
        />

        <StatusRow
          icon={<AlertCircle className="h-4 w-4 text-red-500" />}
          label="Failed"
          value={failed}
        />

        <StatusRow
          icon={
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          }
          label="Ready"
          value={ready}
        />
      </div>
    </div>
  );
}

interface StatusRowProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

function StatusRow({
  icon,
  label,
  value,
}: StatusRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3">
      <div className="flex items-center gap-2">
        {icon}

        <span className="text-xs font-medium text-slate-600">
          {label}
        </span>
      </div>

      <span className="text-sm font-bold text-slate-800">
        {value}
      </span>
    </div>
  );
}

export default ProcessingCard;