export interface LinkProps {
  label: string;
  href: string;
  children?: LinkProps[];
}

export const Links: LinkProps[] = [
  { label: "Dashboard", href: "dashboard" },
  { label: "Customers", href: "customers" },
  {
    label: "Catalogs",
    href: "catalogs",
    children: [
      { label: "Product", href: "product" },
      { label: "Category", href: "category" },
      { label: "All Products", href: "all-products" },
      { label: "Add Units", href: "add-units" },
      { label: "Enter GST", href: "enter-gst" },
    ],
  },
  { label: "Orders", href: "orders" },
  { label: "Customers", href: "customers" },
];