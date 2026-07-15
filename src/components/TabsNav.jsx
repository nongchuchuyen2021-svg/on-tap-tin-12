import { ListChecks, ToggleLeft, Edit3 } from "lucide-react";

const TABS = [
  { key: "mcq", label: "Trắc nghiệm khách quan", icon: ListChecks },
  { key: "tf", label: "Trắc nghiệm Đúng/Sai", icon: ToggleLeft },
  { key: "essay", label: "Tự luận", icon: Edit3 },
];

export default function TabsNav({ activeTab, onChange }) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-0 bg-gray-200/60 backdrop-blur-md p-2 rounded-2xl mb-8 shadow-inner border border-white/50 max-w-3xl mx-auto relative">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all duration-300 ease-out w-full ${
            activeTab === tab.key
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/40 md:scale-[1.02] ring-1 ring-white/20 z-10"
              : "text-gray-500 hover:text-blue-700 hover:bg-white/80 hover:shadow-sm md:hover:scale-[1.01]"
          }`}
          onClick={() => onChange(tab.key)}
        >
          <tab.icon className="w-5 h-5 flex-shrink-0" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
