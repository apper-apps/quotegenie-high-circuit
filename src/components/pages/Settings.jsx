import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import settingsService from "@/services/api/settingsService";

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("pricing");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsService.getAll();
      setSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePricingChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [field]: parseFloat(value) || 0
      }
    }));
  };

  const handleEmailTemplateChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      email_templates: {
        ...prev.email_templates,
        [field]: value
      }
    }));
  };

  const handleBusinessInfoChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      business_info: {
        ...prev.business_info,
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsService.updatePricing(settings.pricing);
      await settingsService.updateEmailTemplates(settings.email_templates);
      await settingsService.updateBusinessInfo(settings.business_info);
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "pricing", label: "Pricing", icon: "DollarSign" },
    { id: "email", label: "Email Templates", icon: "Mail" },
    { id: "business", label: "Business Info", icon: "Building" }
  ];

  if (loading) return <Loading type="form" />;
  if (error) return <Error message={error} onRetry={loadSettings} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your pricing, templates, and business information</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <ApperIcon name="Save" className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <ApperIcon name={tab.icon} className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Pricing Tab */}
      {activeTab === "pricing" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Lighting Services</h4>
              <div className="space-y-4">
                <FormField
                  label="Roofline Standard (per linear foot)"
                  id="roofline_standard"
                  type="number"
                  step="0.01"
                  value={settings?.pricing?.roofline_standard || ""}
                  onChange={(e) => handlePricingChange("roofline_standard", e.target.value)}
                  placeholder="12.50"
                />
                <FormField
                  label="Roofline Premium (per linear foot)"
                  id="roofline_premium"
                  type="number"
                  step="0.01"
                  value={settings?.pricing?.roofline_premium || ""}
                  onChange={(e) => handlePricingChange("roofline_premium", e.target.value)}
                  placeholder="17.50"
                />
                <FormField
                  label="Wreaths Standard (each)"
                  id="wreaths_standard"
                  type="number"
                  step="0.01"
                  value={settings?.pricing?.wreaths_standard || ""}
                  onChange={(e) => handlePricingChange("wreaths_standard", e.target.value)}
                  placeholder="85.00"
                />
                <FormField
                  label="Wreaths Premium (each)"
                  id="wreaths_premium"
                  type="number"
                  step="0.01"
                  value={settings?.pricing?.wreaths_premium || ""}
                  onChange={(e) => handlePricingChange("wreaths_premium", e.target.value)}
                  placeholder="125.00"
                />
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Additional Services</h4>
              <div className="space-y-4">
                <FormField
                  label="Garland (per linear foot)"
                  id="garland"
                  type="number"
                  step="0.01"
                  value={settings?.pricing?.garland || ""}
                  onChange={(e) => handlePricingChange("garland", e.target.value)}
                  placeholder="8.75"
                />
                <FormField
                  label="Stake Lights (each)"
                  id="stake_lights"
                  type="number"
                  step="0.01"
                  value={settings?.pricing?.stake_lights || ""}
                  onChange={(e) => handlePricingChange("stake_lights", e.target.value)}
                  placeholder="25.00"
                />
                <FormField
                  label="Installation Base"
                  id="installation_base"
                  type="number"
                  step="0.01"
                  value={settings?.pricing?.installation_base || ""}
                  onChange={(e) => handlePricingChange("installation_base", e.target.value)}
                  placeholder="275.00"
                />
                <FormField
                  label="Installation Enhanced"
                  id="installation_enhanced"
                  type="number"
                  step="0.01"
                  value={settings?.pricing?.installation_enhanced || ""}
                  onChange={(e) => handlePricingChange("installation_enhanced", e.target.value)}
                  placeholder="358.00"
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Email Templates Tab */}
      {activeTab === "email" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Templates</h3>
          <div className="space-y-4">
            <FormField
              label="Quote Subject Line"
              id="quote_subject"
              value={settings?.email_templates?.quote_subject || ""}
              onChange={(e) => handleEmailTemplateChange("quote_subject", e.target.value)}
              placeholder="Your Holiday Lighting Quote from Yule Love Lights"
            />
            <FormField
              label="Quote Greeting"
              id="quote_greeting"
              value={settings?.email_templates?.quote_greeting || ""}
              onChange={(e) => handleEmailTemplateChange("quote_greeting", e.target.value)}
              placeholder="Thank you for your interest in our holiday lighting services!"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quote Footer
              </label>
              <textarea
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={settings?.email_templates?.quote_footer || ""}
                onChange={(e) => handleEmailTemplateChange("quote_footer", e.target.value)}
                placeholder="We look forward to making your holidays bright!"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Business Info Tab */}
      {activeTab === "business" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Company Name"
              id="company_name"
              value={settings?.business_info?.company_name || ""}
              onChange={(e) => handleBusinessInfoChange("company_name", e.target.value)}
              placeholder="Yule Love Lights"
            />
            <FormField
              label="Phone Number"
              id="phone"
              value={settings?.business_info?.phone || ""}
              onChange={(e) => handleBusinessInfoChange("phone", e.target.value)}
              placeholder="555-YULE-LOVE"
            />
            <FormField
              label="Email Address"
              id="email"
              type="email"
              value={settings?.business_info?.email || ""}
              onChange={(e) => handleBusinessInfoChange("email", e.target.value)}
              placeholder="info@yulelovelights.com"
            />
            <FormField
              label="Business Address"
              id="address"
              value={settings?.business_info?.address || ""}
              onChange={(e) => handleBusinessInfoChange("address", e.target.value)}
              placeholder="123 Business St, Westchester, NY 10601"
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default Settings;