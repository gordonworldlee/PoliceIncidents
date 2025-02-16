import Link from "next/link";

interface ViolenceInstance {
  id: string;
  perpetrator: string;
  victim: string;
  action: string;
  date: string;
  location: string;
  details: string;
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
    killchild: {
      id: "killchild",
      perpetrator: "Police Officer",
      victim: "Child",
      action: "Kill",
      date: "2025-02-15",
      location: "City A",
      details: "Detailed description of the incident involving a child"
    },
    stabmom: {
      id: "stabmom",
      perpetrator: "Police Officer",
      victim: "Mother",
      action: "Stab",
      date: "2025-02-14",
      location: "City B",
      details: "Detailed description of the incident involving a mother"
    },
    hitwoman: {
      id: "hitwoman",
      perpetrator: "Police Officer",
      victim: "Woman",
      action: "Hit",
      date: "2025-02-13",
      location: "City C",
      details: "Detailed description of the incident involving a woman"
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
          <p><strong>Perpetrator:</strong> {instance.perpetrator}</p>
          <p><strong>Victim:</strong> {instance.victim}</p>
          <p><strong>Action:</strong> {instance.action}</p>
          <p><strong>Date:</strong> {instance.date}</p>
          <p><strong>Location:</strong> {instance.location}</p>
          <p><strong>Details:</strong> {instance.details}</p>
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
