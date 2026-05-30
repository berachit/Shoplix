import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t hairline mt-32">
      <div className="container-px mx-auto max-w-7xl py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-display text-3xl">Shoplix<span className="text-accent">.</span></div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            A modern atelier for everyday essentials. Designed in-house, made in small runs across Europe.
          </p>
          <form className="mt-8 flex max-w-sm rounded-full border hairline overflow-hidden bg-surface" onSubmit={e => e.preventDefault()}>
            <input
              placeholder="Subscribe for new arrivals"
              className="flex-1 bg-transparent px-5 text-sm outline-none placeholder:text-muted-foreground/70"
            />
            <button className="bg-foreground text-background text-sm font-medium px-5 py-3 hover:bg-accent hover:text-accent-foreground transition">
              Join
            </button>
          </form>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          {[
            { title: "Shop", links: [["New", "/collections"], ["Outerwear", "/collections?c=Outerwear"], ["Footwear", "/collections?c=Footwear"], ["Bags", "/collections?c=Bags"]] },
            { title: "Care", links: [["Orders", "/orders"], ["Returns", "#"], ["Shipping", "#"], ["Contact", "#"]] },
            { title: "Studio", links: [["About", "#"], ["Sustainability", "#"], ["Press", "#"], ["Stockists", "#"]] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map(([l, h]) => (
                  <li key={l}><Link to={h} className="hover:text-accent transition">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t hairline">
        <div className="container-px mx-auto max-w-7xl py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Shoplix Studio. All rights reserved.</span>
          <span>Made in India</span>
        </div>
      </div>
    </footer>
  );
}
