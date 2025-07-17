import propertyData from "@/services/mockData/propertyAnalyses.json";

class PropertyService {
  constructor() {
    this.analyses = [...propertyData];
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.analyses]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const analysis = this.analyses.find(a => a.Id === parseInt(id));
        if (analysis) {
          resolve({ ...analysis });
        } else {
          reject(new Error("Analysis not found"));
        }
      }, 200);
    });
  }

  async analyzeProperty(address) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAnalysis = {
          Id: Math.max(...this.analyses.map(a => a.Id)) + 1,
          address: address,
          coordinates: {
            lat: 40.9565 + (Math.random() - 0.5) * 0.1,
            lng: -73.7849 + (Math.random() - 0.5) * 0.1
          },
          satellite_image_url: `https://example.com/satellite/${Date.now()}.jpg`,
          roofline_linear_feet: Math.floor(Math.random() * 150) + 100,
          roof_peaks_count: Math.floor(Math.random() * 4) + 1,
          house_style: ["colonial", "ranch", "contemporary", "cape_cod", "modern"][Math.floor(Math.random() * 5)],
          driveway_length_feet: Math.floor(Math.random() * 80) + 40,
          front_entrance_area: Math.random() > 0.2,
          architectural_features: this.generateFeatures(),
          complexity_level: ["simple", "moderate", "complex"][Math.floor(Math.random() * 3)],
          property_size: ["small", "medium", "large"][Math.floor(Math.random() * 3)],
          accessibility_notes: this.generateAccessibilityNotes(),
          recommended_services: this.generateRecommendedServices(),
          analysis_timestamp: new Date().toISOString()
        };
        this.analyses.push(newAnalysis);
        resolve({ ...newAnalysis });
      }, 1200);
    });
  }

  generateFeatures() {
    const allFeatures = ["dormers", "bay_windows", "front_porch", "attached_garage", "covered_entry", "flat_sections", "modern_angles", "large_windows"];
    const count = Math.floor(Math.random() * 4) + 1;
    return allFeatures.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  generateAccessibilityNotes() {
    const notes = [
      "Easy access, single story installation",
      "Steep roof angle may require additional safety equipment",
      "Complex roofline with multiple angles and materials",
      "Standard installation with good ladder access",
      "Some areas may require specialized equipment"
    ];
    return notes[Math.floor(Math.random() * notes.length)];
  }

  generateRecommendedServices() {
    const services = ["roofline", "wreaths", "garland", "stake_lighting"];
    const count = Math.floor(Math.random() * 3) + 2;
    return services.sort(() => 0.5 - Math.random()).slice(0, count);
  }
}

export default new PropertyService();