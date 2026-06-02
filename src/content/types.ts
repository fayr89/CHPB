// All editable site content lives in this shape. The admin panel edits a single
// JSON document of this type; the public site renders from it (falling back to the
// defaults in ./defaults.ts when a field is missing).

export interface ServiceSlide {
  id: string;
  tag: string;
  image: string;
}

export interface AdvantageItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
}

export interface PricingItem {
  id: string;
  name: string;
  price: string;
  note: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface ServiceOption {
  id: string;
  value: string;
  label: string;
}

export interface SocialLink {
  id: string;
  label: string;
  icon: string;
  url: string;
}

export interface SiteContent {
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
  };
  brand: {
    logo: string;
    name: string;
  };
  nav: {
    services: string;
    gallery: string;
    pricing: string;
    reviews: string;
    contacts: string;
    request: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitleLeft: string;
    subtitleRight: string;
    videoUrl: string;
  };
  about: {
    title: string;
    categories: string[];
    serviceTag: string;
    serviceTitle: string;
    serviceDesc: string;
    boothImage: string;
    services: ServiceSlide[];
  };
  features: {
    label: string;
    title: string;
    items: AdvantageItem[];
  };
  gallery: {
    title: string;
    items: GalleryItem[];
  };
  pricing: {
    title: string;
    items: PricingItem[];
  };
  reviews: {
    label: string;
    title: string;
    image1: string;
    image2: string;
    items: ReviewItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
    bgImage: string;
    serviceOptions: ServiceOption[];
  };
  form: {
    name: string;
    phone: string;
    email: string;
    service: string;
    description: string;
    success: string;
    error: string;
  };
  footer: {
    address: string;
    phone: string;
    email: string;
    newsletterTitle: string;
    newsletterPlaceholder: string;
    newsletterHint: string;
    menuTitle: string;
    socialTitle: string;
    copyright: string;
    bigText: string;
    socials: SocialLink[];
  };
  legal: {
    companyName: string;
    inn: string;
    ogrn: string;
  };
}
