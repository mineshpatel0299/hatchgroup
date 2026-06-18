import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectCarousel from '@/components/ui/ProjectCarousel';

// Mock data to match the project theme
const projectsData = {
  "1": { title: "OVER O", category: "Commercial", year: "2023", client: "Hatch Group", images: ["/images/commercial-thumb.png", "/images/hero.png", "/images/luxury-bg.png", "/images/materials-bg.png"], image2: "/images/luxury-bg.png" },
  "2": { title: "RIVER VIEW", category: "Residential", year: "2024", client: "Hatch Group", images: ["/images/residential-thumb.png", "/images/philosophy-bg.png", "/images/commercial-thumb.png"], image2: "/images/materials-bg.png" },
  "3": { title: "SKYLIN", category: "Hospitality", year: "2022", client: "Hatch Group", images: ["/images/hospitality-thumb.png", "/images/hero.png", "/images/featured-project.png"], image2: "/images/hero.png" },
  "4": { title: "APPARTA", category: "Turnkey", year: "2023", client: "Hatch Group", images: ["/images/turnkey-thumb.png", "/images/materials-bg.png", "/images/luxury-bg.png"], image2: "/images/philosophy-bg.png" },
  "5": { title: "THE MOONWAY APARTMENT", category: "Featured Project", year: "2025", client: "Hatch Group", images: ["/images/featured-project.png", "/images/hero.png", "/images/commercial-thumb.png", "/images/residential-thumb.png"], image2: "/images/luxury-bg.png" },
  "6": { title: "TRUE", category: "Interior", year: "2021", client: "Hatch Group", images: ["/images/luxury-bg.png", "/images/philosophy-bg.png", "/images/materials-bg.png"], image2: "/images/residential-thumb.png" },
  "7": { title: "APPARTA", category: "Materials", year: "2022", client: "Hatch Group", images: ["/images/materials-bg.png", "/images/hero.png", "/images/commercial-thumb.png"], image2: "/images/commercial-thumb.png" },
  "8": { title: "PECHERSK SCHOOL", category: "Philosophy", year: "2019", client: "Hatch Group", images: ["/images/philosophy-bg.png", "/images/featured-project.png", "/images/turnkey-thumb.png"], image2: "/images/hero.png" },
  "9": { title: "INTERNATIONAL", category: "Architecture", year: "2024", client: "Hatch Group", images: ["/images/hero.png", "/images/luxury-bg.png", "/images/materials-bg.png"], image2: "/images/turnkey-thumb.png" },
};

type Params = Promise<{ id: string }>;

import ProjectDetailContent from "./ProjectDetailContent";

export default async function ProjectDetailPage(props: { params: Params }) {
  const params = await props.params;
  
  const projectId = params.id as keyof typeof projectsData;
  const project = projectsData[projectId] || projectsData["5"]; // Fallback to featured project
  
  const parsedId = parseInt(params.id);
  const nextProjectId = !isNaN(parsedId) ? String((parsedId % 9) + 1) as keyof typeof projectsData : "1";
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
