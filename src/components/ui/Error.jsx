import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry, 
  type = "general" 
}) => {
  const errorConfig = {
    general: {
      icon: "AlertCircle",
      title: "Oops! Something went wrong",
      color: "text-red-600",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100"
    },
    network: {
      icon: "Wifi",
      title: "Connection Error",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100"
    },
    notFound: {
      icon: "Search",
      title: "Not Found",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      iconBg: "bg-gray-100"
    }
  };

  const config = errorConfig[type] || errorConfig.general;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className={`p-8 max-w-md mx-auto text-center ${config.bgColor}`}>
        <div className={`${config.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
          <ApperIcon name={config.icon} className={`h-8 w-8 ${config.color}`} />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {config.title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <Button onClick={onRetry} className="mr-3">
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
        
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          <ApperIcon name="Home" className="h-4 w-4 mr-2" />
          Go Home
        </Button>
      </Card>
    </motion.div>
  );
};

export default Error;