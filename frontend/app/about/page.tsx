import { Suspense } from "react";
import Link from "next/link";
import TeamMemberCard, { TeamMember } from "@/app/components/TeamMemberCard";
import TeamMemberCardSkeleton from "@/app/components/skeleton/TeamMemberCardSkeleton";
import Navbar from "@/app/components/Navbar";
import { fetchUserStats } from "../utils/gitlab";

const teamMembers: Omit<TeamMember, "stats">[] = [
  {
    name: "Gordon Lee",
    username: "gordonworldlee",
    role: "Backend Systems Architecture",
    bio: "Gordon Lee's favorite movies are Black Swan, Virgin Suicides, and Pride and Prejudice",
    photoUrl: "/headshots/gordon.jpeg",
    gitlabUrl: "https://gitlab.com/gordonworldlee",
  },
  {
    name: "Gabriel Keller",
    username: "gjkeller",
    role: "Full Stack",
    bio: "I'm a sophomore in CS and contributed to planning out the frontend, backend, and internal tooling used to organize the team and connect the project. I'm currently freelancing for multiple Austin startups, and in my free time, I like to play guitar and brush up on my Japanese.",
    photoUrl: "/headshots/gabriel.jpeg",
    gitlabUrl: "https://gitlab.com/gjkeller",
  },
  {
    name: "Andres Osornio",
    username: "andyo1",
    role: "Frontend",
    bio: "Hi, I’m a junior in CS and my main contributions were on the frontend of this website. In my free time, I like to go to the gym, watch soccer, and watch movies.",
    photoUrl: "/headshots/andy.jpeg",
    gitlabUrl: "https://gitlab.com/andyo1",
  },
  {
    name: "Hari Shankar",
    username: "harishankar5",
    role: "Full Stack",
    bio: "Hi! I'm a sophomore in CS and contributed to both the frontend and backend of this website. Outside of academics, I enjoy reading and biking.",
    photoUrl: "/headshots/hari.jpeg",
    gitlabUrl: "https://gitlab.com/harishankar5",
  },
  {
    name: "Long Phan",
    username: "longphan084",
    role: "Frontend",
    bio: "Hi, I'm a junior in CS and I mainly worked on the frontend of the website. Outside of school, I enjoy going to gym and watching basketball.",
    photoUrl: "/headshots/long.jpeg",
    gitlabUrl: "https://gitlab.com/longphan084",
  },
];

async function TeamMemberWithStats({
  member,
}: {
  member: Omit<TeamMember, "stats">;
}) {
  const stats = await fetchUserStats(member.username, member.name);
  const updatedMember: TeamMember = {
    ...member,
    stats: stats,
  };

  return <TeamMemberCard member={updatedMember} />;
}

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            About JusticeWatch
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700 mb-4">
              JusticeWatch is a civic engagement platform that visualizes Texas
              police brutality hotspots and tracks related legislation,
              misconduct cases, and police department accountability.
            </p>
            <p className="text-gray-700">
              Repository:{" "}
              <a
                href="https://gitlab.com/gjkeller/cs373-spring-2025-group-07"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitLab Repository
              </a>
            </p>
            <p className="text-gray-700">
              Repository:{" "}
              <a
                href="https://documenter.getpostman.com/view/42447157/2sAYdZtYvV#intro07"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Documentation (Postman)
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Data Sources</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-2">
                  <a
                    href="https://mappingpoliceviolence.us/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Mapping Police Violence Dataset
                  </a>
                </h3>
                <p className="text-gray-700">
                  CSV dataset for police killings and misconduct incidents
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-2">
                  <a
                    href="https://www.ncsl.org/civil-and-criminal-justice/policing-legislation-databaseas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    National Conference of State Legislatures (NCSL) Policing
                    Legislation Database
                  </a>
                </h3>
                <p className="text-gray-700">
                  Database tracking policing-related legislation
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-2">
                  <a
                    href="https://policescorecard.docs.apiary.io/#reference/scorecard/state/get-summary-for-a-single-state"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Police Scorecard API
                  </a>
                </h3>
                <p className="text-gray-700">
                  RESTful API for department performance data
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Suspense
                  key={member.username}
                  fallback={<TeamMemberCardSkeleton />}
                >
                  <TeamMemberWithStats member={member} />
                </Suspense>
              ))}
            </div>
          </section>

          <div className="text-center mt-8">
            <Link className="text-blue-500 hover:underline" href="/">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
