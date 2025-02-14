import Link from "next/link";

interface DepartmentPageProps {
    params: {
      departmentId: string;
    };
  }
  
  export default function DepartmentPage({ params }: DepartmentPageProps) {
    const { departmentId } = params;
  
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Department Instance Page</h1>
          <br />
          <p>This page is about the {departmentId} instance of department.</p>
          <br />
          <p>
            <Link className="text-blue-500 underline" href="/department">
              Link to go back to the department model page.
            </Link>
          </p>
        </div>
      </div>
    );
  }
  