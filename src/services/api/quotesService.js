import quotesData from "@/services/mockData/quotes.json";

class QuotesService {
  constructor() {
    this.quotes = [...quotesData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.quotes]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const quote = this.quotes.find(q => q.Id === parseInt(id));
        if (quote) {
          resolve({ ...quote });
        } else {
          reject(new Error("Quote not found"));
        }
      }, 200);
    });
  }

  async create(quoteData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newQuote = {
          ...quoteData,
          Id: Math.max(...this.quotes.map(q => q.Id)) + 1,
          status: "draft",
          created_at: new Date().toISOString()
        };
        this.quotes.push(newQuote);
        resolve({ ...newQuote });
      }, 400);
    });
  }

  async update(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.quotes.findIndex(q => q.Id === parseInt(id));
        if (index !== -1) {
          this.quotes[index] = { ...this.quotes[index], ...updates };
          resolve({ ...this.quotes[index] });
        } else {
          reject(new Error("Quote not found"));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.quotes.findIndex(q => q.Id === parseInt(id));
        if (index !== -1) {
          this.quotes.splice(index, 1);
          resolve(true);
        } else {
          reject(new Error("Quote not found"));
        }
      }, 200);
    });
  }

  async generateFromWebhook(webhookData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newQuote = {
          Id: Math.max(...this.quotes.map(q => q.Id)) + 1,
          customer_name: webhookData.customer_name,
          customer_email: webhookData.customer_email,
          customer_phone: webhookData.customer_phone,
          service_address: webhookData.service_address,
          services_requested: webhookData.services_requested,
          timeline: webhookData.timeline,
          color_preference: webhookData.color_preference,
          call_summary: webhookData.call_summary,
          status: "generated",
          total_value: Math.floor(Math.random() * 3000) + 1000,
          created_at: new Date().toISOString(),
          property_analysis: {
            roofline_linear_feet: Math.floor(Math.random() * 150) + 100,
            roof_peaks_count: Math.floor(Math.random() * 4) + 1,
            house_style: ["colonial", "ranch", "contemporary", "cape_cod"][Math.floor(Math.random() * 4)],
            driveway_length_feet: Math.floor(Math.random() * 80) + 40,
            complexity_level: ["simple", "moderate", "complex"][Math.floor(Math.random() * 3)],
            property_size: ["small", "medium", "large"][Math.floor(Math.random() * 3)]
          },
          packages: this.generatePackages(webhookData.services_requested)
        };
        this.quotes.push(newQuote);
        resolve({ ...newQuote });
      }, 800);
    });
  }

  generatePackages(services) {
    const basePrice = Math.floor(Math.random() * 1000) + 1000;
    return [
      {
        tier: "essential",
        total: basePrice,
        services: ["Basic roofline lighting", "Installation"]
      },
      {
        tier: "complete",
        total: basePrice + 800,
        services: ["Premium roofline lighting", "Wreaths", "Garland", "Enhanced installation"]
      },
      {
        tier: "premium",
        total: basePrice + 1600,
        services: ["Multicolor roofline", "Premium wreaths", "Extended garland", "Stake lights", "Premium installation"]
      }
    ];
  }
}

export default new QuotesService();