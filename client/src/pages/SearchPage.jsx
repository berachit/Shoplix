import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS } from "../services/products";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const t = q.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        p.brand.toLowerCase().includes(t) ||
        p.category.toLowerCase().includes(t),
    );
  }, [q]);

  const setQ = (val) => {
    const params = new URLSearchParams(searchParams);
    params.set("q", val);
    setSearchParams(params);
  };

  return (
    <div className="container-px mx-auto max-w-7xl pt-10 md:pt-16">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Search</div>
      <h1 className="font-display text-5xl md:text-6xl mt-2">Find your piece</h1>

      <div className="mt-8 flex items-center gap-3 border-b hairline pb-4">
        <Search className="size-5 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try 'overcoat' or 'cashmere'…"
          className="flex-1 bg-transparent text-2xl md:text-3xl font-display outline-none placeholder:text-muted-foreground/60"
        />
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        {q.trim() ? `${results.length} result${results.length === 1 ? "" : "s"} for "${q}"` : "Start typing to search."}
      </div>

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
        {results.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}
