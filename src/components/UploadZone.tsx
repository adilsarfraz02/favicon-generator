
import { useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  sourceImage: HTMLImageElement | null;
}

export const UploadZone = ({ onFileSelect, sourceImage }: UploadZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        className="border-2 border-dashed border-violet-300 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-violet-400 hover:bg-violet-50/50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileChange}
          className="hidden"
        />
        
        {sourceImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden shadow-lg">
              <img
                src={sourceImage.src}
                alt="Source"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">Image uploaded!</p>
              <p className="text-sm text-gray-600">
                Dimensions: {sourceImage.width}×{sourceImage.height}
              </p>
              <p className="text-sm text-violet-600 mt-2">Click to change image</p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-400 to-blue-500 rounded-full flex items-center justify-center"
            >
              <Upload className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Drop your icon here or click to browse
              </p>
              <p className="text-sm text-gray-600">
                Supports PNG, JPG • Recommended: 512×512 or larger
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
