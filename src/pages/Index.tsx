
import { motion } from "framer-motion";
import { PWAIconGenerator } from "@/components/PWAIconGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-4">
            PWA Icon Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your source icon and generate all required icon sizes for your Progressive Web App.
            Professional quality icons with perfect dimensions.
          </p>
        </motion.div>
        
        <PWAIconGenerator />
      </div>
    </div>
  );
};

export default Index;
