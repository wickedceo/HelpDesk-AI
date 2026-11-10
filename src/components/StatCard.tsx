
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: LucideIcon;
  description: string;
}

export default function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  description,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span>{title}</span>
        <div className="stat-icon">
          <Icon size={20} />
        </div>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-footer">
        <span className={positive ? "trend positive" : "trend negative"}>
          {positive ? (
            <ArrowUpRight size={15} />
          ) : (
            <ArrowDownRight size={15} />
          )}
          {change}
        </span>

        <span className="stat-description">{description}</span>
      </div>
    </div>
  );
}
