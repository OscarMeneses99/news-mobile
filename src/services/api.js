import Constants from "expo-constants";
const NEWS_API_KEY = Constants.expoConfig.extra.NEWS_API_KEY;

const API_URL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NEWS_API_KEY}`;

export async function getNews() {
  const response = await fetch(API_URL);
  return await response.json();
}