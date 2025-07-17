import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import { cn } from "@/utils/cn";

const SystemStatus = () => {
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [systemMetrics, setSystemMetrics] = useState({
    webhookStatus: "operational",
    propertyAnalysisStatus: "operational",
    quoteGenerationStatus: "operational",
    emailServiceStatus: "limited",
    databaseStatus: "operational"
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    totalWebhooks: 247,
    successfulAnalyses: 189,
    quotesGenerated: 156,
    emailsSent: 134,
    responseTime: "1.2s",
    uptime: "99.8%"
  });

  useEffect(() => {
    // Simulate loading system status
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const refreshStatus = () => {
    setLoading(true);
    setLastUpdate(new Date());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-100";
      case "limited":
        return "text-yellow-600 bg-yellow-100";
      case "down":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return "CheckCircle";
      case "limited":
        return "AlertTriangle";
      case "down":
        return "XCircle";
      default:
        return "Circle";
    }
  };

  const services = [
    {
      name: "Voice Webhook",
      status: systemMetrics.webhookStatus,
      description: "Receiving and processing voice assistant data",
      lastChecked: "2 minutes ago"
    },
    {
      name: "Property Analysis",
      status: systemMetrics.propertyAnalysisStatus,
      description: "Google Maps API and GPT-4 Vision integration",
      lastChecked: "1 minute ago"
    },
    {
      name: "Quote Generation",
      status: systemMetrics.quoteGenerationStatus,
      description: "Automated quote calculation and packaging",
      lastChecked: "30 seconds ago"
    },
    {
      name: "Email Service",
      status: systemMetrics.emailServiceStatus,
      description: "SMTP delivery for quote notifications",
      lastChecked: "5 minutes ago"
    },
    {
      name: "Database",
      status: systemMetrics.databaseStatus,
      description: "Quote and customer data storage",
      lastChecked: "1 minute ago"
    }
  ];

  if (loading) return <Loading type="dashboard" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Status</h1>
          <p className="text-gray-600">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <Button onClick={refreshStatus} variant="outline">
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      {/* Overall Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Overall System Health</h3>
          <Badge variant="success" className="text-sm">
            <ApperIcon name="CheckCircle" className="h-4 w-4 mr-1" />
            All Systems Operational
          </Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{performanceMetrics.uptime}</p>
            <p className="text-sm text-gray-600">Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{performanceMetrics.responseTime}</p>
            <p className="text-sm text-gray-600">Avg Response</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{performanceMetrics.totalWebhooks}</p>
            <p className="text-sm text-gray-600">Webhooks Processed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{performanceMetrics.quotesGenerated}</p>
            <p className="text-sm text-gray-600">Quotes Generated</p>
          </div>
        </div>
      </Card>

      {/* Service Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Status</h3>
        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "p-2 rounded-full",
                  getStatusColor(service.status)
                )}>
                  <ApperIcon 
                    name={getStatusIcon(service.status)} 
                    className="h-5 w-5"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge 
                  variant={service.status === "operational" ? "success" : 
                          service.status === "limited" ? "warning" : "error"}
                  className="mb-1"
                >
                  {service.status}
                </Badge>
                <p className="text-xs text-gray-500">{service.lastChecked}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Webhooks Received</span>
              <span className="font-medium">{performanceMetrics.totalWebhooks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Properties Analyzed</span>
              <span className="font-medium">{performanceMetrics.successfulAnalyses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Quotes Generated</span>
              <span className="font-medium">{performanceMetrics.quotesGenerated}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Emails Sent</span>
              <span className="font-medium">{performanceMetrics.emailsSent}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Google Maps API</span>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">OpenAI GPT-4 Vision</span>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">SMTP Service</span>
              <Badge variant="warning">Limited</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Webhook Endpoint</span>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemStatus;