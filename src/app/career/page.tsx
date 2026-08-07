import type { Metadata } from "next";
import CareerPageContent from "@/components/sections/CareerPageContent";

export const metadata: Metadata = {
  title: "Careers | Hatch Group — Premium Indian Interior Design Studio",
  description:
    "Join Hatch Group. We're always looking for people who treat design as a craft — explore life at the studio and apply.",
};

export default function CareerPage() {
  return <CareerPageContent />;
}
