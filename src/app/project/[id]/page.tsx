import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectCarousel from '@/components/ui/ProjectCarousel';

// Mock data to match the project theme
const projectsData = {
  "1": {
    title: "DYNAMIC BUSINESS HUBS",
    subtitle: "",
    category: "Commercial",
    year: "2025",
    client: "Hatch Group",
    description: "A premium residential development designed to elevate everyday living through thoughtful architecture, refined interiors, and a seamless blend of comfort and luxury.",
    details: "Spanning across thoughtfully planned layouts, Dynamic Business Hubs brings together contemporary design principles with timeless elegance. Every unit is crafted to maximise natural light, ventilation, and spatial flow — creating homes that feel expansive and inviting.",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782731450/ChatGPT_Image_Jun_29_2026_at_04_28_46_PM_ybvhq4.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782731450/ChatGPT_Image_Jun_29_2026_at_04_26_19_PM_o7j9xh.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782731449/ChatGPT_Image_Jun_29_2026_at_04_17_12_PM_rget7w.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782731449/ChatGPT_Image_Jun_29_2026_at_04_18_55_PM_swccj8.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782731450/ChatGPT_Image_Jun_29_2026_at_04_27_30_PM_kevqsp.png",
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782731449/ChatGPT_Image_Jun_29_2026_at_04_18_55_PM_swccj8.png",
  },
  "2": {
    title: "CONTEMPORARY COMMERCIALS",
    subtitle: "",
    category: "Commercial",
    year: "2025",
    client: "Hatch Group",
    description: "Contemporary Commercials redefines urban living with meticulously designed spaces that balance sophistication with warmth — a place where every detail speaks of quality craftsmanship.",
    details: "Set in a prime location, Contemporary Commercials offers a curated living experience with premium amenities, landscaped surroundings, and interiors that reflect a modern yet rooted lifestyle. Built for families who value both form and function.",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799516/ChatGPT_Image_Jun_30_2026_at_01_18_09_AM_zwxp14.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799515/ChatGPT_Image_Jun_30_2026_at_01_16_59_AM_pdc7tq.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799515/ChatGPT_Image_Jun_30_2026_at_01_13_03_AM_piz4q4.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799488/ChatGPT_Image_Jun_30_2026_at_12_53_13_AM_zbmd9i.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799488/ChatGPT_Image_Jun_30_2026_at_12_50_13_AM_ecwqlw.png",
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799516/ChatGPT_Image_Jun_30_2026_at_01_18_09_AM_zwxp14.png",
  },
  "5": {
    title: "ICONIC DEVELOPMENTS",
    subtitle: "",
    category: "Commercial",
    year: "2025",
    client: "Hatch Group",
    description: "Iconic Developments is a defining statement in luxury residential architecture — a landmark address conceived for those who demand the finest in design, craftsmanship, and lifestyle.",
    details: "Rising with quiet authority, Iconic Developments brings together bold architectural form and restrained interior elegance. Each residence is a study in proportion and light, with curated materials and bespoke finishes that speak of permanence and prestige.",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799871/ChatGPT_Image_Jun_30_2026_at_01_25_07_AM_y5k5su.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799870/ChatGPT_Image_Jun_30_2026_at_01_23_56_AM_fvnd0t.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799849/ChatGPT_Image_Jun_30_2026_at_01_35_58_AM_u8onhf.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799849/ChatGPT_Image_Jun_30_2026_at_01_27_56_AM_uaxomm.png",
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799871/ChatGPT_Image_Jun_30_2026_at_01_25_07_AM_y5k5su.png",
  },
  "4": {
    title: "LANDMARK SPACES",
    subtitle: "",
    category: "Commercial",
    year: "2025",
    client: "Hatch Group",
    description: "Landmark Spaces is a landmark residential development in the capital, crafting refined urban homes that merge contemporary elegance with the cultural richness of New Delhi.",
    details: "Situated in one of Delhi's most sought-after addresses, this development offers meticulously planned residences with premium finishes, curated amenities, and thoughtful spatial design — redefining what modern capital living can feel like.",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799750/ChatGPT_Image_Jun_30_2026_at_12_55_25_AM_1_xx8bn7.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799749/ChatGPT_Image_Jun_30_2026_at_01_04_55_AM_xnwlvw.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799749/ChatGPT_Image_Jun_30_2026_at_01_03_57_AM_d1x6r6.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799717/ChatGPT_Image_Jun_30_2026_at_01_09_39_AM_yqkjav.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799715/ChatGPT_Image_Jun_30_2026_at_01_08_24_AM_lhrlq4.png",
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799750/ChatGPT_Image_Jun_30_2026_at_12_55_25_AM_1_xx8bn7.png",
  },
  "3": {
    title: "SIGNATURE COMMERCIALS",
    subtitle: "",
    category: "Commercial",
    year: "2025",
    client: "Hatch Group",
    description: "A portfolio of upcoming commercial and mixed-use developments across Raipur, designed to shape the city's evolving skyline with bold architecture and functional excellence.",
    details: "From high-street retail spaces to modern office complexes, our Raipur projects are envisioned to meet the growing demands of a rapidly developing city. Each project is planned with strategic location advantages and world-class construction standards.",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799365/ChatGPT_Image_Jun_30_2026_at_01_10_56_AM_rfz3wg.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799364/ChatGPT_Image_Jun_30_2026_at_01_09_39_AM_s90pxr.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799363/ChatGPT_Image_Jun_30_2026_at_01_08_24_AM_esjkdm.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799326/ChatGPT_Image_Jun_30_2026_at_12_50_13_AM_krr2nj.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799326/ChatGPT_Image_Jun_30_2026_at_12_53_13_AM_rfkyuc.png",
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799365/ChatGPT_Image_Jun_30_2026_at_01_10_56_AM_rfz3wg.png",
  },
  "6": {
    title: "PRIME LIVING",
    subtitle: "",
    category: "Residential",
    year: "2026",
    client: "Hatch Group",
    description: "Prime Living is an exquisite new residential project offering unparalleled luxury and comfort. Designed for modern living, it features state-of-the-art amenities and elegant architecture.",
    details: "Nestled in a serene environment, Prime Living provides a perfect blend of nature and urban convenience. The residences are crafted with premium materials and thoughtful layouts to ensure a vibrant and fulfilling lifestyle for all its residents.",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971826/ChatGPT_Image_Jul_1_2026_at_05_15_56_PM_1_sntyol.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971826/ChatGPT_Image_Jul_1_2026_at_05_14_16_PM_1_jrgplw.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971826/ChatGPT_Image_Jul_1_2026_at_05_17_17_PM_qtpdcq.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971825/ChatGPT_Image_Jul_1_2026_at_05_10_48_PM_1_ps8ute.png",
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971826/ChatGPT_Image_Jul_1_2026_at_05_15_56_PM_1_sntyol.png",
  },
  "7": {
    title: "TIMELESS RESIDENCES",
    subtitle: "",
    category: "Residential",
    year: "2026",
    client: "Hatch Group",
    description: "Timeless Residences redefines the standard of premium living, merging breathtaking architectural vision with serene, beautifully crafted interiors.",
    details: "Designed as an urban sanctuary, Timeless Residences offers panoramic views, open-concept layouts, and exclusive amenities that elevate the everyday experience. Every corner reflects an uncompromising commitment to quality and elegance.",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971888/ChatGPT_Image_Jul_1_2026_at_06_11_09_PM_mcuxi0.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971888/ChatGPT_Image_Jul_1_2026_at_06_12_22_PM_fo1is9.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971888/ChatGPT_Image_Jul_1_2026_at_06_09_55_PM_sxk4vi.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971887/ChatGPT_Image_Jul_1_2026_at_06_08_38_PM_wlpirl.png",
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971888/ChatGPT_Image_Jul_1_2026_at_06_11_09_PM_mcuxi0.png",
  },
  "8": {
    title: "BESPOKE HOMES",
    subtitle: "",
    category: "Residential",
    year: "2026",
    client: "Hatch Group",
    description: "Bespoke Homes offers a brilliant synthesis of refined architecture and warm, inviting living spaces, creating a haven of tranquility in the heart of the city.",
    details: "Meticulously designed to capture abundant natural light, Bespoke Homes features expansive windows, premium materials, and lushly landscaped terraces. It is the epitome of sophisticated modern living crafted for discerning individuals.",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_22_20_PM_fgdd8g.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_20_32_PM_rufoen.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_19_18_PM_wjtady.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_18_13_PM_imradj.png",
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_22_20_PM_fgdd8g.png",
  },
};

type Params = Promise<{ id: string }>;

import ProjectDetailContent from "./ProjectDetailContent";

export default async function ProjectDetailPage(props: { params: Params }) {
  const params = await props.params;
  
  const projectId = params.id as keyof typeof projectsData;
  const project = projectsData[projectId] || projectsData["1"];
  
  const parsedId = parseInt(params.id);
  const totalProjects = Object.keys(projectsData).length;
  const nextProjectId = !isNaN(parsedId) ? String((parsedId % totalProjects) + 1) as keyof typeof projectsData : "1";
  const nextProject = projectsData[nextProjectId] || projectsData["1"];

  return (
    <ProjectDetailContent 
      id={params.id}
      project={project}
      nextProjectId={nextProjectId}
      nextProject={nextProject}
    />
  );
}
