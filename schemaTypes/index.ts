import { defineType, defineField } from "sanity";

// ─── CATEGORY ─────────────────────────────────────────
const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Category Name", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
    defineField({
      name: "images", 
      title: "Images", 
      type: "array",
      of: [{
        type: "object",
        name: "externalImage",
        title: "External Image",
        fields: [
          defineField({ name: "url", type: "url", title: "Image URL" }),
          defineField({ name: "alt", type: "string", title: "Alt Text" })
        ]
      }],
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "name" } },
});

// ─── BRAND ────────────────────────────────────────────
const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Brand Name", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "website", title: "Website URL", type: "url" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "name" } },
});

// ─── PRODUCT ──────────────────────────────────────────
const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Product Name", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "brand", title: "Brand", type: "reference", to: [{ type: "brand" }] }),
    defineField({
      name: "images", 
      title: "Images", 
      type: "array",
      of: [{
        type: "object",
        name: "externalImage",
        title: "External Image",
        fields: [
          defineField({ name: "url", type: "url", title: "Image URL" }),
          defineField({ name: "alt", type: "string", title: "Alt Text" })
        ]
      }],
    }),
    defineField({ name: "price", title: "Price (₹)", type: "number" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "features", title: "Key Features", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "specs", title: "Specifications", type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", type: "string", title: "Label" },
          { name: "value", type: "string", title: "Value" },
        ]
      }],
    }),
    defineField({ name: "warranty", title: "Warranty", type: "string" }),
    defineField({ name: "brochureUrl", title: "Brochure URL", type: "url" }),
    defineField({ name: "featured", title: "Featured Product", type: "boolean", initialValue: false }),
    defineField({ name: "inStock", title: "In Stock", type: "boolean", initialValue: true }),
    defineField({
      name: "badge", title: "Badge", type: "string",
      options: { list: ["Best Seller", "New Arrival", "Top Rated"] },
    }),
    defineField({
      name: "seo", title: "SEO", type: "object",
      fields: [
        { name: "title", type: "string", title: "Meta Title" },
        { name: "description", type: "text", title: "Meta Description" },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category.name" },
  },
});

// ─── TESTIMONIAL ──────────────────────────────────────
const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Customer Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number" }),
    defineField({
      name: "image", 
      title: "Photo (External URL)", 
      type: "object",
      fields: [
        defineField({ name: "url", type: "url", title: "Image URL" }),
        defineField({ name: "alt", type: "string", title: "Alt Text" })
      ]
    }),
  ],
  preview: { select: { title: "name", subtitle: "location" } },
});

// ─── AUTHOR ───────────────────────────────────────────
const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "image", 
      title: "Photo (External URL)", 
      type: "object",
      fields: [
        defineField({ name: "url", type: "url", title: "Image URL" }),
        defineField({ name: "alt", type: "string", title: "Alt Text" })
      ]
    }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
  ],
  preview: { select: { title: "name" } },
});

// ─── BLOG POST ────────────────────────────────────────
const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "category", title: "Category", type: "string",
      options: { list: ["Farming Tips", "Buying Guides", "Maintenance", "Irrigation", "Product Updates"] },
    }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "readTime", title: "Read Time (minutes)", type: "number" }),
    defineField({ name: "featured", title: "Featured Post", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});

// ─── FAQ ──────────────────────────────────────────────
const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string" }),
    defineField({ name: "answer", title: "Answer", type: "text" }),
    defineField({
      name: "category", title: "Category", type: "string",
      options: { list: ["Products", "Warranty", "Delivery", "Spare Parts", "Technical Support", "Payments"] },
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "question", subtitle: "category" } },
});

// ─── SITE SETTINGS ────────────────────────────────────
const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text" }),
    defineField({ name: "workingHours", title: "Working Hours", type: "string" }),
  ],
  preview: { select: { title: "siteName" } },
});

// ─── EXPORT ───────────────────────────────────────────
export const schemaTypes = [
  product,
  category,
  brand,
  testimonial,
  author,
  blogPost,
  faq,
  siteSettings,
];