import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const PropertyMap = ({ address, analysis, onAnalyze }) => {
  const [loading, setLoading] = useState(false);
  const [satelliteView, setSatelliteView] = useState(true);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      await onAnalyze(address);
    } finally {
      setLoading(false);
    }
  };

  const analysisFeatures = [
    { key: "roofline_linear_feet", label: "Roofline Length", unit: "ft", icon: "Home" },
    { key: "roof_peaks_count", label: "Roof Peaks", unit: "", icon: "Mountain" },
    { key: "house_style", label: "House Style", unit: "", icon: "Building" },
    { key: "driveway_length_feet", label: "Driveway Length", unit: "ft", icon: "Car" },
    { key: "complexity_level", label: "Complexity", unit: "", icon: "Zap" },
    { key: "property_size", label: "Property Size", unit: "", icon: "Square" }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Property Analysis</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={satelliteView ? "primary" : "outline"}
              size="sm"
              onClick={() => setSatelliteView(true)}
            >
              <ApperIcon name="Satellite" className="h-4 w-4" />
            </Button>
            <Button
              variant={!satelliteView ? "primary" : "outline"}
              size="sm"
              onClick={() => setSatelliteView(false)}
            >
              <ApperIcon name="Map" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <ApperIcon name="MapPin" className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              {address || "Enter address to view property"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {satelliteView ? "Satellite View" : "Map View"}
            </p>
          </div>
        </div>

        <Button 
          onClick={handleAnalyze}
          disabled={!address || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
              Analyzing Property...
            </>
          ) : (
            <>
              <ApperIcon name="Scan" className="h-4 w-4 mr-2" />
              Analyze Property
            </>
          )}
        </Button>
      </Card>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {analysisFeatures.map((feature) => (
                <div key={feature.key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <ApperIcon name={feature.icon} className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{feature.label}</p>
                    <p className="text-sm text-gray-600">
                      {analysis[feature.key]} {feature.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {analysis.recommended_services && (
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Recommended Services</h5>
                <div className="flex flex-wrap gap-2">
                  {analysis.recommended_services.map((service, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.accessibility_notes && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <ApperIcon name="AlertTriangle" className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Installation Notes</p>
                    <p className="text-sm text-yellow-700">{analysis.accessibility_notes}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyMap;