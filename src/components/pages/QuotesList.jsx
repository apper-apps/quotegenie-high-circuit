import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import QuoteTable from "@/components/organisms/QuoteTable";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { useQuotes } from "@/hooks/useQuotes";

const QuotesList = () => {
  const navigate = useNavigate();
  const { quotes, loading, error, loadQuotes, deleteQuote } = useQuotes();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.service_address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewQuote = (id) => {
    navigate(`/quotes/${id}`);
  };

  const handleDeleteQuote = async (id) => {
    if (window.confirm("Are you sure you want to delete this quote?")) {
      try {
        await deleteQuote(id);
        toast.success("Quote deleted successfully");
      } catch (error) {
        toast.error("Failed to delete quote");
      }
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const statusOptions = [
    { value: "all", label: "All Statuses", count: quotes.length },
    { value: "draft", label: "Draft", count: quotes.filter(q => q.status === "draft").length },
    { value: "generated", label: "Generated", count: quotes.filter(q => q.status === "generated").length },
    { value: "sent", label: "Sent", count: quotes.filter(q => q.status === "sent").length },
    { value: "viewed", label: "Viewed", count: quotes.filter(q => q.status === "viewed").length },
    { value: "approved", label: "Approved", count: quotes.filter(q => q.status === "approved").length },
    { value: "rejected", label: "Rejected", count: quotes.filter(q => q.status === "rejected").length }
  ];

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadQuotes} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
          <p className="text-gray-600">Manage all your holiday lighting quotes</p>
        </div>
        <Button onClick={() => navigate("/quotes/new")}>
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          New Quote
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar 
          placeholder="Search quotes..."
          onSearch={handleSearch}
          className="flex-1 max-w-md"
        />
        
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                statusFilter === option.value
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.label}
              {option.count > 0 && (
                <span className="ml-1 text-xs">({option.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Table */}
      {filteredQuotes.length === 0 ? (
        <Empty 
          type="quotes"
          onAction={() => navigate("/quotes/new")}
        />
      ) : (
        <QuoteTable 
          quotes={filteredQuotes}
          onViewQuote={handleViewQuote}
          onDeleteQuote={handleDeleteQuote}
        />
      )}
    </div>
  );
};

export default QuotesList;