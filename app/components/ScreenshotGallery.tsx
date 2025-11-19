"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

interface ScreenshotGalleryProps {
	images: Array<{
		src: string;
		alt: string;
	}>;
}

export function ScreenshotGallery({ images }: ScreenshotGalleryProps) {
	const [selectedImage, setSelectedImage] = useState<number | null>(null);

	return (
		<>
			<div className="my-12 space-y-8">
				<h2 className="text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">Screenshots</h2>
				<div className="grid gap-6 md:grid-cols-2">
					{images.map((image, index) => (
						<button
							key={index}
							onClick={() => setSelectedImage(index)}
							className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.1)] hover:scale-[1.02] cursor-pointer"
						>
							<div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
								<img
									src={image.src}
									alt={image.alt}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							{image.alt && (
								<div className="p-4 bg-white">
									<p className="text-sm text-gray-600 font-medium text-center">{image.alt}</p>
								</div>
							)}
						</button>
					))}
				</div>
			</div>

			{/* Lightbox Modal */}
			{selectedImage !== null && (
				<div
					className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
					onClick={() => setSelectedImage(null)}
				>
					<button
						onClick={() => setSelectedImage(null)}
						className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
						aria-label="Close"
					>
						<X className="h-6 w-6" />
					</button>
					<div className="max-w-6xl w-full">
						<img
							src={images[selectedImage].src}
							alt={images[selectedImage].alt}
							className="w-full h-auto rounded-2xl shadow-2xl"
							onClick={(e) => e.stopPropagation()}
						/>
						{images[selectedImage].alt && (
							<p className="text-center text-white mt-4 text-lg">{images[selectedImage].alt}</p>
						)}
					</div>
				</div>
			)}
		</>
	);
}

