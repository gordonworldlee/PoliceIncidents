import Link from "next/link";

export default function ViolenceModelPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Violence Model Page</h1>
        <br />
        <p>
          <Link className="text-blue-500 underline" href="/violence/incident1">
            Link to Domestic Disturbance in Grainfield, TX
          </Link>
        </p>
        <p>
          <Link className="text-blue-500 underline" href="/violence/incident2">
            Link to Mental Health Check in Austin, TX
          </Link>
        </p>
        <p>
          <Link className="text-blue-500 underline" href="/violence/incident3">
            Link to Violent Crime in Dallas, TX
          </Link>
        </p>
        <br />
        <p>
          <Link className="text-blue-500 underline" href="/">
            Link to go back to the landing page.
          </Link>
        </p>
      </div>
    </div>
  );
}
