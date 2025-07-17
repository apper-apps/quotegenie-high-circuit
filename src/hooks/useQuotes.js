import { useState, useEffect } from "react";
import quotesService from "@/services/api/quotesService";

export const useQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadQuotes = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await quotesService.getAll();
      setQuotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createQuote = async (quoteData) => {
    setError("");
    try {
      const newQuote = await quotesService.create(quoteData);
      setQuotes(prev => [...prev, newQuote]);
      return newQuote;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateQuote = async (id, updates) => {
    setError("");
    try {
      const updatedQuote = await quotesService.update(id, updates);
      setQuotes(prev => prev.map(q => q.Id === parseInt(id) ? updatedQuote : q));
      return updatedQuote;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteQuote = async (id) => {
    setError("");
    try {
      await quotesService.delete(id);
      setQuotes(prev => prev.filter(q => q.Id !== parseInt(id)));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const generateFromWebhook = async (webhookData) => {
    setError("");
    try {
      const newQuote = await quotesService.generateFromWebhook(webhookData);
      setQuotes(prev => [...prev, newQuote]);
      return newQuote;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  return {
    quotes,
    loading,
    error,
    loadQuotes,
    createQuote,
    updateQuote,
    deleteQuote,
    generateFromWebhook
  };
};