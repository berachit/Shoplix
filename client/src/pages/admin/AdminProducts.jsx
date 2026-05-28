import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { PRODUCTS } from "../../services/products";
import { formatPrice } from "../../utils/format";

export default function AdminProducts() {
  const [q, setQ] = useState("");
  const list = PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

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
            {list.map((p) => (
              <tr key={p.id} className="border-b hairline last:border-0 hover:bg-muted/40 transition">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-lg overflow-hidden bg-muted">
                      <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.brand}</div>
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
                  <button className="p-1.5 rounded-md hover:bg-muted"><MoreHorizontal className="size-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
