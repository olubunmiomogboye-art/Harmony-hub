# Harmony Hub — Website Design & Functionality

A luxury, fully functional website for **Harmony Hub**, a premier enterprise based in **Ibadan, Oyo State, Nigeria**, uniting bespoke event management, royal banqueting, curated furniture, catering, decor styling, and high-quality retail products under one brand.

Designed and engineered to faithfully implement the [Harmony Hub Figma Design](https://www.figma.com/design/WFCEW71tm9FYqGoHPOkoZx/Harmony-Hub?node-id=47-584).

---

## Key Features & Architecture

### 1. Two Connected Divisions
- **Flair & Flavors (Events & Hospitality)**: Grand royal banquets, event planning, decor scenography, bespoke celebration cakes, and private tasting salons.
- **Retail & Trading (Curated Living)**: Chef-grade kitchenware, delicate mother & baby essentials, structured leathercraft, womenswear, and childrens' celebration outfits.

### 2. Complete Pages Implemented
1. **Home Page (`/`)**: Hero with dual CTAs ("Shop Now", "Plan Your Event"), quote bar, two business divisions showcase, archival galas mosaic, featured products grid, services overview, founder spotlight (Olubunmi Folorunsho, 12+ years experience), and pre-footer CTA banner.
2. **Shop Page (`/shop`)**: Responsive product catalog with real-time text search, category filtering (Kitchen Utensils, Baby Things, Womens' Fashion, Childrens' Outfits), price/name sorting, stock indicators, and trust pillars.
3. **Product Detail Pages (`/shop/[id]`)**: Minimal, purchase-focused detail view with product imagery, specifications, accessible quantity stepper (+/-), instant subtle "Added to Bag" toast confirmation, and "View Other Products" navigation.
4. **Shopping Bag (`/cart` & Slide-Over Drawer)**: Accessible from the bag counter on any page. Real-time subtotal calculations, item quantity controls, delivery fee advisory, and `localStorage` persistence across page reloads.
5. **Checkout Page (`/checkout`)**: Form collecting contact details, Ibadan/nationwide delivery instructions or atelier collection, order notes, and dynamic order summary. Prepares the order dossier for WhatsApp and sends genuine server-side email notifications to business management.
6. **About Page (`/about`)**: Authentic, personality-driven storytelling presenting founder Olubunmi Folorunsho, the enterprise mission ("Make life easier, spaces more inviting and special occasions more enjoyable"), 5-category service grid, and executive vision accordions.
7. **Contact Page (`/contact`)**: Dedicated inquiry tracks (Flair & Flavors vs Retail), direct channels (telephone, WhatsApp, email, salon tasting hours), response accord (within 4 hours), and director WhatsApp link.
8. **FAQs & Event Enquiry Page (`/faqs`)**: Accessible accordion answering 8 core questions regarding services, lead times, order processes, and Ibadan location. Includes an interactive "Let's Plan Your Event" form with dual actions: **"Submit Enquiry"** (via backend email) and **"Enquire on WhatsApp"** (with prefilled event message).
9. **Flair & Flavors Dedicated Page (`/flair-and-flavors`)**: In-depth event hospitality portfolio, 4 service pillars (Catering, Event Planning, Decoration & Styling, Cakes & Desserts), 4-step consultation process, and preparatory FAQs.

---

## Product Management (Replacing Placeholder Inventory)

All products across the entire website are managed from **a single central source of truth**:

📂 **`src/data/products.ts`**

Whenever you update, add, or replace a product in this file:
- The Shop listing (`/shop`) updates automatically.
- Product detail pages (`/shop/[id]`) update automatically.
- Featured products on the Home page update automatically.
- The shopping bag, checkout totals, line items, and stock limits update automatically.
- The formatted WhatsApp order messages and backend email notifications update automatically.

### Product Schema Example:
```typescript
{
  id: "quality-smp-food-storage",
  name: "Quality SMP Food Storage Container",
  category: "Kitchen Utensils",
  categorySlug: "kitchen-utensils",
  subtitle: "800 ML",
  price: 18000, // in Nigerian Naira (₦)
  image: "/images/products/container.jpg",
  shortDescription: "Airtight, durable food storage containers with locking clip lids.",
  description: "Detailed description of the product...",
  inStock: true,
  stockCount: 20,
  featured: true,
  badge: "Bestseller",
  specs: [
    { label: "Capacity", value: "800 ML" },
    { label: "Material", value: "BPA-Free Food Grade Polymer" }
  ]
}
```

---

## WhatsApp Click-to-Chat Flow

When a customer checks out, the application generates a structured message formatted according to business specifications:

- **Configurable Number**: Configured in `src/config/site.ts` (default: `2348156651504`).
- **Format**: International digits only without plus, spaces, or dashes (`https://wa.me/2348156651504?text=...`).
- **Safety**: The customer still presses "Send" in WhatsApp. The site informs the customer that order details are ready to send, avoiding false confirmations.

---

## Email Notifications (Backend API)

Both product orders and event enquiries trigger genuine server-side notifications via Next.js Route Handlers:
- **Order Notification**: `POST /api/order-notification`
- **Event Enquiry**: `POST /api/enquiry-notification`

### Configuration (`.env.local`):
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=2348156651504
BUSINESS_EMAIL=olubunmiomogboye@gmail.com
NOTIFICATION_EMAIL_TO=olubunmiomogboye@gmail.com
NOTIFICATION_EMAIL_FROM="Harmony Hub" <orders@harmonyhub.ng>

# SMTP Credentials (optional for development; required for live email delivery)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
```
*Note: If SMTP credentials are not yet configured, the system logs the full order and enquiry payloads on the server and informs the interface gracefully, ensuring zero customer data loss.*

---

## Running the Application

### Development Server:
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000).

### Production Build:
```bash
npm run build
npm start
```

---

## Brand Standards
- **Headings**: High-contrast luxury serif (`Cormorant Garamond`) with warm terracotta italic accents (`#B75D3A`).
- **Body & Controls**: Clean sans-serif (`Plus Jakarta Sans`).
- **Primary Colors**: Deep Forest Evergreen (`#172A25`), Warm Ivory (`#FAF8F5`), Champagne Cream (`#F4EFE6`), Terracotta Copper (`#B75D3A`).
- **Location**: Ibadan, Oyo State, Nigeria. Exact street addresses and map embeds are kept confidential for private consultation security.
