import Link from "next/link";
const Card = ({title, link}) => {
  return (
    <Link href={link}>
      <div className="h-30 p-6 border-2 transition-all text-center duration-300 hover:shadow-xl hover:translate-y-[-2px] rounded-lg shadow-lg flex items-center justify-center">
        <h2 className="text-xl font-bold text-blue-600">{title}</h2>
      </div>
    </Link>
  )
}

export default function DepartmentModelPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Department Model Page</h1>
          <br />
          <div className="flex flex-col md:flex-row gap-4 m-">
            <Card title="Dallas Police Department Scorecard" link="/department/dallas" />
            <Card title="Houston Police Department Scorecard" link="/department/houston" />
            <Card title="Austin Police Department Scorecard" link="/department/austin" />
         </div>
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
  