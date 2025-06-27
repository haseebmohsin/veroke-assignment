import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 – Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        Sorry, we could&apos;t find that page.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Home
      </Link>
    </main>
  );
}
