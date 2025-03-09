"use client";
import NextLink from "next/link";
import NextImage from "next/image";
import { NavigationMenu } from "radix-ui";
import { collections } from "@/utils";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { throttle } from "lodash-es";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = throttle((e: WheelEvent) => {
      if (e.deltaY > 0 && window.scrollY > 100) {
        ref.current?.classList.add("max-h-0", "opacity-0");
        if (isHome && ref.current) {
          ref.current.dataset.transparent = "false";
        }
      } else {
        ref.current?.classList.remove("max-h-0", "opacity-0");
        if (isHome && ref.current && window.scrollY <= 100) {
          ref.current.dataset.transparent = "true";
        }
      }
    }, 500);
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isHome]);

  return (
    <header
      ref={ref}
      data-transparent={isHome}
      className={clsx(
        "w-full px-10 *:py-6 z-50 text-xs font-semibold top-0 duration-300 group grid grid-cols-3 items-center",
        isHome
          ? "fixed bg-transparent text-background data-[transparent=false]:bg-background data-[transparent=false]:text-foreground hover:bg-background hover:text-foreground border-b"
          : "sticky bg-background"
      )}
    >
      <NavigationMenu.Root className="col-span-full md:col-span-1 order-3 md:order-none place-self-center md:place-self-auto">
        <NavigationMenu.List className="flex-row-center gap-8">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>
              <NextLink href="#" className="uppercase">
                Store
              </NextLink>
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>
              <NextLink href="/collections" className="uppercase">
                Collections
              </NextLink>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="flex gap-4">
              {collections.slice(0, 4).map((collection) => (
                <NextLink
                  key={collection}
                  href={`/collections/${collection}`}
                  className="flex-col-center uppercase gap-4 my-auto"
                >
                  <div className="h-full aspect-square overflow-hidden">
                    <NextImage
                      src="/images/placeholder.jpg"
                      alt={collection}
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  <span>{collection}</span>
                </NextLink>
              ))}
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>
              <NextLink href="#" className="uppercase">
                Blog
              </NextLink>
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
          <NavigationMenu.Indicator className="h-px bg-foreground z-10 transition" />
        </NavigationMenu.List>

        <NavigationMenu.Viewport className="absolute bottom-0 inset-x-0 translate-y-full h-96 flex-center bg-background shadow-lg" />
      </NavigationMenu.Root>
      <div className="block md:hidden"></div>
      <NextLink href="/" className="place-self-center">
        <NextImage
          src="/images/morning_logo_wulkan.png"
          alt="logo"
          width={150}
          height={40}
          className="group-hover:block hidden group-data-[transparent=false]:block"
        />
        {isHome && (
          <NextImage
            src="/images/morning_logo_wulkan_white.png"
            alt="logo"
            width={150}
            height={40}
            className="group-hover:hidden block group-data-[transparent=false]:hidden"
          />
        )}
      </NextLink>
      <div></div>
    </header>
  );
}
