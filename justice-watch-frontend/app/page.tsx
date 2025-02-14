import Link from "next/link";

export default function Home() {
  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Landing Page</h1>
          <br />
          <p>
            <Link className="text-blue-500 underline" href="/violence">
              Link to Violence Model Page
            </Link>
          </p>
          <p>
            <Link className="text-blue-500 underline" href="/legislation">
              Link to Legislation Model Page
            </Link>
          </p>
          <p>
            <Link className="text-blue-500 underline" href="/department">
              Link to Department Model Page
            </Link>
          </p>
          <br />
          <p>
            <Link className="text-blue-500 underline" href="/about">
              Link to About Page
            </Link>
          </p>
        </div>
      </div>
  );
}
