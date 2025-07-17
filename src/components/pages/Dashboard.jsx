import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import MetricCard from "@/components/molecules/MetricCard";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import StatusPill from "@/components/molecules/StatusPill";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useQuotes } from "@/hooks/useQuotes";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const { quotes, loading, error, loadQuotes, generateFromWebhook } = useQuotes();
  const [metrics, setMetrics] = useState({
    totalQuotes: 0,
    sentQuotes: 0,
    approvedQuotes: 0,
    totalValue: 0
  });

  useEffect(() => {
    if (quotes.length > 0) {
      const totalQuotes = quotes.length;
      const sentQuotes = quotes.filter(q => q.status === "sent" || q.status === "viewed" || q.status === "approved").length;
      const approvedQuotes = quotes.filter(q => q.status === "approved").length;
      const totalValue = quotes.reduce((sum, q) => sum + (q.total_value || 0), 0);

      setMetrics({
        totalQuotes,
        sentQuotes,
        approvedQuotes,
        totalValue
      });
    }
  }, [quotes]);

  const handleWebhookSimulation = async () => {
    const mockWebhookData = {
      customer_name: "Demo Customer",
      customer_email: "demo@example.com",
      customer_phone: "555-DEMO-123",
      service_address: "123 Demo Street, Demo City, NY 12345",
      services_requested: ["roofline", "wreaths", "garland"],
      timeline: "before December 15th",
      color_preference: "warm white",
      call_summary: "wants full lighting package for colonial house"
    };

    try {
      await generateFromWebhook(mockWebhookData);
      toast.success("Quote generated from webhook data!");
    } catch (error) {
      toast.error("Failed to generate quote from webhook");
    }
  };

  const recentQuotes = quotes.slice(0, 5);

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadQuotes} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back to QuoteGenie Pro</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleWebhookSimulation}>
            <ApperIcon name="Webhook" className="h-4 w-4 mr-2" />
            Simulate Webhook
          </Button>
          <Button onClick={() => navigate("/quotes")}>
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Quotes"
          value={metrics.totalQuotes}
          icon="FileText"
          trend="up"
          trendValue="+12%"
          gradient
        />
        <MetricCard
          title="Sent Quotes"
          value={metrics.sentQuotes}
          icon="Send"
          trend="up"
          trendValue="+8%"
        />
        <MetricCard
          title="Approved Quotes"
          value={metrics.approvedQuotes}
          icon="CheckCircle"
          trend="up"
          trendValue="+15%"
        />
        <MetricCard
          title="Total Value"
          value={`$${metrics.totalValue.toLocaleString()}`}
          icon="DollarSign"
          trend="up"
          trendValue="+22%"
        />
      </div>

      {/* Recent Quotes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Quotes</h3>
            <Button variant="outline" size="sm" onClick={() => navigate("/quotes")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentQuotes.map((quote, index) => (
              <motion.div
                key={quote.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/quotes/${quote.Id}`)}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <ApperIcon name="FileText" className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{quote.customer_name}</p>
                    <p className="text-sm text-gray-500">{quote.service_address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusPill status={quote.status} />
                  <span className="text-sm font-medium text-gray-900">
                    ${quote.total_value?.toLocaleString() || "0"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* System Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
            <Button variant="outline" size="sm" onClick={() => navigate("/system-status")}>
              Details
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Voice Webhook</span>
              </div>
              <span className="text-sm text-green-600">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Property Analysis</span>
              </div>
              <span className="text-sm text-green-600">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Quote Generation</span>
              </div>
              <span className="text-sm text-green-600">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Email Service</span>
              </div>
              <span className="text-sm text-yellow-600">Limited</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="p-4 h-auto" onClick={() => navigate("/property-analysis")}>
            <div className="text-center">
              <ApperIcon name="MapPin" className="h-6 w-6 mx-auto mb-2" />
              <p className="font-medium">Analyze Property</p>
              <p className="text-sm text-gray-500">Get AI-powered property insights</p>
            </div>
          </Button>
          <Button variant="outline" className="p-4 h-auto" onClick={() => navigate("/quotes")}>
            <div className="text-center">
              <ApperIcon name="FileText" className="h-6 w-6 mx-auto mb-2" />
              <p className="font-medium">Manage Quotes</p>
              <p className="text-sm text-gray-500">View and edit all quotes</p>
            </div>
          </Button>
          <Button variant="outline" className="p-4 h-auto" onClick={() => navigate("/settings")}>
            <div className="text-center">
              <ApperIcon name="Settings" className="h-6 w-6 mx-auto mb-2" />
              <p className="font-medium">Settings</p>
              <p className="text-sm text-gray-500">Configure pricing and templates</p>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;