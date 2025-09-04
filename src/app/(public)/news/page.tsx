import { readNews } from "@/actions/news/actions";
import ShopClient from "./ShopClient";

export default async function Page() {
  const products = await readNews();
  return <ShopClient products={products} />;
}
