import { useState, useEffect, useCallback } from 'react';
import AIAvatar from './components/AIAvatar';
import ChatPanel from './components/ChatPanel';
import Controls from './components/Controls';
import Sidebar from './components/Sidebar';

interface Message {
  id: number;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const aiResponses: Record<string, string[]> = {
  math: [
    "Great question! Let me break this down step by step. In mathematics, understanding the fundamental concepts is key. Think of it like building blocks - each concept builds upon the previous one. Would you like me to show you a visual example?",
    "I'd love to help you with that! The key insight here is that mathematical problems often have multiple solution paths. Let me walk you through the most elegant approach. What specific part would you like me to elaborate on?",
    "Excellent! You're thinking about this the right way. Let me explain the underlying principle. When we look at this problem, we can apply several techniques. The most powerful one involves recognizing patterns...",
  ],
  physics: [
    "Fascinating topic! Physics is all about understanding how the universe works at its most fundamental level. Let me explain this concept using a real-world analogy that makes it much easier to grasp.",
    "That's a great observation! In physics, we always start with the fundamental laws and then apply them to specific situations. Let me show you how Newton's laws apply here...",
    "Wonderful question! The beauty of physics is that seemingly complex phenomena can often be explained with simple, elegant principles. Let me demonstrate with an example...",
  ],
  coding: [
    "Great thinking! Programming is essentially about breaking down complex problems into smaller, manageable steps. Let me show you how to approach this systematically. First, let's understand the data structure we need...",
    "I love that you're exploring this! In programming, the key is to think algorithmically. Let me walk you through the logic step by step. We'll start with pseudocode and then implement it.",
    "Excellent question! This is a common challenge in software development. The best approach is to think about the problem in terms of inputs, processing, and outputs. Let me show you a clean solution...",
  ],
  default: [
    "That's a wonderful question! Let me think about the best way to explain this to you. The key concept here is that learning is most effective when we connect new information to what we already know. Let me give you a clear explanation...",
    "I'm glad you asked about that! This is one of my favorite topics to discuss. Let me break it down into digestible parts. The first thing to understand is the fundamental principle behind it...",
    "Great curiosity! That's exactly the kind of question that leads to deep understanding. Let me share a framework for thinking about this. We can approach it from multiple angles...",
  ],
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('general');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [showChat, setShowChat] = useState(true);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAIResponse = useCallback((subject: string): string => {
    const responses = aiResponses[subject] || aiResponses['default'];
    return responses[Math.floor(Math.random() * responses.length)];
  }, []);

  const handleSendMessage = useCallback((content: string) => {
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    setIsListening(false);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        role: 'ai',
        content: getAIResponse(selectedSubject),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsProcessing(false);
      setIsSpeaking(true);

      // Simulate speaking duration
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    }, 1500);
  }, [selectedSubject, getAIResponse]);

  // Simulate listening when user might speak
  useEffect(() => {
    if (!isMuted && !isSpeaking && !isProcessing) {
      const interval = setInterval(() => {
        setIsListening(true);
        setTimeout(() => setIsListening(false), 2000);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isMuted, isSpeaking, isProcessing]);

  return (
    <div className="h-screen w-screen bg-gray-950 flex overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex border-r border-gray-800/50 bg-gray-900/30">
        <Sidebar
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">Session Active</span>
            </div>
            <span className="text-sm text-gray-500 font-mono">{formatTime(sessionTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowChat(!showChat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                showChat
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
              }`}
            >
              💬 Chat
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700/30">
              <span className="text-xs text-gray-400">Subject:</span>
              <span className="text-xs text-white font-medium capitalize">{selectedSubject}</span>
            </div>
          </div>
        </div>

        {/* Video + Chat Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-3 p-3 min-h-0">
          {/* Video Area */}
          <div className={`flex flex-col ${showChat ? 'lg:flex-1' : 'flex-1'} min-h-0`}>
            <div className="flex-1 relative min-h-0">
              <AIAvatar isSpeaking={isSpeaking} isListening={isListening} />
              
              {/* User's camera preview */}
              {isCameraOn && (
                <div className="absolute bottom-4 right-4 w-32 h-24 rounded-xl bg-gray-800 border-2 border-gray-600/50 overflow-hidden shadow-xl">
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gray-600 mx-auto mb-1 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-400">You</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <Controls
              isMuted={isMuted}
              isCameraOn={isCameraOn}
              isScreenSharing={isScreenSharing}
              onToggleMute={() => setIsMuted(!isMuted)}
              onToggleCamera={() => setIsCameraOn(!isCameraOn)}
              onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
              onEndCall={() => {
                setMessages([]);
                setSessionTime(0);
              }}
            />
          </div>

          {/* Chat Panel */}
          {showChat && (
            <div className="lg:w-96 w-full h-64 lg:h-auto min-h-0">
              <ChatPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                isProcessing={isProcessing}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {!sidebarCollapsed && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarCollapsed(true)} />
          <div className="relative w-64 bg-gray-900 border-r border-gray-800 h-full">
            <Sidebar
              selectedSubject={selectedSubject}
              onSelectSubject={(id) => {
                setSelectedSubject(id);
                setSidebarCollapsed(true);
              }}
              isCollapsed={false}
              onToggle={() => setSidebarCollapsed(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
