import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

export default function ProjectScrollSection() {
  const total = PROJECTS.length;

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none luxe-grain" />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%", left: "50%", transform: "translateX(-50%)",
          width: "70vw", height: "45vh",
          background: "radial-gradient(ellipse at center, rgba(0,90,65,0.35) 0%, transparent 60%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 text-center mb-14 md:mb-20">
        <span className="block text-accent text-[10px] tracking-[0.5em] uppercase font-medium mb-4">
          Our Portfolio
        </span>
        <h2
          className="font-display font-light text-foreground leading-[1.05] mx-auto"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.6rem)", letterSpacing: "-0.015em" }}
        >
          Works of the <span className="luxe-gradient-text">maison</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {PROJECTS.map((project, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                data-cursor-interact
                className="group relative flex flex-col overflow-hidden rounded-xs border border-accent/20 bg-[linear-gradient(165deg,rgba(255,253,244,0.05)_0%,rgba(0,0,0,0.15)_100%)] shadow-[0_25px_60px_-25px_rgba(0,0,0,0.6)] transition-[border-color,box-shadow] duration-500 hover:border-accent/50 hover:shadow-[0_35px_70px_-25px_rgba(140,111,63,0.5)]"
              >
                {/* Image */}
                <div className="relative w-full aspect-4/3 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={i < 3}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,15,11,0.85) 0%, rgba(0,15,11,0.15) 55%, transparent 75%)" }}
                  />
                  {/* Category + counter */}
                  <div className="absolute top-5 left-6 right-6 flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.5em] uppercase font-medium text-accent">
                      {project.category}
                    </span>
                    <span className="font-display text-accent text-sm tracking-[0.35em]">
                      {num}/{String(total).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Corner ornament */}
                  <div className="absolute top-5 left-6 w-8 h-8 border-t border-l border-accent/50" />
                  <div className="absolute bottom-5 right-6 w-8 h-8 border-b border-r border-accent/50" />
                </div>

                {/* Text */}
                <div className="p-6 lg:p-7 flex flex-col">
                  <h3 className="font-display font-light text-xl lg:text-2xl text-foreground mb-2.5">
                    {project.title}
                  </h3>
                  <div
                    className="h-px w-12 mb-3"
                    style={{ background: "linear-gradient(to right, rgba(169,140,95,0.8), transparent)" }}
                  />
                  <p className="text-foreground/55 font-light text-sm leading-[1.7] mb-5 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-accent text-xs tracking-[0.25em] uppercase">
                      Explore
                      <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                    </span>
                    <span className="text-foreground/35 text-xs tracking-[0.2em]">
                      {project.year}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
