import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import PropertyMap from "@/components/organisms/PropertyMap";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { usePropertyAnalysis } from "@/hooks/usePropertyAnalysis";

const PropertyAnalysis = () => {
  const { analyses, loading, error, loadAnalyses, analyzeProperty } = usePropertyAnalysis();
  const [address, setAddress] = useState("");
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async (addressToAnalyze) => {
    if (!addressToAnalyze.trim()) {
      toast.error("Please enter a valid address");
      return;
    }

    setAnalyzing(true);
    try {
      const analysis = await analyzeProperty(addressToAnalyze);
      setCurrentAnalysis(analysis);
      toast.success("Property analysis completed!");
    } catch (error) {
      toast.error("Failed to analyze property");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleQuickAnalyze = () => {
    handleAnalyze(address);
  };

  if (loading) return <Loading type="form" />;
  if (error) return <Error message={error} onRetry={loadAnalyses} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Analysis</h1>
          <p className="text-gray-600">AI-powered property analysis for accurate quotes</p>
        </div>
        <Button variant="outline" onClick={loadAnalyses}>
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Quick Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Analysis</h3>
        <div className="flex space-x-4">
          <FormField
            label="Property Address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main Street, City, State, ZIP"
            className="flex-1"
          />
          <div className="flex items-end">
            <Button 
              onClick={handleQuickAnalyze}
              disabled={analyzing || !address.trim()}
            >
              {analyzing ? (
                <>
                  <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <ApperIcon name="Scan" className="h-4 w-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Map */}
        <PropertyMap
          address={address}
          analysis={currentAnalysis}
          onAnalyze={handleAnalyze}
        />

        {/* Recent Analyses */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Analyses</h3>
          {analyses.length === 0 ? (
            <Empty 
              type="analysis"
              onAction={() => handleAnalyze(address)}
            />
          ) : (
            <div className="space-y-3">
              {analyses.slice(0, 5).map((analysis, index) => (
                <motion.div
                  key={analysis.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => setCurrentAnalysis(analysis)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      <ApperIcon name="MapPin" className="h-4 w-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {analysis.address}
                      </p>
                      <p className="text-xs text-gray-500">
                        {analysis.house_style} • {analysis.roofline_linear_feet} ft roofline
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {analysis.roof_peaks_count} peaks
                    </p>
                    <p className="text-xs text-gray-500">
                      {analysis.complexity_level}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Analysis Details */}
      {currentAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analysis Details: {currentAnalysis.address}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <ApperIcon name="Home" className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Roofline</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">
                  {currentAnalysis.roofline_linear_feet} ft
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <ApperIcon name="Mountain" className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Roof Peaks</span>
                </div>
                <p className="text-2xl font-bold text-green-900">
                  {currentAnalysis.roof_peaks_count}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <ApperIcon name="Building" className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-900">Style</span>
                </div>
                <p className="text-2xl font-bold text-purple-900 capitalize">
                  {currentAnalysis.house_style}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Property Features</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Driveway Length:</span>
                    <span className="font-medium">{currentAnalysis.driveway_length_feet} ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Complexity Level:</span>
                    <span className="font-medium capitalize">{currentAnalysis.complexity_level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Size:</span>
                    <span className="font-medium capitalize">{currentAnalysis.property_size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Front Entrance:</span>
                    <span className="font-medium">
                      {currentAnalysis.front_entrance_area ? "Suitable" : "Not suitable"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recommended Services</h4>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis.recommended_services?.map((service, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyAnalysis;