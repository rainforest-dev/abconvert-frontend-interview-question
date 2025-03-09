import { collections } from "@/utils";
import NextImage from "next/image";
import { Tabs } from "radix-ui";
import CollectionTabContent from "./CollectionTabContent";

export default function Home() {
  const topCollections = collections.slice(0, 3);
  return (
    <main className="pb-32">
      <section className="w-full h-screen flex flex-col justify-center items-start px-10 z-0">
        <NextImage
          src="/images/placeholder.jpg"
          alt="hero image"
          fill
          className="object-cover brightness-75"
        />
        <div className="text-background flex flex-col gap-2 z-10 md:max-w-[40%]">
          <h1 className="text-5xl w-fit">Less but better</h1>
          <hr className="divider" />
          <p className="text-lg">
            Discover the art of minimalism. Choose quality over quantity and
            experience the joy of owning fewer, but truly special items. Our
            curated collection is designed to enhance your life with thoughtful,
            functional pieces that stand the test of time. Embrace simplicity
            and elevate your lifestyle with us.
          </p>
          <div className="flex gap-2">
            <button className="btn btn-outline">Shop All</button>
            <button className="btn btn-primary">Shop Now</button>
          </div>
        </div>
      </section>
      <section className="flex-col-center">
        <h1 className="text-xl font-bold">Collections</h1>
        <hr className="divider mt-3 mb-5" />
        <Tabs.Root defaultValue={topCollections[0]}>
          <Tabs.List className="flex-center gap-5 mb-10 text-sm">
            {topCollections.map((collection) => (
              <Tabs.Trigger
                key={collection}
                value={collection}
                className="text-foreground/70 data-[state=active]:text-foreground data-[state=active]:after:scale-100 underline-decorator"
              >
                {collection}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {topCollections.map((collection) => (
            <Tabs.Content key={collection} value={collection} className="h-96">
              <CollectionTabContent collection={collection} />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </section>
    </main>
  );
}
