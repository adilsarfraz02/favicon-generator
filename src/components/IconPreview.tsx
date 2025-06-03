
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface IconPreviewProps {
  size: number;
  canvas: HTMLCanvasElement;
  onDownload: () => void;
  index: number;
}

export const IconPreview = ({ size, canvas, onDownload, index }: IconPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      <Card className="p-4 backdrop-blur-lg bg-white/60 border-white/30 hover:bg-white/80 transition-all duration-300 group">
        <div className="text-center space-y-3">
          <motion.div
            className="mx-auto relative overflow-hidden rounded-lg shadow-md"
            style={{ width: Math.min(size, 120), height: Math.min(size, 120) }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={canvas.toDataURL("image/png")}
              alt={`${size}x${size} icon`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          
          <div className="space-y-2">
            <p className="font-semibold text-gray-800">{size}×{size}</p>
            <Button
              onClick={onDownload}
              size="sm"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                Download
              </motion.div>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
