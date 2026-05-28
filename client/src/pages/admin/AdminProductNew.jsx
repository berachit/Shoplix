import { Link } from "react-router-dom";
import { useState } from "react";
import { Upload, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Field = ({ label, ...props }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1.5">{label}</span>
    <input {...props}
      className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground" />
  </label>
);

export default function AdminProductNew() {
  const [saving, setSaving] = useState(false);
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <Link to="/admin/products" className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground">
        <ArrowLeft className="size-3.5" /> Products
      </Link>
      <div className="mt-3 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">New</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Add product</h1>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaving(true);
          setTimeout(() => { setSaving(false); toast.success("Product created"); }, 800);
        }}
        className="mt-10 grid lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border hairline p-6 bg-surface space-y-4">
            <h2 className="font-display text-xl mb-2">Details</h2>
            <Field label="Name" placeholder="Atelier Wool Overcoat" required />
            <Field label="Brand" placeholder="Shoplix Studio" required />
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1.5">Description</span>
              <textarea rows={5} placeholder="A tailored long-line overcoat…"
                className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground" />
            </label>
          </div>

          <div className="rounded-2xl border hairline p-6 bg-surface">
            <h2 className="font-display text-xl mb-4">Media</h2>
            <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center">
              <Upload className="size-6 text-muted-foreground mx-auto" />
              <p className="mt-3 text-sm">Drop images here or <span className="text-accent underline">browse</span></p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 8MB</p>
            </div>
          </div>

          <div className="rounded-2xl border hairline p-6 bg-surface space-y-4">
            <h2 className="font-display text-xl mb-2">Variants</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Sizes (comma separated)" placeholder="XS, S, M, L, XL" />
              <Field label="Colors (comma separated)" placeholder="Charcoal, Camel, Ink" />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border hairline p-6 bg-surface space-y-4">
            <h2 className="font-display text-xl">Pricing</h2>
            <Field label="Price (USD)" type="number" placeholder="489" required />
            <Field label="Compare at" type="number" placeholder="590" />
          </div>
          <div className="rounded-2xl border hairline p-6 bg-surface space-y-4">
            <h2 className="font-display text-xl">Inventory</h2>
            <Field label="SKU" placeholder="SHX-OC-001" />
            <Field label="Stock" type="number" placeholder="120" />
          </div>
          <button type="submit" disabled={saving}
            className="w-full py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition disabled:opacity-60">
            {saving ? "Saving…" : "Create product"}
          </button>
        </aside>
      </form>
    </div>
  );
}
