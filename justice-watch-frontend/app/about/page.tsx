import Link from "next/link";

export default function AboutPage() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">About Page</h1>
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
  