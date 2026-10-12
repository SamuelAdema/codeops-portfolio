export const metadata = {
  title: {
    template: "%s · Addis Eats",
    default: "Addis Eats — Ethiopian food delivery in Addis Ababa"
  },
  description: "Discover Ethiopian dishes from kitchens across Addis Ababa.",
  metadataBase: new URL("https://addiseats.et")
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}