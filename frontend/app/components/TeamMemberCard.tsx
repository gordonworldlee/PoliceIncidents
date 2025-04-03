import Image from "next/image";
import Link from "next/link";
import { GitLabStats } from "@/app/utils/gitlab";
import "react-loading-skeleton/dist/skeleton.css";

export interface TeamMember {
  name: string;
  gitLabName?: string;
  username: string;
  role: string;
  bio: string;
  photoUrl: string;
  gitlabUrl: string;
  stats: GitLabStats;
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col h-full">
      <div className="flex flex-col items-center flex-grow">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={member.photoUrl}
            alt={member.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <Link
          href={member.gitlabUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold text-blue-600 hover:underline mb-2"
        >
          {member.name}
        </Link>

        <p className="text-gray-600 mb-2">@{member.username}</p>
        <p className="text-gray-700 font-medium mb-2">{member.role}</p>
        <p className="text-gray-600 text-sm text-center mb-4">{member.bio}</p>
      </div>

      <div className="w-full mt-auto">
        {member.stats.error ? (
          <div className="w-full p-4 bg-red-50 text-red-600 rounded text-center">
            {member.stats.error}
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded text-center">
              <p className="font-semibold">Commits</p>
              <p className="text-gray-700">{member.stats.commits}</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded text-center">
                <p className="font-semibold">Open Issues</p>
                <p className="text-gray-700">{member.stats.openIssues}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <p className="font-semibold">Closed Issues</p>
                <p className="text-gray-700">{member.stats.closedIssues}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
