import { getAllNews } from "@/modules/news/news.actions"
import ShopClient from "@/app/(public)/news/Shop-Client";

export default async function Page() {
  const products = await getAllNews();
  return <ShopClient products={products} />;
}
