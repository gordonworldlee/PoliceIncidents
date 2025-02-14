import Link from "next/link";

interface ViolencePageProps {
    params: {
      violenceId: string;
    };
  }
  
  export default function ViolanceInstancePage({ params }: ViolencePageProps) {
    const { violenceId } = params;
  
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Violence Instance Page</h1>
          <br />
          <p>This page is about the {violenceId} instance of violence.</p>
          <br />
          <p>
            <Link className="text-blue-500 underline" href="/violence">
              Link to go back to the violence model page.
            </Link>
          </p>
        </div>
      </div>
    );
  }
  