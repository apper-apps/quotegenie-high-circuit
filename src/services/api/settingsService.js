import settingsData from "@/services/mockData/settings.json";

class SettingsService {
  constructor() {
    this.settings = { ...settingsData };
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...this.settings });
      }, 200);
    });
  }

  async updatePricing(pricingData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.settings.pricing = { ...this.settings.pricing, ...pricingData };
        resolve({ ...this.settings.pricing });
      }, 300);
    });
  }

  async updateEmailTemplates(templateData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.settings.email_templates = { ...this.settings.email_templates, ...templateData };
        resolve({ ...this.settings.email_templates });
      }, 300);
    });
  }

  async updateBusinessInfo(businessData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.settings.business_info = { ...this.settings.business_info, ...businessData };
        resolve({ ...this.settings.business_info });
      }, 300);
    });
  }
}

export default new SettingsService();