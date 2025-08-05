"use client";

import { Icons } from "@/components/icons";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useMediaQuery } from "@/hooks/use-media-query";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

const FooterSection = () => {
  const tablet = useMediaQuery("(max-width: 1024px)");

  return (
    <footer id="footer" className="w-full pb-0">
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <Link href="/" className="flex items-center gap-2 justify-center">
          <p className="text-xl font-semibold text-primary">FlipTech Pro</p>
        </Link>

        <p className="tracking-tight text-muted-foreground font-medium mt-4 max-w-xl">
          Deploy specialized AI teams across marketing, operations, product, research, and support.
          Each team works seamlessly together, handling complex tasks so your human teams can focus on strategic initiatives.
        </p>

        <div className="flex items-center justify-center gap-2 mt-6 dark:hidden">
          <Icons.soc2 className="size-12" />
          <Icons.hipaa className="size-12" />
          <Icons.gdpr className="size-12" />
        </div>

        <div className="dark:flex items-center justify-center gap-2 hidden mt-6">
          <Icons.soc2Dark className="size-12" />
          <Icons.hipaaDark className="size-12" />
          <Icons.gdprDark className="size-12" />
        </div>
        <p className="text-sm font-medium text-muted-foreground mt-2">© 2025 FlipTech Pro. All rights reserved.</p>
        <Link
          href="/privacy-policy"
          className="text-sm font-medium text-muted-foreground mt-6 hover:underline"
        >
          Privacy Policy
        </Link>
      </div>

      <div className="w-full h-48 md:h-64 relative mt-24 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background z-10 from-40%" />
        <div className="absolute inset-0 mx-6">
          <FlickeringGrid
            text={tablet ? "FlipTech Pro" : "Streamline your workflow"}
            fontSize={tablet ? 70 : 90}
            className="h-full w-full"
            squareSize={2}
            gridGap={tablet ? 2 : 3}
            color="#6B7280"
            maxOpacity={0.3}
            flickerChance={0.1}
          />
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;