// ============================================
// LUMI ECOSYSTEM PAGE
// Premium Smart Home Landing Page
// ============================================
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import HeroSection from "../../components/ecosystem/lumi/HeroSection";
import AboutSection from "../../components/ecosystem/lumi/AboutSection";
import FeatureSection from "../../components/ecosystem/lumi/FeatureSection";
import LifestyleSection from "../../components/ecosystem/lumi/LifestyleSection";
import WhatCanLumiDoSection from "../../components/ecosystem/lumi/WhatCanLumiDoSection";
import SmartSceneSection from "../../components/ecosystem/lumi/SmartSceneSection";
import ProductEcosystemSection from "../../components/ecosystem/lumi/ProductEcosystemSection";
import TimelineSection from "../../components/ecosystem/lumi/TimelineSection";
import CompatibilitySection from "../../components/ecosystem/lumi/CompatibilitySection";
import CTASection from "../../components/ecosystem/lumi/CTASection";

const LumiPage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section - Full Screen */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Why Choose Lumi - Features */}
      <FeatureSection />

      {/* Who Is It For - Lifestyle */}
      <LifestyleSection />

      {/* What Can Lumi Do - Capability Showcase */}
      <WhatCanLumiDoSection />

      {/* Smart Scenes Section */}
      <SmartSceneSection />

      {/* Product Ecosystem Section */}
      <ProductEcosystemSection />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Compatibility Section */}
      <CompatibilitySection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default LumiPage;
