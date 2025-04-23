// components/HistoryCard.tsx
import Image from "next/image";
import Link from "next/link";
import { HistoryItem } from "../services/historyService";

interface HistoryCardProps {
  item: HistoryItem;
}

export default function HistoryCard({ item }: HistoryCardProps) {
  // Type labels for display
  const typeLabels = {
    'department': 'AGENCY',
    'legislation': 'LEGISLATION',
    'violence': 'INCIDENT'
  };
  
  // Format the date to show how long ago this was viewed
  const formatTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'just now';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Link href={item.path}>
      <div className="bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors overflow-hidden flex flex-col h-full">
        {/* Image container with fixed aspect ratio */}
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
        
        {/* Content section */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-sm text-gray-600">{typeLabels[item.type]}</span>
            <span className="text-xs text-gray-500">{formatTimeAgo(item.timestamp)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}