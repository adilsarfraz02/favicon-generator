
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconPreview } from "./IconPreview";
import { UploadZone } from "./UploadZone";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useToast } from "@/hooks/use-toast";

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

export const PWAIconGenerator = () => {
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
  const [generatedIcons, setGeneratedIcons] = useState<{ size: number; canvas: HTMLCanvasElement }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        console.log("Source image loaded:", img.width, "x", img.height);
        setSourceImage(img);
        toast({
          title: "Image loaded successfully!",
          description: `Dimensions: ${img.width}x${img.height}`,
        });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const generateIcons = async () => {
    if (!sourceImage) {
      toast({
        title: "No image selected",
        description: "Please select a source image first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    const icons: { size: number; canvas: HTMLCanvasElement }[] = [];

    for (const size of ICON_SIZES) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Add subtle shadow for depth
        ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        ctx.drawImage(sourceImage, 0, 0, size, size);
      }
      
      icons.push({ size, canvas });
      
      // Add small delay for smooth animation
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setGeneratedIcons(icons);
    setIsGenerating(false);
    
    toast({
      title: "Icons generated successfully!",
      description: `Generated ${ICON_SIZES.length} icon sizes`,
    });
  };

  const downloadAll = async () => {
    if (generatedIcons.length === 0) return;

    setIsDownloading(true);
    const zip = new JSZip();
    let processedCount = 0;

    const promises = generatedIcons.map(({ size, canvas }) => 
      new Promise<void>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            zip.file(`icon-${size}x${size}.png`, blob);
            processedCount++;
          }
          resolve();
        }, "image/png");
      })
    );

    await Promise.all(promises);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "pwa-icons.zip");
    setIsDownloading(false);
    
    toast({
      title: "Download complete!",
      description: "All icons have been packaged and downloaded.",
    });
  };

  const downloadSingle = (size: number, canvas: HTMLCanvasElement) => {
    const link = document.createElement("a");
    link.download = `icon-${size}x${size}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    
    toast({
      title: "Icon downloaded",
      description: `${size}x${size} icon saved successfully`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="p-8 backdrop-blur-lg bg-white/70 border-white/20 shadow-xl">
          <UploadZone 
            onFileSelect={handleFileSelect}
            sourceImage={sourceImage}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              onClick={generateIcons}
              disabled={!sourceImage || isGenerating}
              className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white border-0 h-12"
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                {isGenerating ? "Generating Icons..." : "Generate All Icons"}
              </motion.div>
            </Button>
            
            <AnimatePresence>
              {generatedIcons.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Button
                    onClick={downloadAll}
                    disabled={isDownloading}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 h-12 px-6"
                  >
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-5 h-5" />
                      {isDownloading ? "Preparing..." : "Download All ZIP"}
                    </motion.div>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      {/* Required Sizes Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="p-6 backdrop-blur-lg bg-white/50 border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Required PWA Icon Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {ICON_SIZES.map((size) => (
              <span
                key={size}
                className="px-3 py-1 bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 rounded-full text-sm font-medium"
              >
                {size}×{size}
              </span>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Generated Icons */}
      <AnimatePresence>
        {generatedIcons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 backdrop-blur-lg bg-white/70 border-white/20 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Generated Icons</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {generatedIcons.map(({ size, canvas }, index) => (
                  <IconPreview
                    key={size}
                    size={size}
                    canvas={canvas}
                    onDownload={() => downloadSingle(size, canvas)}
                    index={index}
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
