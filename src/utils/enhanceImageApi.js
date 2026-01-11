const enhancedImageAPI = async (file, options = {}) => {
  const {
    sharpness = 0, // 0 to 10 (0 = off, 10 = max)
    brightness = 100, // 0 to 200
    contrast = 100, // 0 to 200
    saturation = 100, // 0 to 200
    resolution = "original", // original, 2x, 4k, 8k
  } = options;

  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Determine target dimensions
          let targetWidth = img.width;
          let targetHeight = img.height;

          if (resolution === "2x") {
            targetWidth = img.width * 2;
            targetHeight = img.height * 2;
          } else if (resolution === "4k") {
            // 4K UHD usually 3840 x 2160
            const ratio = Math.min(3840 / img.width, 2160 / img.height);
            // Only upscale if image is smaller, or scale to fit? 
            // Usually users want to force upscale to 4K size roughly.
            // Let's strictly scale to fit within the box, maximizing size.
            // If image is portrait, we might hit height first.
            targetWidth = img.width * ratio;
            targetHeight = img.height * ratio;
            // If image is small, we force upscale to the max dimension.
            // Actually for "Enhancing" we usually want to at least match the major dimension if possible.
            // Let's use simple logic: max side length = 3840 (landscape) or 2160 (if constrained)
            // Easier: Fits inside 3840x2160.
          } else if (resolution === "8k") {
            // 8K UHD usually 7680 x 4320
            const ratio = Math.min(7680 / img.width, 4320 / img.height);
            targetWidth = img.width * ratio;
            targetHeight = img.height * ratio;
          }

          canvas.width = Math.round(targetWidth);
          canvas.height = Math.round(targetHeight);

          // Better scaling/interpolation settings
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // filters: Brightness, Contrast, Saturation
          ctx.filter = `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturation}%)`;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          if (sharpness > 0) {
            // Get image data for pixel manipulation (Sharpening)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const width = canvas.width;
            const height = canvas.height;

            // Dynamic Sharpen Kernel based on sharpness value
            // High sharpness = higher center value, lower surrounding negative values
            // We'll just mix the sharpened result with original based on 'sharpness' if we were fancy,
            // but here let's just scale the kernel effect.
            // Standard sharp is:
            //  0 -1  0
            // -1  5 -1
            //  0 -1  0
            // let's use a factor 'f' = sharpness * 0.1?
            // Validation: sharpness 0..10.

            const mix = sharpness / 10; // 0.0 to 1.0
            // A safe kernel logic:
            // weights: -mix
            // center: 1 + 4*mix

            const w = -mix;
            const c = 1 + 4 * mix;

            const kernel = [0, w, 0, w, c, w, 0, w, 0];
            const side = Math.round(Math.sqrt(kernel.length));
            const halfSide = Math.floor(side / 2);

            const outputData = new Uint8ClampedArray(data.length);

            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0;

                for (let ky = 0; ky < side; ky++) {
                  for (let kx = 0; kx < side; kx++) {
                    const cY = y + ky - halfSide;
                    const cX = x + kx - halfSide;

                    if (cY >= 0 && cY < height && cX >= 0 && cX < width) {
                      const offset = (cY * width + cX) * 4;
                      const weight = kernel[ky * side + kx];

                      r += data[offset] * weight;
                      g += data[offset + 1] * weight;
                      b += data[offset + 2] * weight;
                    }
                  }
                }

                const pixelOffset = (y * width + x) * 4;
                outputData[pixelOffset] = r;
                outputData[pixelOffset + 1] = g;
                outputData[pixelOffset + 2] = b;
                outputData[pixelOffset + 3] = data[pixelOffset + 3]; // Alpha
              }
            }

            // Apply sharpened data back
            const finalImageData = new ImageData(outputData, width, height);
            ctx.putImageData(finalImageData, 0, 0);
          }

          // Resolve with data URL
          const enhancedUrl = canvas.toDataURL("image/jpeg", 0.95);

          // Return format matching previous API response structure for compatibility
          resolve({
            image: enhancedUrl,
          });
        };

        img.onerror = (err) => {
          reject(new Error("Failed to load image for processing"));
        };
      };

      reader.onerror = (err) => {
        reject(new Error("Failed to read file"));
      };

    } catch (error) {
      console.error("Error enhancing image:", error);
      reject(error);
    }
  });
};

export { enhancedImageAPI };
