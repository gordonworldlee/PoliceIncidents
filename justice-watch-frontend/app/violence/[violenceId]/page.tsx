import Link from "next/link";

interface ViolenceInstance {
  id: string;
  city: string;
  state: string;
  encounter_type: string;
  agency_responsible: string;
  date: string;
}

interface ViolencePageProps {
  params: {
    violenceId: string;
  };
}

export default function ViolenceInstancePage({ params }: ViolencePageProps) {
  const { violenceId } = params;

  // This is a mock data structure. In a real application, you'd fetch this data from an API or database
  const violenceInstances: Record<string, ViolenceInstance> = {
    incident1: {
      id: "incident1",
      city: "Grainfield",
      state: "TX",
      encounter_type: "Domestic Disturbance",
      agency_responsible: "Gove County Sheriff's Office",
      date: "1/31/25"
    },
    incident2: {
      id: "incident2",
      city: "Austin",
      state: "TX",
      encounter_type: "Mental Health/Welfare Check",
      agency_responsible: "Austin Police Department",
      date: "2/15/25"
    },
    incident3: {
      id: "incident3",
      city: "Dallas",
      state: "TX",
      encounter_type: "Violent Crime",
      agency_responsible: "Dallas Police Department",
      date: "3/1/25"
    }
  };

  const instance = violenceInstances[violenceId];

  if (!instance) {
    return <div>Instance not found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Violence Instance Page</h1>
        <br />
        <p>This page is about the {instance.id} instance of violence.</p>
        <br />
        <div className="text-left">
          <p><strong>City:</strong> {instance.city}</p>
          <p><strong>State:</strong> {instance.state}</p>
          <p><strong>Encounter Type:</strong> {instance.encounter_type}</p>
          <p><strong>Agency Responsible:</strong> {instance.agency_responsible}</p>
          <p><strong>Date:</strong> {instance.date}</p>
        </div>
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
