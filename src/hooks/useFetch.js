import Constants from "expo-constants";
import { useEffect, useState } from "react";
const NEWS_API_KEY = Constants.expoConfig.extra.NEWS_API_KEY;

export default function useFetch() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NEWS_API_KEY}`;

  async function fetchData() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
}
