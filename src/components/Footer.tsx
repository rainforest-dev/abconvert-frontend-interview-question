import NextLink from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground flex flex-col">
      <section className="container pt-40 pb-10">
        <div>
          <h3 className="text-sm font-bold mb-6">Browse</h3>
          <ul className="space-y-4 text-xs">
            <li>
              <NextLink href="/collections/all">All products</NextLink>
            </li>
            <li>
              <NextLink href="/weblens">WebLens</NextLink>
            </li>
          </ul>
        </div>
      </section>
      <hr className="w-full border" />
      <div className="flex-row-center text-xs justify-between py-6 container">
        <div></div>
        <span>&copy; 2025, Venue Theme Morning.</span>
      </div>
    </footer>
  );
}
