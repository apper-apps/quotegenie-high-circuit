import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavItem = ({ to, icon, label, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
        isActive 
          ? "bg-white/20 text-white shadow-lg" 
          : "text-primary-100 hover:bg-white/10 hover:text-white"
      )}
    >
      <ApperIcon name={icon} className="h-5 w-5" />
      <span className="font-medium">{label}</span>
      {badge && (
        <span className="ml-auto bg-accent-500 text-primary-900 px-2 py-1 rounded-full text-xs font-bold">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default NavItem;