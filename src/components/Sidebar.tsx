interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const subjects: Subject[] = [
  { id: 'math', name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-cyan-500' },
  { id: 'physics', name: 'Physics', icon: '⚛️', color: 'from-purple-500 to-pink-500' },
  { id: 'chemistry', name: 'Chemistry', icon: '🧪', color: 'from-green-500 to-emerald-500' },
  { id: 'biology', name: 'Biology', icon: '🧬', color: 'from-yellow-500 to-orange-500' },
  { id: 'coding', name: 'Programming', icon: '💻', color: 'from-indigo-500 to-violet-500' },
  { id: 'english', name: 'English', icon: '📚', color: 'from-rose-500 to-red-500' },
  { id: 'history', name: 'History', icon: '🏛️', color: 'from-amber-500 to-yellow-500' },
  { id: 'general', name: 'General', icon: '🌍', color: 'from-teal-500 to-cyan-500' },
];

interface SidebarProps {
  selectedSubject: string;
  onSelectSubject: (id: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ selectedSubject, onSelectSubject, isCollapsed, onToggle }: SidebarProps) {
  return (
    <div className={`flex flex-col h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              <span className="text-2xl">🎓</span> AI Tutor
            </h2>
          )}
          <button
            onClick={onToggle}
            className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600/50 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Subjects */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {!isCollapsed && (
          <p className="text-xs text-gray-400 uppercase tracking-wider px-2 mb-3 font-medium">Subjects</p>
        )}
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelectSubject(subject.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              selectedSubject === subject.id
                ? 'bg-gradient-to-r ' + subject.color + ' text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? subject.name : undefined}
          >
            <span className="text-xl">{subject.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{subject.name}</span>}
          </button>
        ))}
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-700/50">
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-3 border border-indigo-500/20">
            <p className="text-xs text-indigo-300 font-medium">✨ Pro Tip</p>
            <p className="text-xs text-gray-400 mt-1">Speak naturally or type your questions. Your AI tutor adapts to your learning style!</p>
          </div>
        </div>
      )}
    </div>
  );
}
