"use client";

export default function GlobalError({
  error, // You can keep it for debugging purposes
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Optional: log the error for debugging
  console.error(error);

  return (
    // global-error must include html and body tags
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">{error?.message}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
