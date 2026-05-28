import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS } from "../services/products";

const SORTS = [
  { v: "new", label: "New arrivals" },
  { v: "price-asc", label: "Price: low → high" },
  { v: "price-desc", label: "Price: high → low" },
];

const CATS = ["All", "Outerwear", "Footwear", "Knitwear", "Bags", "Accessories"];

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams();
  const c = searchParams.get("c") || undefined;
  const sort = searchParams.get("sort") || "new";

  const list = useMemo(() => {
    let out = [...PRODUCTS];
    if (c && c !== "All" && c !== "new") out = out.filter((p) => p.category === c);
    if (c === "new") out = out.filter((p) => p.badge === "New");
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    return out;
  }, [c, sort]);

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
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Collection</div>
        <h1 className="font-display text-5xl md:text-7xl mt-2">{active === "All" ? "Everything" : active}</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          {list.length} pieces · curated by the studio
        </p>
      </motion.div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y hairline py-4 sticky top-16 z-30 bg-background/80 backdrop-blur">
        <div className="flex flex-wrap gap-1.5">
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-sm transition ${
                active === cat ? "bg-foreground text-background" : "hover:bg-muted text-foreground/70"
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
          {SORTS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
        </select>
      </div>

      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
        {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>

      {list.length === 0 && (
        <div className="py-32 text-center text-muted-foreground">
          Nothing here yet. Try another category.
        </div>
      )}
    </div>
  );
}
