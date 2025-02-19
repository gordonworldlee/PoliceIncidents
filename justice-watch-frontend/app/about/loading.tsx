export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
        <p className="mt-4 text-gray-600 animate-pulse">
          Loading team information...
        </p>
      </div>
    </div>
  );
}
