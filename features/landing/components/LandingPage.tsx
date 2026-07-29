import { LandingNavbar } from "@/features/landing/components/landing-navbar";
import { LandingHero } from "@/features/landing/components/landing-hero";
import { LandingContent } from "@/features/landing/components/landing-content";

export const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};
