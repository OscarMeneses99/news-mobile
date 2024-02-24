import { createContext, useState, useEffect } from "react";
import Constants from "expo-constants";
const NEWS_API_KEY = Constants.expoConfig.extra.NEWS_API_KEY;

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = `https://newsapi.org/v2/everything?q=${search}}&sortBy=popularity&apiKey=${NEWS_API_KEY}`;

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NewsContext.Provider
      value={{
        search,
        setSearch,
        data,
        loading,
        error,
        fetchData,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
