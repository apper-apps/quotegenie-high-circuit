import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Empty = ({ 
  message = "No items found", 
  description = "Get started by creating your first item.",
  action = "Create New",
  onAction,
  icon = "Package",
  type = "general"
}) => {
  const emptyConfig = {
    quotes: {
      icon: "FileText",
      title: "No quotes yet",
      description: "Start generating quotes from voice assistant data.",
      action: "Create Quote",
      gradient: "from-primary-500 to-accent-500"
    },
    analysis: {
      icon: "MapPin",
      title: "No property analysis",
      description: "Analyze a property to get started with quote generation.",
      action: "Analyze Property",
      gradient: "from-blue-500 to-purple-500"
    },
    general: {
      icon: icon,
      title: message,
      description: description,
      action: action,
      gradient: "from-gray-500 to-gray-600"
    }
  };

  const config = emptyConfig[type] || emptyConfig.general;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="p-8 max-w-md mx-auto text-center bg-gradient-to-br from-white to-gray-50">
        <div className={`bg-gradient-to-r ${config.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
          <ApperIcon name={config.icon} className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {config.title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {config.description}
        </p>
        
        {onAction && (
          <Button onClick={onAction} className="mr-3">
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            {config.action}
          </Button>
        )}
        
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          <ApperIcon name="Home" className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
      </Card>
    </motion.div>
  );
};

export default Empty;