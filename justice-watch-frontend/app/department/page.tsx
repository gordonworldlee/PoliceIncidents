import Link from "next/link";

export default function DepartmentModelPage() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Department Model Page</h1>
          <br />
          <p>
            <Link className="text-blue-500 underline" href="/department/cady">
              Link to Cady Police Department Scorecard
            </Link>
          </p>
          <p>
            <Link className="text-blue-500 underline" href="/department/frisco">
              Link to Frisco Police Department Scorecard
            </Link>
          </p>
          <p>
            <Link className="text-blue-500 underline" href="/department/plano">
              Link to Plano Police Department Scorecard
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
  