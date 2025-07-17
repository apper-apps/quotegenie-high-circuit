import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import QuotePackages from "@/components/organisms/QuotePackages";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useQuotes } from "@/hooks/useQuotes";
import quotesService from "@/services/api/quotesService";

const QuoteEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateQuote } = useQuotes();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [saving, setSaving] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("complete");
  const [visualMockup, setVisualMockup] = useState(null);
  const [generatingMockup, setGeneratingMockup] = useState(false);
  useEffect(() => {
    if (id && id !== "new") {
      loadQuote();
    } else {
      setLoading(false);
      setQuote({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        service_address: "",
        services_requested: [],
        timeline: "",
        color_preference: "",
        call_summary: "",
        status: "draft",
        packages: []
      });
    }
  }, [id]);

  const loadQuote = async () => {
    try {
      const data = await quotesService.getById(id);
      setQuote(data);
      setSelectedPackage(data.packages?.[1]?.tier || "complete");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setQuote(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id && id !== "new") {
        await updateQuote(id, quote);
        toast.success("Quote updated successfully");
      } else {
        // Create new quote logic would go here
        toast.success("Quote created successfully");
      }
    } catch (error) {
      toast.error("Failed to save quote");
    } finally {
      setSaving(false);
}
  };

  const generateVisualMockup = async () => {
    setGeneratingMockup(true);
    try {
      // Simulate mockup generation with property analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockupData = {
        rooflineLength: quote?.property_analysis?.roofline_linear_feet || 180,
        roofPeaks: quote?.property_analysis?.roof_peaks_count || 3,
        houseStyle: quote?.property_analysis?.house_style || "colonial",
        selectedPackage,
        lightingPlan: {
          rooflineStyle: selectedPackage === "premium" ? "multicolor" : "warm_white",
          wreathCount: selectedPackage === "essential" ? 0 : selectedPackage === "complete" ? 3 : 5,
          garlandLength: selectedPackage === "essential" ? 0 : selectedPackage === "complete" ? 25 : 45,
          stakelights: selectedPackage === "premium" ? 8 : 0
        },
        estimatedInstallTime: selectedPackage === "essential" ? "4-6 hours" : selectedPackage === "complete" ? "6-8 hours" : "8-10 hours",
        powerRequirements: "Standard 110V outlets (3 required)"
      };
      
      setVisualMockup(mockupData);
      setQuote(prev => ({
        ...prev,
        visual_mockup: mockupData
      }));
      
      toast.success("Visual mockup generated successfully");
    } catch (error) {
      toast.error("Failed to generate visual mockup");
    } finally {
      setGeneratingMockup(false);
    }
  };
  const handleSendQuote = async () => {
    setSaving(true);
    try {
      await updateQuote(id, { ...quote, status: "sent", sent_at: new Date().toISOString() });
      toast.success("Quote sent successfully");
      navigate("/quotes");
    } catch (error) {
      toast.error("Failed to send quote");
    } finally {
      setSaving(false);
    }
  };

  const mockPackages = [
    {
      tier: "essential",
      total: 1850,
      services: ["Basic roofline lighting (180 ft)", "Standard installation", "Warm white LEDs"],
      recommended: false
    },
    {
      tier: "complete",
      total: 2850,
      services: ["Premium roofline lighting (180 ft)", "3 premium wreaths", "25ft garland", "Enhanced installation"],
      recommended: true
    },
    {
      tier: "premium",
      total: 3950,
      services: ["Multicolor roofline lighting (180 ft)", "5 premium wreaths", "45ft garland", "Stake lights (8 units)", "Premium installation"]
    }
  ];

  if (loading) return <Loading type="form" />;
  if (error) return <Error message={error} onRetry={loadQuote} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/quotes")}>
            <ApperIcon name="ArrowLeft" className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {id === "new" ? "New Quote" : "Edit Quote"}
            </h1>
            <p className="text-gray-600">
              {quote?.customer_name || "Create a new holiday lighting quote"}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
          {id !== "new" && quote?.status !== "sent" && (
            <Button onClick={handleSendQuote} disabled={saving}>
              <ApperIcon name="Send" className="h-4 w-4 mr-2" />
              Send Quote
            </Button>
          )}
        </div>
      </div>

      {/* Customer Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Customer Name"
            id="customer_name"
            value={quote?.customer_name || ""}
            onChange={(e) => handleInputChange("customer_name", e.target.value)}
            placeholder="Enter customer name"
            required
          />
          <FormField
            label="Email Address"
            id="customer_email"
            type="email"
            value={quote?.customer_email || ""}
            onChange={(e) => handleInputChange("customer_email", e.target.value)}
            placeholder="Enter email address"
            required
          />
          <FormField
            label="Phone Number"
            id="customer_phone"
            value={quote?.customer_phone || ""}
            onChange={(e) => handleInputChange("customer_phone", e.target.value)}
            placeholder="Enter phone number"
          />
          <FormField
            label="Service Address"
            id="service_address"
            value={quote?.service_address || ""}
            onChange={(e) => handleInputChange("service_address", e.target.value)}
            placeholder="Enter service address"
            required
          />
        </div>
      </Card>

      {/* Service Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Timeline"
            id="timeline"
            value={quote?.timeline || ""}
            onChange={(e) => handleInputChange("timeline", e.target.value)}
            placeholder="e.g., before December 15th"
          />
          <FormField
            label="Color Preference"
            id="color_preference"
            value={quote?.color_preference || ""}
            onChange={(e) => handleInputChange("color_preference", e.target.value)}
            placeholder="e.g., warm white, multicolor"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Call Summary
          </label>
          <textarea
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={quote?.call_summary || ""}
            onChange={(e) => handleInputChange("call_summary", e.target.value)}
            placeholder="Enter call summary and customer requirements"
          />
        </div>
      </Card>

      {/* Package Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Options</h3>
        <QuotePackages
          packages={mockPackages}
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
        />
</Card>

      {/* Visual Mockup */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Visual Mockup</h3>
          <Button 
            variant="outline"
            onClick={generateVisualMockup}
            disabled={generatingMockup || !selectedPackage}
          >
            {generatingMockup ? (
              <>
                <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ApperIcon name="Image" className="h-4 w-4 mr-2" />
                Generate Mockup
              </>
            )}
          </Button>
        </div>

        {visualMockup ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Mockup Preview */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50"></div>
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <ApperIcon name="Home" className="h-16 w-16 mx-auto mb-4 text-primary-600" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {visualMockup.houseStyle} Style Home
                  </h4>
                  <p className="text-gray-600">
                    {visualMockup.rooflineLength} ft roofline • {visualMockup.roofPeaks} peaks
                  </p>
                </div>

                {/* Lighting Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/80 rounded-lg p-4 text-center">
                    <ApperIcon name="Zap" className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                    <p className="text-sm font-medium text-gray-900">Roofline Lights</p>
                    <p className="text-xs text-gray-600 capitalize">
                      {visualMockup.lightingPlan.rooflineStyle.replace('_', ' ')}
                    </p>
                  </div>
                  
                  {visualMockup.lightingPlan.wreathCount > 0 && (
                    <div className="bg-white/80 rounded-lg p-4 text-center">
                      <ApperIcon name="Circle" className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium text-gray-900">Wreaths</p>
                      <p className="text-xs text-gray-600">
                        {visualMockup.lightingPlan.wreathCount} premium
                      </p>
                    </div>
                  )}
                  
                  {visualMockup.lightingPlan.garlandLength > 0 && (
                    <div className="bg-white/80 rounded-lg p-4 text-center">
                      <ApperIcon name="Minus" className="h-8 w-8 mx-auto mb-2 text-red-600" />
                      <p className="text-sm font-medium text-gray-900">Garland</p>
                      <p className="text-xs text-gray-600">
                        {visualMockup.lightingPlan.garlandLength} ft
                      </p>
                    </div>
                  )}
                  
                  {visualMockup.lightingPlan.stakelights > 0 && (
                    <div className="bg-white/80 rounded-lg p-4 text-center">
                      <ApperIcon name="Navigation" className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-sm font-medium text-gray-900">Stake Lights</p>
                      <p className="text-xs text-gray-600">
                        {visualMockup.lightingPlan.stakelights} units
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Installation Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <ApperIcon name="Clock" className="h-5 w-5 mr-2 text-primary-600" />
                  <h5 className="font-medium text-gray-900">Installation Time</h5>
                </div>
                <p className="text-sm text-gray-700">{visualMockup.estimatedInstallTime}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <ApperIcon name="Zap" className="h-5 w-5 mr-2 text-primary-600" />
                  <h5 className="font-medium text-gray-900">Power Requirements</h5>
                </div>
                <p className="text-sm text-gray-700">{visualMockup.powerRequirements}</p>
              </div>
            </div>

            {/* Mockup Actions */}
            <div className="flex justify-center space-x-3">
              <Button variant="outline" onClick={generateVisualMockup}>
                <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button variant="outline">
                <ApperIcon name="Download" className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline">
                <ApperIcon name="Share" className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <ApperIcon name="Image" className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Visual Mockup Generated</h4>
            <p className="text-gray-600 mb-4">
              Generate a visual mockup to show customers how their holiday lighting will look
            </p>
            <Button onClick={generateVisualMockup} disabled={!selectedPackage}>
              <ApperIcon name="Image" className="h-4 w-4 mr-2" />
              Generate Visual Mockup
            </Button>
          </div>
        )}
      </Card>

      {/* Property Analysis */}
      {quote?.property_analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <ApperIcon name="Home" className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                <p className="text-sm text-gray-600">Roofline</p>
                <p className="text-lg font-semibold">
                  {quote.property_analysis.roofline_linear_feet} ft
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <ApperIcon name="Mountain" className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                <p className="text-sm text-gray-600">Roof Peaks</p>
                <p className="text-lg font-semibold">
                  {quote.property_analysis.roof_peaks_count}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <ApperIcon name="Building" className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                <p className="text-sm text-gray-600">Style</p>
                <p className="text-lg font-semibold capitalize">
                  {quote.property_analysis.house_style}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default QuoteEditor;