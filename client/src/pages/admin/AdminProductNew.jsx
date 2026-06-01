import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Upload, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { addProduct } from "../../utils/api";

const Field = ({ label, ...props }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1.5">{label}</span>
    <input
      {...props}
      className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground"
    />
  </label>
);

export default function AdminProductNew() {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    sizes: "",
    price: "",
    bestSeller: false,
  });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const set = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("subCategory", form.subCategory);
      data.append("bestSeller", String(form.bestSeller));
      data.append(
        "sizes",
        JSON.stringify(
          form.sizes
            .split(",")
            .map((size) => size.trim())
            .filter(Boolean),
        ),
      );

      images.slice(0, 4).forEach((image, index) => {
        data.append(`image${index + 1}`, image);
      });

      const response = await addProduct(data);

      if (response.data.success) {
        toast.success("Product created");
        navigate("/admin/products");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to create product");
    } finally {
      setSaving(false);
    }
  };

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

      <form onSubmit={onSubmit} className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border hairline p-6 bg-surface space-y-4">
            <h2 className="font-display text-xl mb-2">Details</h2>
            <Field label="Name" value={form.name} onChange={set("name")} placeholder="Atelier Wool Overcoat" required />
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1.5">Description</span>
              <textarea
                rows={5}
                value={form.description}
                onChange={set("description")}
                placeholder="A tailored long-line overcoat..."
                required
                className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground"
              />
            </label>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Category" value={form.category} onChange={set("category")} placeholder="Outerwear" required />
              <Field label="Sub category" value={form.subCategory} onChange={set("subCategory")} placeholder="Coats" required />
            </div>
          </div>

          <div className="rounded-2xl border hairline p-6 bg-surface">
            <h2 className="font-display text-xl mb-4">Media</h2>
            <label className="block border-2 border-dashed border-border rounded-2xl p-12 text-center cursor-pointer hover:border-foreground transition">
              <Upload className="size-6 text-muted-foreground mx-auto" />
              <p className="mt-3 text-sm">
                {images.length ? `${images.length} image${images.length === 1 ? "" : "s"} selected` : "Drop images here or browse"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 4 images</p>
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(event) => setImages(Array.from(event.target.files ?? []).slice(0, 4))}
              />
            </label>
          </div>

          <div className="rounded-2xl border hairline p-6 bg-surface space-y-4">
            <h2 className="font-display text-xl mb-2">Variants</h2>
            <Field label="Sizes (comma separated)" value={form.sizes} onChange={set("sizes")} placeholder="XS, S, M, L, XL" required />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border hairline p-6 bg-surface space-y-4">
            <h2 className="font-display text-xl">Pricing</h2>
            <Field label="Price (INR)" type="number" min="0" value={form.price} onChange={set("price")} placeholder="489" required />
          </div>
          <div className="rounded-2xl border hairline p-6 bg-surface">
            <label className="flex items-center justify-between text-sm">
              <span>Mark as bestseller</span>
              <input type="checkbox" checked={form.bestSeller} onChange={set("bestSeller")} className="h-4 w-4 accent-current" />
            </label>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition disabled:opacity-60"
          >
            {saving ? "Saving..." : "Create product"}
          </button>
        </aside>
      </form>
    </div>
  );
}
