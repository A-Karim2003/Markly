"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselContextValue = {
  viewportRef: React.RefObject<HTMLDivElement | null>;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  updateScrollBounds: () => void;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("Carousel components must be used within a Carousel");
  }

  return context;
}

function Carousel({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const updateScrollBounds = React.useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const { scrollLeft, scrollWidth, clientWidth } = viewport;
    const maxScrollLeft = scrollWidth - clientWidth;
    const nextCanScrollPrev = scrollLeft > 1;
    const nextCanScrollNext = scrollLeft < maxScrollLeft - 1;

    setCanScrollPrev(nextCanScrollPrev);
    setCanScrollNext(nextCanScrollNext);
  }, []);

  const scrollToIndex = React.useCallback((index: number) => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const slide = viewport.children.item(index) as HTMLElement | null;

    slide?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, []);

  const scrollPrev = React.useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const currentIndex = Math.round(viewport.scrollLeft / viewport.clientWidth);
    scrollToIndex(Math.max(0, currentIndex - 1));
  }, []);

  const scrollNext = React.useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const currentIndex = Math.round(viewport.scrollLeft / viewport.clientWidth);
    scrollToIndex(currentIndex + 1);
  }, [scrollToIndex]);

  return (
    <CarouselContext.Provider
      value={{
        viewportRef,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        updateScrollBounds,
      }}
    >
      <div className={cn("relative w-full min-w-0", className)} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { viewportRef, updateScrollBounds } = useCarousel();

  React.useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const handleScroll = () => {
      updateScrollBounds();
    };

    updateScrollBounds();
    viewport.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new ResizeObserver(() => {
      updateScrollBounds();
    });

    observer.observe(viewport);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [updateScrollBounds, viewportRef]);

  return (
    <div
      ref={viewportRef}
      className={cn(
        "flex w-full min-w-0 overflow-x-auto scroll-smooth overscroll-x-contain snap-x snap-mandatory no-scrollbar",
        className,
      )}
      {...props}
    />
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full snap-start", className)}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  if (!canScrollPrev) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      className={cn(
        "absolute left-3 top-1/2 z-10 h-9 w-9 -translate-y-1/2 rounded-full shadow-md",
        className,
      )}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext } = useCarousel();

  if (!canScrollNext) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      className={cn(
        "absolute right-3 top-1/2 z-10 h-9 w-9 -translate-y-1/2 rounded-full shadow-md",
        className,
      )}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
};
