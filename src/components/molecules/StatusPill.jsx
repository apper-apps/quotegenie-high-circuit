import { cn } from "@/utils/cn";

const StatusPill = ({ status, className }) => {
  const statusConfig = {
    draft: { label: "Draft", color: "bg-gray-100 text-gray-700" },
    generated: { label: "Generated", color: "bg-blue-100 text-blue-700" },
    sent: { label: "Sent", color: "bg-green-100 text-green-700" },
    viewed: { label: "Viewed", color: "bg-purple-100 text-purple-700" },
    approved: { label: "Approved", color: "bg-emerald-100 text-emerald-700" },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-700" }
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
      config.color,
      className
    )}>
      {config.label}
    </span>
  );
};

export default StatusPill;