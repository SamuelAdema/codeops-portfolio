export default function ConfigDemoPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "Site URL not configured";

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Application Configuration
      </h1>
      <p className="mt-4">
        Configured public site URL: {siteUrl}
      </p>
    </main>
  );
}