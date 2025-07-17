import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { cn } from "@/utils/cn";

const Header = ({ onMenuToggle }) => {
  const [systemStatus] = useState("operational");

  const handleSearch = (term) => {
    console.log("Search term:", term);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              systemStatus === "operational" ? "bg-green-500" : "bg-red-500"
            )}></div>
            <span className="text-sm font-medium text-gray-700">
              System {systemStatus === "operational" ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button variant="primary" size="sm">
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;