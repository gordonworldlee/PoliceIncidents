// components/ExampleCard.tsx
import Image from "next/image";
import Link from "next/link";

interface ExampleCardProps {
  item: {
    title: string;
    path: string;
    imageUrl?: string;
    type?: "department" | "legislation" | "violence";
  };
}

export default function ExampleCard({ item }: ExampleCardProps) {
  const typeLabels = {
    department: "AGENCY",
    legislation: "LEGISLATION",
    violence: "INCIDENT",
  };

  console.log(item.imageUrl);

  return (
    <Link href={item.path}>
      <div className="bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors overflow-hidden flex flex-col h-full">
        {/* Image */}
        <div className="relative w-full pt-[56.25%]">
          <Image
            src={item.imageUrl || "/api/placeholder/400/225"}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 250px"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-sm text-gray-600">
              {item.type ? typeLabels[item.type] : "EXAMPLE"}
            </span>
            <span className="text-xs text-gray-500">sample</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
