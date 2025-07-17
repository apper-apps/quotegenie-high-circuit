import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  className,
  gradient = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("card-hover", className)}
    >
      <Card className={cn(
        "metric-card p-6",
        gradient && "bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "p-3 rounded-lg",
              gradient ? "bg-gradient-to-br from-primary-500 to-accent-500" : "bg-primary-100"
            )}>
              <ApperIcon 
                name={icon} 
                className={cn(
                  "h-6 w-6",
                  gradient ? "text-white" : "text-primary-600"
                )}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
          {trend && (
            <div className={cn(
              "flex items-center space-x-1 text-sm",
              trend === "up" ? "text-green-600" : "text-red-600"
            )}>
              <ApperIcon 
                name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
                className="h-4 w-4"
              />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default MetricCard;