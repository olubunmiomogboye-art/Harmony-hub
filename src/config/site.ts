/**
 * Harmony Hub Configuration
 * Central configuration for brand info, WhatsApp click-to-chat, and notifications.
 */

export const siteConfig = {
  name: "Harmony Hub",
  tagline: "For the moments you host. And the life you live.",
  founder: {
    name: "Olubunmi Folorunsho",
    title: "Founder & Creative Director",
    experienceYears: "12+",
    bio: "Behind Harmony Hub is a woman who believes thoughtful details can turn an ordinary moment into something unforgettable. Her love for welcoming spaces, meaningful celebrations and caring service is the spirit at the heart of the business.",
  },
  divisions: [
    {
      id: "flair-and-flavors",
      name: "Flair & Flavors",
      tagline: "Events & Hospitality",
      description: "From grand royal banquets and refined corporate galas to private tasting salons and bespoke celebration cakes, we transform intimate gatherings into sensory memories.",
      href: "/flair-and-flavors",
    },
    {
      id: "retail-and-trading",
      name: "Retail & Trading",
      tagline: "Curated Living & Kitchenware",
      description: "Thoughtfully selected products for your home, family, and personal wardrobe. Built with uncompromising durability, pure materials, and refined contemporary aesthetics.",
      href: "/shop",
    },
  ],
  contact: {
    // International format without +, spaces or special chars for wa.me links
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348165982112",
    phoneDisplay: "+234 816 598 2112",
    conciergeDisplay: "+234 816 598 2112",
    email: process.env.BUSINESS_EMAIL || "olubunmiomogboye@gmail.com",
    city: "Ibadan",
    state: "Oyo State",
    country: "Nigeria",
    locationDisplay: "Ibadan, Oyo State, Nigeria",
    hours: "Monday to Saturday: 08:00 – 18:00 WAT",
  },
  social: {
    instagram: "https://instagram.com",
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348165982112"}`,
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Flair & Flavors", href: "/flair-and-flavors" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};
