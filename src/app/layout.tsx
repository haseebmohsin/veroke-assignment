import StoreProvider from "@/components/StoreProvider";
import SearchBar from "@/components/Searchbar";
import "./global.css";

export const metadata = { title: "Stock Tracker" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="max-w-4xl mx-auto p-6">
            <SearchBar />
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
