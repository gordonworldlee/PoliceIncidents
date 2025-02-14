import Link from "next/link";

export default function LegislationModelPage() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Legislation Model Page</h1>
          <br />
          <p>
            <Link className="text-blue-500 underline" href="/legislation/gunshot">
              Link to Gunshot Legislation Instance
            </Link>
          </p>
          <p>
            <Link className="text-blue-500 underline" href="/legislation/bodycam">
              Link to Bodycam Legislation Instance
            </Link>
          </p>
          <p>
            <Link className="text-blue-500 underline" href="/legislation/knife">
            Link to Knife Legislation Instance
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
  