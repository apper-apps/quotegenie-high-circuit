import { Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import QuotesList from "@/components/pages/QuotesList";
import QuoteEditor from "@/components/pages/QuoteEditor";
import PropertyAnalysis from "@/components/pages/PropertyAnalysis";
import Settings from "@/components/pages/Settings";
import SystemStatus from "@/components/pages/SystemStatus";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quotes" element={<QuotesList />} />
        <Route path="/quotes/:id" element={<QuoteEditor />} />
        <Route path="/property-analysis" element={<PropertyAnalysis />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/system-status" element={<SystemStatus />} />
      </Routes>
    </Layout>
  );
}

export default App;