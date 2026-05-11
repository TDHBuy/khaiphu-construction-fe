import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function AboutTeaser() {

  return (
    <section className="bg-neutral-50 py-24 lg:py-32">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image — 7 cols */}
          <RevealOnScroll direction="right" className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-[3/2]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80')",
                }}
              />
              {/* Yellow accent corner */}
              <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 bg-accent-500 lg:block" />
            </div>
          </RevealOnScroll>

          {/* Content — 5 cols */}
          <RevealOnScroll
            direction="left"
            className="lg:col-span-5 lg:flex lg:items-center"
          >
            <div>
              <p className="section-number mb-4">06</p>
          
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
