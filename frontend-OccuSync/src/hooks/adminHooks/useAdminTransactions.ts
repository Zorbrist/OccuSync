import { useState, useEffect, useMemo } from "react";
import { getAllTransactions } from "../../services/adminService";
import type { AdminTransaction } from "../../types/adminType";

export const useAdminTransactions = () => {
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getAllTransactions();
        setTransactions(data.transactions);
      } catch (err) {
        setError("Failed to load platform transactions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) =>
      tx.id.toString().includes(search) ||
      tx.business_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search]);

  return {
    transactions: filteredTransactions,
    loading,
    error,
    search,
    changeSearch: setSearch,
  };
};