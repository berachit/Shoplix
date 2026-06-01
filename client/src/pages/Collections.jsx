import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "../components/ProductCard";
import { listProducts } from "../utils/api";

const SORTS = [
  { v: "new", label: "New arrivals" },
  { v: "price-asc", label: "Price: low → high" },
  { v: "price-desc", label: "Price: high → low" },
];

const CATS = ["All", "Outerwear", "Footwear", "Knitwear", "Bags"];

const SORT_MAP = {
  "price-asc": "lowToHigh",
  "price-desc": "highToLow",
  new: "newest",
};

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams();
  const c = searchParams.get("c") || undefined;
  const sort = searchParams.get("sort") || "new";

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = {
          sort: SORT_MAP[sort],
        };

        // Only send category if a real category is selected (not "All" or "new")
        if (c && c !== "All" && c !== "new") {
          params.category = c;
        }

        const { data } = await listProducts(params);

        if (data.success) {
          // If "New" tab selected, filter products marked as bestSeller on client side
          // (backend doesn't have a "new" filter — adjust if you add one later)
          const result =
            c === "new"
              ? data.products.filter((p) => p.bestSeller)
              : data.products;

          setProducts(result);
          setTotal(c === "new" ? result.length : data.totalProducts);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [c, sort]); // Re-runs whenever filter or sort changes

  const active = c ?? "All";

  const setFilter = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === "All") params.delete("c");
    else params.set("c", cat);
    setSearchParams(params);
  };

  const setSort = (val) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", val);
    setSearchParams(params);
  };

  return (
    <div className="container-px mx-auto max-w-7xl pt-10 md:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Collection
        </div>
        <h1 className="font-display text-5xl md:text-7xl mt-2">
          {active === "All" ? "Everything" : active}
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          {loading ? "Loading…" : `${total} pieces · curated by the studio`}
        </p>
      </motion.div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y hairline py-4 sticky top-16 z-30 bg-background/80 backdrop-blur">
        <div className="flex flex-wrap gap-1.5">
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-sm transition ${
                active === cat
                  ? "bg-foreground text-background"
                  : "hover:bg-muted text-foreground/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-sm bg-transparent border hairline rounded-full px-4 py-1.5 outline-none cursor-pointer"
        >
          {SORTS.map((s) => (
            <option key={s.v} value={s.v}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/5] rounded-2xl bg-muted" />
              <div className="mt-4 h-3 w-2/3 rounded bg-muted" />
              <div className="mt-2 h-3 w-1/3 rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
          {products.map((p, i) => (
            <ProductCard key={p._id} product={p} index={i} />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="py-32 text-center text-muted-foreground">
          Nothing here yet. Try another category.
        </div>
      )}
    </div>
  );
}
