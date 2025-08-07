"use client";

import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/lib/config";
import { FlippingCard } from "@/components/ui/flipping-card";

const BentoSection = () => {
  const { title, description, items } = siteConfig.bentoSection;

  return (
    <section
      id="bento"
      className="flex flex-col items-center justify-center w-full relative px-6 md:px-12 lg:px-20 py-20 border-t border-border"
    >
      <div className="w-full relative">
        <div className="absolute top-0 -left-4 md:-left-14 h-full w-4 md:w-14 text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>
        <div className="absolute top-0 -right-4 md:-right-14 h-full w-4 md:w-14 text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>

        <SectionHeader>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance pb-1">
            {title}
          </h2>
          <p className="text-muted-foreground text-center text-balance font-medium">
            {description}
          </p>
        </SectionHeader>

        {/* FlippingCard Demo */}
        <div className="flex justify-center mb-8">
          <FlippingCard
            frontContent={
              <div className="flex flex-col items-center justify-center h-full p-6">
                <h3 className="text-xl font-bold mb-2">Try the Flip Effect!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hover to see the 3D flip animation</p>
              </div>
            }
            backContent={
              <div className="flex flex-col items-center justify-center h-full p-6">
                <h3 className="text-xl font-bold mb-2">Amazing!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">This is the 3D flip card effect in action</p>
              </div>
            }
            height={150}
            width={250}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start justify-end min-h-[600px] md:min-h-[500px] p-0.5 relative before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] group cursor-pointer max-h-[400px] group"
            >
              <div className="relative flex size-full items-center justify-center h-full overflow-hidden">
                {item.content}
              </div>
              <div className="flex-1 flex-col gap-2 p-6">
                <h3 className="text-lg tracking-tighter font-semibold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BentoSection;