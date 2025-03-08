export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ url: string }>;
}) {
  const { url } = await searchParams;

  return <main className="h-full flex-center">{url}</main>;
}
