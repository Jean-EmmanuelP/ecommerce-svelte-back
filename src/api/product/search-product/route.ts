import type {
  MedusaRequest,
  MedusaResponse,
  ProductService,
} from "@medusajs/medusa";
import { searchProducts } from "../../_methods/products";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const productService = req.scope.resolve<ProductService>("productService");

  const products = await productService.list({});

  // Extraire le paramètre de recherche de l'URL
  const query = req.query.search as string;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  console.log("query", query);
  const results = searchProducts(products, query);

  res.json({
    results,
  });
};
