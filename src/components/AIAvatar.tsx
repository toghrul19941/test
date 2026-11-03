import { useEffect, useState } from 'react';

interface AIAvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
}

export default function AIAvatar({ isSpeaking, isListening }: AIAvatarProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-2xl">
      {/* Animated background particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Glowing rings */}
      <div className={`absolute w-64 h-64 rounded-full border-2 border-purple-500/20 transition-all duration-500 ${isSpeaking ? 'scale-110 border-purple-400/50' : 'scale-100'}`} />
      <div className={`absolute w-72 h-72 rounded-full border border-indigo-500/10 transition-all duration-700 ${isSpeaking ? 'scale-115 border-indigo-400/30' : 'scale-100'}`} />
      <div className={`absolute w-80 h-80 rounded-full border border-blue-500/5 transition-all duration-1000 ${isSpeaking ? 'scale-120 border-blue-400/20' : 'scale-100'}`} />

      {/* Main avatar */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Avatar circle */}
        <div className={`relative w-40 h-40 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-2xl transition-all duration-300 ${isSpeaking ? 'shadow-purple-500/50 scale-105' : 'shadow-purple-500/20'}`}>
          {/* Inner glow */}
          <div className={`absolute inset-2 rounded-full bg-gradient-to-br from-purple-500/50 to-indigo-500/50 transition-all duration-300 ${isSpeaking ? 'animate-pulse' : ''}`} />
          
          {/* Face */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Eyes */}
            <div className="flex gap-6 mb-3">
              <div className={`w-4 h-4 bg-white rounded-full transition-all ${isListening ? 'h-5' : 'h-4'}`}>
                <div className={`w-2 h-2 bg-indigo-900 rounded-full mt-1 ml-1 transition-all ${isSpeaking ? 'animate-bounce' : ''}`} style={{ animationDuration: '0.5s' }} />
              </div>
              <div className={`w-4 h-4 bg-white rounded-full transition-all ${isListening ? 'h-5' : 'h-4'}`}>
                <div className={`w-2 h-2 bg-indigo-900 rounded-full mt-1 ml-1 transition-all ${isSpeaking ? 'animate-bounce' : ''}`} style={{ animationDuration: '0.5s' }} />
              </div>
            </div>
            {/* Mouth */}
            <div className={`transition-all duration-150 ${isSpeaking ? 'w-8 h-4 bg-white/90 rounded-full' : 'w-6 h-2 bg-white/60 rounded-full'}`} />
          </div>
        </div>

        {/* Sound waves when speaking */}
        {isSpeaking && (
          <div className="absolute -bottom-8 flex items-end gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-purple-400 rounded-full animate-pulse"
                style={{
                  height: `${8 + Math.random() * 16}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.4s',
                }}
              />
            ))}
          </div>
        )}

        {/* Status indicator */}
        <div className={`mt-12 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          isSpeaking 
            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
            : isListening 
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
              : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
        }`}>
          {isSpeaking ? '🎙️ Speaking...' : isListening ? '👂 Listening...' : '✨ Ready to help'}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        <span className="text-white/70 text-sm font-medium">AI Tutor Live</span>
      </div>
      <div className="absolute top-4 right-4 text-white/70 text-sm">
        HD 1080p
      </div>
    </div>
  );
}
