import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../services/products";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export default function Home() {
  const featured = PRODUCTS.slice(0, 4);
  const trending = PRODUCTS.slice(2, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative container-px mx-auto max-w-7xl pt-10 md:pt-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <motion.div {...fadeUp} className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" /> Autumn / Winter Edit
            </div>
            <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] mt-4 text-balance">
              Quiet pieces,<br />
              <em className="not-italic text-accent">loud</em> in detail.
            </h1>
            <p className="mt-6 max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed">
              A considered wardrobe of essentials — Italian wools, full-grain leathers,
              and Mongolian cashmere. Made in small runs, built to outlast the season.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/collections" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition">
                Shop the edit <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link to="/collections?c=new" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border hairline text-sm font-medium hover:bg-muted transition">
                New arrivals
              </Link>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80"
                alt="Featured" className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 glass rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Featured</div>
                  <div className="text-sm font-medium mt-0.5">Atelier Wool Overcoat</div>
                </div>
                <Link to="/product/atelier-wool-overcoat" className="p-2.5 rounded-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition">
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* trust strip */}
        <motion.div {...fadeUp} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b hairline py-6 text-sm">
          {[
            ["Free shipping", "On orders over $200"],
            ["30-day returns", "No questions asked"],
            ["Made in Europe", "Small batch production"],
            ["Lifetime repairs", "On all leather goods"],
          ].map(([t, s]) => (
            <div key={t}>
              <div className="font-medium">{t}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="container-px mx-auto max-w-7xl mt-28">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Categories</div>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Shop by collection</h2>
          </div>
          <Link to="/collections" className="hidden md:inline-flex items-center gap-2 text-sm hover:text-accent transition">
            All collections <ArrowRight className="size-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                to={`/collections?c=${c.name}`}
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-muted"
              >
                <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <div className="absolute inset-x-3 bottom-3 text-white">
                  <div className="text-base font-medium">{c.name}</div>
                  <div className="text-xs opacity-80">{c.count} pieces</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-px mx-auto max-w-7xl mt-28">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Featured</div>
            <h2 className="font-display text-4xl md:text-5xl mt-2">This week's edit</h2>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="container-px mx-auto max-w-7xl mt-28">
        <motion.div {...fadeUp} className="relative overflow-hidden rounded-3xl bg-foreground text-background">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=80"
            alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" loading="lazy"
          />
          <div className="relative px-8 md:px-16 py-20 md:py-32 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.22em] opacity-80">Studio Series 03</div>
            <h3 className="font-display text-4xl md:text-6xl mt-3 text-balance">
              An overcoat, refined over four seasons.
            </h3>
            <p className="mt-5 text-sm md:text-base opacity-80 max-w-md">
              Cut from Italian double-faced wool, hand-finished in Porto. The piece we wear most.
            </p>
            <Link to="/product/atelier-wool-overcoat"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background text-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition">
              Read the story <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* TRENDING */}
      <section className="container-px mx-auto max-w-7xl mt-28">
        <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Trending</div>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Most-loved pieces</h2>
          </div>
        </motion.div>
        <div className="-mx-4 md:-mx-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 md:gap-6 px-4 md:px-6 snap-x snap-mandatory">
            {trending.map((p, i) => (
              <div key={p.id} className="snap-start shrink-0 w-[78%] sm:w-[44%] md:w-[32%] lg:w-[24%]">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-px mx-auto max-w-3xl mt-28 text-center">
        <motion.div {...fadeUp}>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Newsletter</div>
          <h3 className="font-display text-4xl md:text-5xl mt-3 text-balance">
            Quiet updates, no noise.
          </h3>
          <p className="mt-4 text-muted-foreground">
            New arrivals, restocks, and studio notes — once a month, never more.
          </p>
          <form className="mt-8 flex max-w-md mx-auto rounded-full border hairline overflow-hidden bg-surface" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="you@studio.com"
              className="flex-1 bg-transparent px-5 py-3 text-sm outline-none" />
            <button className="px-6 bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition">
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
