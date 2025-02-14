import Link from "next/link";

export default function ViolenceModelPage() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Violence Model Page</h1>
          <br />
          <p>
            <Link className="text-blue-500 underline" href="/violence/killchild">
              Link to Police kill a child violence Instance
            </Link>
          </p>
          <p>
            <Link className="text-blue-500 underline" href="/violence/stabmom">
              Link to Police stab a person violence Instance
            </Link>
          </p>
          <p>
            <Link className="text-blue-500 underline" href="/violence/hitwoman">
            Link to Police hit a woman violence Instance
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
  