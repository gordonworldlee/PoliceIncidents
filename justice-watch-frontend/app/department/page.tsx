import Link from "next/link";

export default function DepartmentModelPage() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Department Model Page</h1>
          <br />
          <p>
            <Link className="text-blue-500 underline" href="/department/dallas">
              Link to Dallas Police Department Scorecard
            </Link>
          </p>
          <p>
            <Link className="text-blue-500 underline" href="/department/houston">
              Link to Houston Police Department Scorecard
            </Link>
          </p>
          <p>
            <Link className="text-blue-500 underline" href="/department/austin">
              Link to Austin Police Department Scorecard
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
  