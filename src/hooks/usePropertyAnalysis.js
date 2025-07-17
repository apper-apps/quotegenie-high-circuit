import { useState, useEffect } from "react";
import propertyService from "@/services/api/propertyService";

export const usePropertyAnalysis = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadAnalyses = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await propertyService.getAll();
      setAnalyses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const analyzeProperty = async (address) => {
    setError("");
    try {
      const analysis = await propertyService.analyzeProperty(address);
      setAnalyses(prev => [...prev, analysis]);
      return analysis;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    loadAnalyses();
  }, []);

  return {
    analyses,
    loading,
    error,
    loadAnalyses,
    analyzeProperty
  };
};