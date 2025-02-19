export default function TeamMemberCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex flex-col items-center">
        {/* Photo placeholder */}
        <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
          <div
            className="absolute inset-0 bg-gray-200 animate-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)",
              backgroundSize: "700px 100%",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Name placeholder */}
        <div className="relative w-48 h-6 mb-2 rounded overflow-hidden">
          <div
            className="absolute inset-0 bg-gray-200 animate-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)",
              backgroundSize: "700px 100%",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Username placeholder */}
        <div className="relative w-32 h-4 mb-2 rounded overflow-hidden">
          <div
            className="absolute inset-0 bg-gray-200 animate-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)",
              backgroundSize: "700px 100%",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Role placeholder */}
        <div className="relative w-40 h-4 mb-2 rounded overflow-hidden">
          <div
            className="absolute inset-0 bg-gray-200 animate-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)",
              backgroundSize: "700px 100%",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Bio placeholder */}
        <div className="relative w-full h-16 mb-4 rounded overflow-hidden">
          <div
            className="absolute inset-0 bg-gray-200 animate-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)",
              backgroundSize: "700px 100%",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Stats grid placeholder */}
        <div className="w-full grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative h-16 rounded overflow-hidden">
              <div
                className="absolute inset-0 bg-gray-200 animate-shimmer"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)",
                  backgroundSize: "700px 100%",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
