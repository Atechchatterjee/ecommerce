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
      { label: "Add Product", href: "product" },
      { label: "Edit Category", href: "category" },
      { label: "View Products", href: "all-products" },
      { label: "Add Units", href: "add-units" },
      { label: "Enter GST", href: "enter-gst" },
    ],
  },
  { label: "Orders", href: "orders" },
  { label: "Customers", href: "customers" },
];
