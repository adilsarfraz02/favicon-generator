
import { motion } from "framer-motion";
import { PWAIconGenerator } from "@/components/PWAIconGenerator";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Add structured data for better SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PWA Icon Generator",
      "applicationCategory": "DeveloperApplication",
      "description": "Generate all required PWA icon sizes from your source image. Professional quality icons for Progressive Web Apps.",
      "operatingSystem": "Any",
      "url": "https://lovable.dev/",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Generate PWA icons in all required sizes",
        "Batch download as ZIP",
        "Professional quality output",
        "Instant generation",
        "No registration required"
      ]
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-4">
            PWA Icon Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Upload your source icon and generate all required icon sizes for your Progressive Web App.
            Professional quality icons with perfect dimensions.
          </p>
          
          {/* SEO-friendly features list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8 mb-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-violet-700 mb-2">All Standard Sizes</h3>
              <p className="text-sm text-gray-600">Generates icons in 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, and 512x512 pixels</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 mb-2">Instant Download</h3>
              <p className="text-sm text-gray-600">Download individual icons or get all sizes packaged in a convenient ZIP file</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-emerald-700 mb-2">Professional Quality</h3>
              <p className="text-sm text-gray-600">High-quality scaling with optimized compression for perfect PWA integration</p>
            </div>
          </div>
        </motion.header>
        
        <PWAIconGenerator />
        
        {/* Additional SEO content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-white/70 backdrop-blur-lg rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About PWA Icon Generation</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Progressive Web Apps (PWAs) require multiple icon sizes to ensure optimal display across different devices and platforms. 
                Our PWA Icon Generator automatically creates all the standard icon sizes recommended by web standards.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Why Use Our PWA Icon Generator?</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• <strong>Complete Coverage:</strong> Generates all 8 standard PWA icon sizes</li>
                <li>• <strong>High Quality:</strong> Maintains image quality during resizing process</li>
                <li>• <strong>Easy to Use:</strong> Simple drag-and-drop interface</li>
                <li>• <strong>Instant Results:</strong> Generate and download icons in seconds</li>
                <li>• <strong>Free Tool:</strong> No registration or payment required</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Index;
