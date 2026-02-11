import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ExperiencesSection from "@/components/experiences-section"
import CertificationsSection from "@/components/certifications-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />

      <SkillsSection />
      <ProjectsSection />
      <ExperiencesSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
