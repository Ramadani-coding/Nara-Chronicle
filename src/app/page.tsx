import { getArticles } from "@/lib/articles";
import { ChronicleHome } from "@/components/ChronicleHome";

export const revalidate = 60; // ISR cache 60s

export default async function HomePage() {
  const articles = await getArticles();

  return <ChronicleHome initialArticles={articles} />;
}
