import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProduct, listProducts } from "../../utils/api";
import { formatPrice } from "../../utils/format";

export default function AdminProducts() {
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await listProducts({ keyword: q, limit: 1000, sort: "newest" });
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load products");
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    const timer = setTimeout(loadProducts, 250);
    return () => clearTimeout(timer);
  }, [loadProducts]);

  const handleDelete = async (productId) => {
    try {
      const { data } = await deleteProduct(productId);
      if (data.success) {
        setProducts((prev) => prev.filter((product) => product._id !== productId));
        toast.success("Product removed");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to remove product");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Catalog</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Products</h1>
        </div>
        <Link to="/admin/products/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm hover:bg-accent hover:text-accent-foreground transition">
          <Plus className="size-4" /> Add product
        </Link>
      </div>

      <div className="mt-8 flex items-center gap-3 border hairline rounded-full px-5 py-3 bg-surface max-w-md">
        <Search className="size-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products"
          className="flex-1 bg-transparent text-sm outline-none" />
      </div>

      <div className="mt-8 rounded-2xl border hairline bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-[0.16em] text-muted-foreground border-b hairline">
              <th className="font-normal py-3 px-6">Product</th>
              <th className="font-normal py-3">Category</th>
              <th className="font-normal py-3">Stock</th>
              <th className="font-normal py-3">Price</th>
              <th className="font-normal py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b hairline">
                  <td className="py-4 px-6" colSpan={5}>
                    <div className="h-12 rounded bg-muted animate-pulse" />
                  </td>
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td className="py-12 px-6 text-center text-muted-foreground" colSpan={5}>
                  No products found.
                </td>
              </tr>
            ) : products.map((p) => (
              <tr key={p._id} className="border-b hairline last:border-0 hover:bg-muted/40 transition">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-lg overflow-hidden bg-muted">
                      <img src={p.image?.[0]?.url} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.subCategory}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-muted-foreground">{p.category}</td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <span className="size-1.5 rounded-full bg-accent" /> In stock
                  </span>
                </td>
                <td className="py-3 font-medium">{formatPrice(p.price)}</td>
                <td className="py-3 px-6 text-right">
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-destructive"
                    aria-label="Delete product"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
