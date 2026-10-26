import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

const SCREENSHOTS = [
  {
    id: 1,
    path: '/assets/screenshot1.png',
  },
  {
    id: 2,
    path: '/assets/screenshot2.png',
  },
  {
    id: 3,
    path: '/assets/screenshot3.png',
  },
  {
    id: 4,
    path: '/assets/screenshot4.png',
  },
  {
    id: 5,
    path: '/assets/screenshot5.png',
  },
  {
    id: 6,
    path: '/assets/screenshot6.png',
  },
  {
    id: 7,
    path: '/assets/screenshot7.png',
  },
];

export default function ScreenshotGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
      }
    }
  };

  const scrollByAmount = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  const nextLightbox = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => ((prev! + 1) % SCREENSHOTS.length));
    }
  }, [activeLightboxIndex]);

  const prevLightbox = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => ((prev! - 1 + SCREENSHOTS.length) % SCREENSHOTS.length));
    }
  }, [activeLightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, closeLightbox, nextLightbox, prevLightbox]);

  return (
    <section id="screenshots" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Pratinjau Aplikasi
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollByAmount(-320)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-amber-600 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs"
              aria-label="Geser ke tangkapan layar sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(320)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-amber-600 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs"
              aria-label="Geser ke tangkapan layar berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Screenshots Gallery */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 focus:outline-hidden"
          tabIndex={0}
          aria-label="Daftar 7 tangkapan layar aplikasi KASIR DUNIA"
        >
          {SCREENSHOTS.map((sc, index) => (
            <div
              key={sc.id}
              className="shrink-0 w-64 sm:w-72 snap-start group bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:shadow-md hover:border-amber-300"
            >
              {/* Image Frame with Aspect 9:16 */}
              <div
                className="relative aspect-9/16 w-full bg-slate-900 cursor-pointer overflow-hidden"
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Perbesar pratinjau aplikasi ${sc.id}`}
              >
                <img
                  src={sc.path}
                  alt={`Pratinjau antarmuka KASIR DUNIA ${sc.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.5';
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 backdrop-blur-xs">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Perbesar
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Scroll Progress Indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {SCREENSHOTS.map((sc, i) => {
            const isActive = Math.round(scrollProgress * (SCREENSHOTS.length - 1)) === i;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const scrollTarget = (scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth) * (i / (SCREENSHOTS.length - 1));
                    scrollContainerRef.current.scrollTo({ left: scrollTarget, behavior: 'smooth' });
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  isActive ? 'w-6 bg-amber-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Pindah ke tangkapan layar ${i + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Accessible Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau Tangkapan Layar Aplikasi"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-1">
              <div className="text-sm font-medium text-slate-200">
                {activeLightboxIndex + 1} / {SCREENSHOTS.length}
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Tutup pratinjau"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Image Viewport */}
            <div className="relative w-full aspect-9/16 max-h-[78vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex items-center justify-center">
              <img
                src={SCREENSHOTS[activeLightboxIndex].path}
                alt={`Pratinjau antarmuka KASIR DUNIA ${activeLightboxIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next overlays */}
              <button
                type="button"
                onClick={prevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 text-white hover:bg-amber-600 transition-colors shadow-md"
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={nextLightbox}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 text-white hover:bg-amber-600 transition-colors shadow-md"
                aria-label="Gambar berikutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
