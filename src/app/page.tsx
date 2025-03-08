import NextImage from "next/image";

export default function Home() {
  return (
    <main>
      <section className="w-full h-screen flex flex-col justify-center items-start px-10 z-0">
        <NextImage
          src="/images/placeholder.jpg"
          alt="hero image"
          fill
          className="object-cover brightness-75"
        />
        <div className="text-background flex flex-col gap-2 z-10">
          <h1 className="text-5xl w-fit">Less but better</h1>
          <hr className="divider" />
          <p className="max-w-[33%] text-lg">
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
    </main>
  );
}
