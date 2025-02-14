import Link from "next/link";

interface LegislationInstancePageProps {
    params: {
        legislationId: string;
    };
  }
  
  export default function LegislationInstancePage({ params }: LegislationInstancePageProps) {
    const { legislationId } = params;
  
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Legislation Instance Page</h1>
            <br />
            <p>This page is about the {legislationId} instance of violence.</p>
            <br />
            <p>
              <Link className="text-blue-500 underline" href="/legislation">
                Link to go back to the violence model page.
              </Link>
            </p>
          </div>
        </div>
      );
  }
  