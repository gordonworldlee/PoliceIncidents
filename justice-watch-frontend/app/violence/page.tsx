import Link from "next/link";

export default function ViolenceModelPage() {
  const incidents = [
    { href: "/violence/incident1", title: "Domestic Disturbance in Grainfield, TX" },
    { href: "/violence/incident2", title: "Mental Health Check in Austin, TX" },
    { href: "/violence/incident3", title: "Violent Crime in Dallas, TX" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Violence Model Page</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {incidents.map((incident, index) => (
            <Link key={index} href={incident.href} className="block">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-lg font-semibold text-blue-600">{incident.title}</h2>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to the landing page
          </Link>
        </div>
      </div>
    </div>
  );
}
