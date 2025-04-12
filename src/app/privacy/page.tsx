import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - Nayidisha",
  description: "Learn how Nayidisha protects your personal information and privacy",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50/70 to-white dark:from-purple-950/50 dark:to-background py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
            </p>
            
            <div className="flex items-center text-sm text-muted-foreground pt-4">
              <Link href="/" className="hover:text-pink-500 transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-foreground font-medium">Privacy Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto prose dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-pink-500 hover:prose-a:text-pink-600 dark:hover:prose-a:text-pink-400">
            <p>
              <strong>Last Updated:</strong> June 15, 2023
            </p>
            
            <h2>Introduction</h2>
            <p>
              Welcome to NayiDisha. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share your personal information when you visit our website, use our mobile application, or engage with our services.
            </p>
            <p>
              Please read this privacy policy carefully as it will help you understand what we do with the information that we collect.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you register on our platform, express interest in obtaining information about us or our products and services, or otherwise contact us.
            </p>
            <p>
              The personal information we collect may include:
            </p>
            <ul>
              <li>Name, email address, and contact details</li>
              <li>User credentials (username, password)</li>
              <li>Financial information (for financial health assessments)</li>
              <li>Profile data (preferences, interests)</li>
              <li>Usage data (how you interact with our platform)</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We use your personal information for the following purposes:
            </p>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To personalize your experience on our platform</li>
              <li>To improve our services based on your feedback and interactions</li>
              <li>To communicate with you about updates, offers, and educational content</li>
              <li>To protect our services and users from fraudulent or harmful activities</li>
            </ul>
            
            <h2>How We Share Your Information</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Service providers that help us deliver our services</li>
              <li>Business partners with your consent</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p>
              We do NOT sell your personal information to third parties for marketing purposes.
            </p>
            
            <h2>Your Privacy Rights</h2>
            <p>
              You have the following rights regarding your personal information:
            </p>
            <ul>
              <li>Right to access and update your personal information</li>
              <li>Right to request deletion of your personal information</li>
              <li>Right to opt-out of marketing communications</li>
              <li>Right to data portability</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@nayidisha.in.
            </p>
            
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can manage your cookie preferences through your browser settings.
            </p>
            
            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date at the top of this page. We encourage you to review this privacy policy frequently to stay informed about how we are protecting your information.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have questions or concerns about this privacy policy or our practices, please contact us at:
            </p>
            <p>
              Email: privacy@nayidisha.in<br />
              Address: 123 Financial Center, MG Road, Bengaluru, Karnataka 560001, India<br />
              Phone: +91 98765 43210
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 