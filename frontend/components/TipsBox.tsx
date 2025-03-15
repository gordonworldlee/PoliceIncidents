import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

const safetyTips = [
  "Stay calm and take deep breaths during stressful situations",
  "Keep your hands visible and avoid sudden movements",
  "Speak clearly and maintain a respectful tone",
  "Have your important documents easily accessible",
  "Save emergency contact numbers in your phone",
  "Be aware of your surroundings at all times",
  "Consider traveling with a friend when possible",
  "Keep your phone charged and within reach",
  "Know your destination and route ahead of time",
  "Make sure your vehicle registration is up to date"
];

export default function TipsBox() {
  const [tip, setTip] = useState("");

  useEffect(() => {
    const randomTip = safetyTips[Math.floor(Math.random() * safetyTips.length)];
    setTip(randomTip);
  }, []);

  return (
    <div className="bg-gray-200 w-[20%] rounded-lg p-4 shadow-md border-l-4 border-[#D92552]">
      <div className="flex items-start gap-3">
        <Shield className="text-[#D92552] flex-shrink-0 mt-1" size={20} />
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Safety Tip</h3>
          <p className="text-gray-800 text-sm">{tip}</p>
        </div>
      </div>
    </div>
  );
}