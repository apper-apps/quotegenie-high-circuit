import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const QuotePackages = ({ packages, onSelectPackage, selectedPackage }) => {
  const packageIcons = {
    essential: "Zap",
    complete: "Star",
    premium: "Crown"
  };

  const packageColors = {
    essential: "border-blue-200 bg-blue-50",
    complete: "border-accent-300 bg-accent-50",
    premium: "border-purple-200 bg-purple-50"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {packages.map((pkg, index) => (
        <motion.div
          key={pkg.tier}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative"
        >
          <Card className={cn(
            "tier-card p-6 cursor-pointer relative overflow-hidden",
            packageColors[pkg.tier],
            selectedPackage === pkg.tier && "ring-2 ring-primary-500",
            pkg.recommended && "recommended"
          )}>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className={cn(
                  "p-3 rounded-full",
                  pkg.tier === "essential" && "bg-blue-500",
                  pkg.tier === "complete" && "bg-accent-500",
                  pkg.tier === "premium" && "bg-purple-500"
                )}>
                  <ApperIcon 
                    name={packageIcons[pkg.tier]} 
                    className="h-8 w-8 text-white" 
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 capitalize">
                {pkg.tier} Package
              </h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${pkg.total.toLocaleString()}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {pkg.services.map((service, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <ApperIcon name="Check" className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">{service}</span>
                </div>
              ))}
            </div>

            <Button 
              variant={selectedPackage === pkg.tier ? "primary" : "outline"}
              className="w-full"
              onClick={() => onSelectPackage(pkg.tier)}
            >
              {selectedPackage === pkg.tier ? "Selected" : "Select Package"}
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default QuotePackages;