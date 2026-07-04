export interface Project {
  id: string;
  href: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export const PROJECTS: Project[] = [
  { id: "01", href: "/project/1", title: "Rajyog Commercial",     category: "Commercial",  year: "2025", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782731450/ChatGPT_Image_Jun_29_2026_at_04_28_46_PM_ybvhq4.png", description: "A premium residential development designed to elevate everyday living through thoughtful architecture and refined interiors." },
  { id: "02", href: "/project/2", title: "Loomba Corporate",      category: "Commercial",  year: "2025", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799516/ChatGPT_Image_Jun_30_2026_at_01_18_09_AM_zwxp14.png", description: "Meticulously designed spaces that balance sophistication with warmth — where every detail speaks of quality craftsmanship." },
  { id: "03", href: "/project/3", title: "Raipur Hub",            category: "Commercial",  year: "2025", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799365/ChatGPT_Image_Jun_30_2026_at_01_10_56_AM_rfz3wg.png", description: "Upcoming commercial and mixed-use developments designed to shape the city's evolving skyline." },
  { id: "04", href: "/project/4", title: "Delhi Business",        category: "Commercial",  year: "2025", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799750/ChatGPT_Image_Jun_30_2026_at_12_55_25_AM_1_xx8bn7.png", description: "A landmark residential development in the capital, merging contemporary elegance with the cultural richness of New Delhi." },
  { id: "05", href: "/project/5", title: "Meridian Tower",        category: "Commercial",  year: "2025", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799871/ChatGPT_Image_Jun_30_2026_at_01_25_07_AM_y5k5su.png", description: "A defining statement in luxury residential architecture — a landmark address conceived for those who demand the finest in design." },
  { id: "06", href: "/project/6", title: "Aurora Residences",     category: "Residential", year: "2026", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971826/ChatGPT_Image_Jul_1_2026_at_05_15_56_PM_1_sntyol.png", description: "An exquisite new residential project offering unparalleled luxury and comfort for modern living." },
  { id: "07", href: "/project/7", title: "Celestia Residences",   category: "Residential", year: "2026", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971888/ChatGPT_Image_Jul_1_2026_at_06_11_09_PM_mcuxi0.png", description: "Celestia Residences redefines the standard of premium living, merging breathtaking architectural vision with serene interiors." },
  { id: "08", href: "/project/8", title: "Lumina Residences",     category: "Residential", year: "2026", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_22_20_PM_fgdd8g.png", description: "A brilliant synthesis of refined architecture and warm, inviting living spaces in the heart of the city." },
];

export function findProjectByCategory(category: string): Project | undefined {
  return PROJECTS.find((p) => p.category.toLowerCase() === category.toLowerCase());
}
