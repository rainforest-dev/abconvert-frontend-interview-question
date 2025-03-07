"use client";
import NextLink from "next/link";
import NextImage from "next/image";
import { NavigationMenu } from "radix-ui";
import { collections } from "@/utils";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <NavigationMenu.Root
      className={clsx(
        "w-full py-6 px-10 group",
        isHome
          ? "fixed bg-transparent text-background hover:bg-background hover:text-foreground border-b"
          : "bg-background"
      )}
    >
      <NavigationMenu.List className="flex-row-center">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            <NextLink href="/collections" className="uppercase">
              Collections
            </NextLink>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="flex gap-4" data-state="open">
            {collections.slice(0, 4).map((collection) => (
              <NextLink
                key={collection}
                href={`/collections/${collection.toLowerCase()}`}
                className="flex-col-center uppercase gap-4 my-auto"
              >
                <div className="h-full aspect-square overflow-hidden">
                  <NextImage
                    src="/images/placeholder.jpg"
                    alt={collection}
                    width={300}
                    height={300}
                    objectFit="cover"
                  />
                </div>
                <span>{collection}</span>
              </NextLink>
            ))}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="absolute left-1/2 -translate-x-1/2">
          <NavigationMenu.Link asChild>
            <NextLink href="/">
              <NextImage
                src="/images/morning_logo_wulkan.png"
                alt="logo"
                width={150}
                height={40}
                className={isHome ? "group-hover:block hidden" : ""}
              />
              {isHome && (
                <NextImage
                  src="/images/morning_logo_wulkan_white.png"
                  alt="logo"
                  width={150}
                  height={40}
                  className="block group-hover:hidden"
                />
              )}
            </NextLink>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Viewport className="absolute bottom-0 inset-x-0 translate-y-full border h-96 flex-center bg-background" />
    </NavigationMenu.Root>
  );
}
