import type { Metadata } from "next";
import Hypotheses from "./hypotheses";

type Props = {
  searchParams: Promise<{ url: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { url = "https://rainforest.tools/en" } = await searchParams;

  return {
    title: `WebLens | Generated hypotheses for ${url}`,
  };
}

export default async function Page({ searchParams }: Props) {
  const { url = "https://rainforest.tools/en" } = await searchParams;

  return (
    <main className="flex container gap-10">
      <div className="h-screen sticky top-0 flex-1 flex-center">
        <h1 className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-amber-300">
          Review generated hypotheses and convert them into A/B tests
        </h1>
      </div>
      <section className="flex-1 pt-56 pb-40">
        <h2 className="text-purple-300 mb-4">Hypotheses for {url}</h2>
        <Hypotheses url={url} />
      </section>
    </main>
  );
}
