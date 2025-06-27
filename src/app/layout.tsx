import ReactQueryProvider from "@/components/ReactQueryProvider";
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
        <ReactQueryProvider>
          <StoreProvider>
            <div className="max-w-4xl mx-auto p-6">
              <SearchBar />
              {children}
            </div>
          </StoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
