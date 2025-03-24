"use client";

import React, { useEffect, useState, useRef } from 'react';
import { FiSend, FiClock, FiTerminal } from 'react-icons/fi';

type Command = {
  command: string;
  delay: number;
  output?: string[];
}

type TerminalProps = {
  commands: Command[];
}

export default function Terminal({ commands }: TerminalProps) {
  const [history, setHistory] = useState<{command?: string; output?: string[]; timestamp?: string}[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [commandIndex, setCommandIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [isAiResponding, setIsAiResponding] = useState<boolean>(false);
  const [conversationContext, setConversationContext] = useState<{role: 'system' | 'user' | 'assistant'; content: string}[]>([]);
  const [visitorType, setVisitorType] = useState<string | null>(null);
  const [hasPromptedVisitorType, setHasPromptedVisitorType] = useState<boolean>(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add a small delay before starting the terminal animation for smoother page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to get current timestamp
  const getCurrentTimestamp = (): string => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (!isVisible || commandIndex >= commands.length) return;
    
    setIsTyping(true);
    let typingTimer: NodeJS.Timeout;
    let currentText = '';
    const command = commands[commandIndex].command;
    const typingDelay = 40; // ms per character - slightly faster
    
    const typeCharacter = (index: number) => {
      if (index < command.length) {
        currentText += command[index];
        setCurrentCommand(currentText);
        typingTimer = setTimeout(() => typeCharacter(index + 1), typingDelay);
      } else {
        setIsTyping(false);
        // Command is fully typed, show output after a delay
        setTimeout(() => {
          setIsAiResponding(true);
          setTimeout(() => {
            setHistory(prev => [
              ...prev, 
              { 
                command: command,
                output: commands[commandIndex].output,
                timestamp: getCurrentTimestamp()
              }
            ]);
            setCurrentCommand('');
            setCommandIndex(prev => prev + 1);
            setIsAiResponding(false);
          }, commands[commandIndex].delay);
        }, 500);
      }
    };
    
    // Start typing the command with a shorter initial delay
    typingTimer = setTimeout(() => typeCharacter(0), 300);
    
    return () => {
      clearTimeout(typingTimer);
    };
  }, [commandIndex, commands, isVisible]);

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, currentCommand, isAiResponding]);

  // Focus input when terminal becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current && commandIndex >= commands.length) {
      inputRef.current.focus();
    }
  }, [isVisible, commandIndex, commands.length]);

  // Prompt for visitor type after scripted commands complete
  useEffect(() => {
    if (commandIndex === commands.length && !hasPromptedVisitorType) {
      setTimeout(() => {
        setIsAiResponding(true);
        setTimeout(() => {
          setHistory(prev => [
            ...prev,
            {
              command: "ai-response",
              output: [
                "I'd love to tailor our conversation! Are you a recruiter, client, developer, or just browsing? (Pick one or just continue chatting!)"
              ],
              timestamp: getCurrentTimestamp()
            }
          ]);
          setHasPromptedVisitorType(true);
          setIsAiResponding(false);
        }, 1000);
      }, 1000);
    }
  }, [commandIndex, commands.length, hasPromptedVisitorType]);

  // Helper function to determine if a command is a system command or user question
  const isSystemCommand = (cmd: string) => {
    return cmd === 'clear' || cmd.startsWith('ai-crishna');
  };

  const isUserQuestion = (cmd: string) => {
    return !isSystemCommand(cmd);
  };

  // Enhanced AI response handling with OpenAI API
  const fetchAiResponse = async (input: string) => {
    try {
      setIsAiResponding(true);
      
      // Check for visitor type identification in first user message after prompt
      if (hasPromptedVisitorType && !visitorType) {
        let detectedType = null;
        const lowerInput = input.toLowerCase();
        
        if (lowerInput.includes('1') || lowerInput.includes('recruiter') || lowerInput.includes('employer') || lowerInput.includes('hiring')) {
          detectedType = 'recruiter';
        } else if (lowerInput.includes('2') || lowerInput.includes('client') || lowerInput.includes('service') || lowerInput.includes('project')) {
          detectedType = 'client';
        } else if (lowerInput.includes('3') || lowerInput.includes('developer') || lowerInput.includes('tech') || lowerInput.includes('engineer')) {
          detectedType = 'developer';
        } else if (lowerInput.includes('4') || lowerInput.includes('browsing') || lowerInput.includes('curious') || lowerInput.includes('just')) {
          detectedType = 'visitor';
        }
        
        if (detectedType) {
          setVisitorType(detectedType);
          
          // Add visitor type to conversation context for the AI
          const visitorMessage = { 
            role: 'system' as const, 
            content: `The user has identified themselves as a ${detectedType}. Please tailor your responses accordingly.` 
          };
          
          // Update context with visitor type info
          setConversationContext(prev => [...prev, visitorMessage]);
          
          // Generate customized welcome message based on visitor type
          let welcomeMessage: string[] = [];
          
          switch(detectedType) {
            case 'recruiter':
              welcomeMessage = [
                "👋 Welcome, talent scout extraordinaire!",
                "",
                "You've just discovered one of tech's hidden gems. Krishna has the rare combination of technical brilliance and practical business sense.",
                "",
                "I'd recommend asking about his project management approach, team leadership experience, or how he's handled challenging technical problems. His mobile apps with 10M+ downloads might be of particular interest!",
                "",
                "What specific skills or experiences are you looking for in candidates?"
              ];
              break;
            case 'client':
              welcomeMessage = [
                "👋 Hello there, potential collaborator!",
                "",
                "You're in the right place! Krishna specializes in turning ambitious ideas into polished digital products.",
                "",
                "You might want to ask about his experience with similar projects, his approach to timeline estimation, or how he handles project requirements.",
                "",
                "What kind of project are you looking to build? Krishna has particular expertise in AI integration, mobile development, and scalable web applications."
              ];
              break;
            case 'developer':
              welcomeMessage = [
                "👋 Greetings, fellow code wrangler!",
                "",
                "Always good to meet another developer! Krishna is big on knowledge sharing and technical collaboration.",
                "",
                "Feel free to ask about his tech stack preferences, architecture decisions, or how he's implemented particular features. He's especially strong with React/Next.js, mobile development, and AI integrations.",
                "",
                "What technologies are you currently working with?"
              ];
              break;
            default:
              welcomeMessage = [
                "👋 Welcome to Krishna's digital domain!",
                "",
                "Thanks for stopping by! Krishna's portfolio showcases his journey as a Software Engineer & AI Product Developer.",
                "",
                "Feel free to ask about his projects (like SoleilSpace or the Survey Heart app with 1M+ downloads), or his experience with various technologies.",
                "",
                "Is there something specific that caught your eye about Krishna's work?"
              ];
          }
          
          // Return custom welcome instead of API call for the first response
          return welcomeMessage;
        }
      }
      
      // Call our API endpoint with the conversation history
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input,
          conversationHistory: conversationContext
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
      
      const data = await response.json();
      
      // Format the response for display
      let formattedResponse = data.response.split('\n');
      
      // Update conversation context with the new history from the API
      if (data.conversationHistory) {
        setConversationContext(data.conversationHistory);
      } else {
        // Fallback in case API doesn't return conversation history
        setConversationContext(prev => [
          ...prev,
          { role: 'user', content: input },
          { role: 'assistant', content: data.response }
        ]);
      }
      
      return formattedResponse;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return [
        "Sorry, I encountered an error while processing your request.",
        "Please try asking something else or try again later."
      ];
    } finally {
      setIsAiResponding(false);
    }
  };

  // Handle user input submission with OpenAI integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // Add user message to history
    setHistory(prev => [
      ...prev,
      {
        command: userInput,
        timestamp: getCurrentTimestamp()
      }
    ]);
    
    // Clear input and show thinking indicator
    const submittedInput = userInput;
    setUserInput('');
    setIsAiResponding(true);
    
    // Special command handling
    if (submittedInput.toLowerCase() === 'clear') {
      setHistory([]);
      setConversationContext([]); // Clear conversation history
      setIsAiResponding(false);
      return;
    }
    
    // Help command
    if (submittedInput.toLowerCase() === 'help') {
      setHistory(prev => [
        ...prev,
        {
          command: "ai-response",
          output: [
            "📚 I can answer questions about Krishna like:",
            "",
            "• His background and experience",
            "• Technical skills and projects",
            "• What makes him unique",
            "• Contact information",
            "",
            "Try these special commands:",
            "• 'why hire' - See why Krishna stands out",
            "• 'fun facts' - Interesting tidbits about Krishna",
            "• 'pitch' - Quick elevator pitch about Krishna",
            "• 'clear' - Reset our conversation",
            "• 'save' - Download this chat as a text file"
          ],
          timestamp: getCurrentTimestamp()
        }
      ]);
      setIsAiResponding(false);
      return;
    }
    
    // Add save conversation command
    if (submittedInput.toLowerCase() === 'save') {
      // Create a text version of the conversation
      const conversationText = history.map(item => {
        if (item.command === 'ai-response') {
          return `AI (${item.timestamp}):\n${item.output?.join('\n')}\n`;
        } else {
          return `User (${item.timestamp}):\n${item.command}\n`;
        }
      }).join('\n');
      
      // Create a blob with the conversation text
      const blob = new Blob([conversationText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Create a download link and trigger it
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-crishna-conversation-${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Add a confirmation message
      setHistory(prev => [
        ...prev,
        {
          command: "ai-response",
          output: ["Conversation saved to text file!"],
          timestamp: getCurrentTimestamp()
        }
      ]);
      
      setIsAiResponding(false);
      return;
    }
    
    // Why hire command
    if (submittedInput.toLowerCase() === 'why hire') {
      setHistory(prev => [
        ...prev,
        {
          command: "ai-response",
          output: [
            "🌟 Why Hire Krishna? Let me count the ways!",
            "",
            "1. Full-Stack Wizard: He doesn't just build parts of applications; he crafts entire digital experiences from pixel to server.",
            "",
            "2. AI Implementation Expert: While others are still reading about AI, Krishna is already integrating it into production systems.",
            "",
            "3. Problem-Solving Machine: Give him a challenge, and he'll return with three elegant solutions before lunch.",
            "",
            "4. User-Focused Developer: He builds software people actually *want* to use (a rarer skill than you might think!).",
            "",
            "5. Team Multiplier: Krishna doesn't just contribute; he elevates entire development teams with his knowledge sharing and collaborative approach.",
            "",
            "Don't just take my word for it - ask him about his projects and see for yourself!"
          ],
          timestamp: getCurrentTimestamp()
        }
      ]);
      setIsAiResponding(false);
      return;
    }
    
    // Fun facts command
    if (submittedInput.toLowerCase() === 'fun facts') {
      setHistory(prev => [
        ...prev,
        {
          command: "ai-response",
          output: [
            "🎮 Fun Facts About Krishna:",
            "",
            "• His first program was a text-based adventure game he wrote at age 12",
            "",
            "• He once debugged a critical production issue while on a hiking trip (dedication level: expert)",
            "",
            "• He can explain complex technical concepts to both developers and non-technical stakeholders with equal clarity",
            "",
            "• His code has been running in production for millions of users worldwide",
            "",
            "• He's constantly learning - currently exploring advanced AI architectures and edge computing",
            "",
            "Want to know more about his technical adventures? Just ask!"
          ],
          timestamp: getCurrentTimestamp()
        }
      ]);
      setIsAiResponding(false);
      return;
    }
    
    // Pitch command
    if (submittedInput.toLowerCase() === 'pitch') {
      setHistory(prev => [
        ...prev,
        {
          command: "ai-response",
          output: [
            "🚀 Krishna Korukanti in 30 Seconds:",
            "",
            "Imagine a developer who combines deep technical expertise with a genuine understanding of user needs. That's Krishna.",
            "",
            "With over 10 million app downloads to his name, he transforms complex problems into elegant solutions across mobile, web, and AI domains.",
            "",
            "Whether it's crafting intuitive UIs, building scalable backends, or integrating cutting-edge AI, Krishna delivers excellence with every line of code.",
            "",
            "He's not just looking for the next job; he's looking to create impact through technology that matters.",
            "",
            "That's Krishna Korukanti: Engineer. Innovator. Problem Solver."
          ],
          timestamp: getCurrentTimestamp()
        }
      ]);
      setIsAiResponding(false);
      return;
    }
    
    // Get AI response
    const aiOutput = await fetchAiResponse(submittedInput);
    
    // Add AI response to history
    setHistory(prev => [
      ...prev,
      {
        command: "ai-response",
        output: aiOutput,
        timestamp: getCurrentTimestamp()
      }
    ]);
  };

  // Replace the old getAiResponse with the new implementation that uses OpenAI
  // This keeps backward compatibility for scripted commands
  const getAiResponse = async (input: string): Promise<string[]> => {
    const normalizedInput = input.toLowerCase();
    
    // For scripted commands, use the pre-defined responses
    if (normalizedInput.includes('project') || normalizedInput.includes('work')) {
      return [
        "🚀 Krishna has worked on various exciting projects!",
        "• Mobile apps with over 10 million downloads",
        "• AI-driven web applications",
        "• Enterprise software solutions",
        "",
        "You can see some featured projects in the Projects section below!"
      ];
    }
    
    if (normalizedInput.includes('contact') || normalizedInput.includes('hire') || normalizedInput.includes('job')) {
      return [
        "📬 The best way to contact Krishna is through the contact form at the bottom of this page.",
        "You can also reach out via LinkedIn for professional inquiries.",
        "",
        "Krishna is always open to discussing interesting opportunities!"
      ];
    }
    
    if (normalizedInput.includes('skill') || normalizedInput.includes('tech')) {
      return [
        "💻 Krishna's technical skills include:",
        "• Frontend: React, Next.js, TypeScript, TailwindCSS",
        "• Backend: Node.js, Python, Java, Spring",
        "• Mobile: Android, iOS, Flutter, React Native",
        "• AI/ML: TensorFlow, PyTorch, LangChain, OpenAI",
        "",
        "He's always learning new technologies!"
      ];
    }
    
    // For non-scripted queries, use the OpenAI API
    return await fetchAiResponse(input);
  };

  if (!isVisible) {
    return (
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg border border-zinc-800 overflow-hidden font-mono text-sm h-[400px] animate-pulse">
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="text-zinc-400 flex items-center">
            <FiTerminal className="mr-2" />
            AI Crishna Terminal
          </div>
          <div className="w-20"></div> {/* Spacer for balance */}
        </div>
        <div className="p-4 h-80 bg-zinc-900/50"></div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg border border-zinc-800 overflow-hidden font-mono text-sm transform transition-all duration-300 shadow-lg shadow-blue-500/5">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 border-b border-zinc-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-zinc-300 flex items-center font-medium">
          <FiTerminal className="mr-2 text-blue-400" />
          AI Crishna Terminal
        </div>
        <div className="text-zinc-500 text-xs">
          {isAiResponding && (
            <div className="flex items-center animate-pulse">
              <FiClock className="mr-1" />
              <span>Thinking...</span>
            </div>
          )}
        </div>
      </div>
      
      <div 
        ref={terminalRef} 
        className="p-4 h-[400px] overflow-y-auto text-zinc-300 space-y-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90"
      >
        {history.map((item, index) => (
          <div key={index} className="mb-4 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="flex items-center justify-between">
              {isSystemCommand(item.command || '') ? (
                <div className="flex items-center text-gray-500">
                  <span className="text-gray-500 mr-2">$</span>
                  <span className="text-gray-400">{item.command}</span>
                </div>
              ) : item.command === "ai-response" ? (
                <div className="flex items-center text-blue-400">
                  <span className="text-blue-500 mr-2">ai&gt;</span>
                  <span className="text-blue-400 font-medium">Response</span>
                </div>
              ) : isUserQuestion(item.command || '') ? (
                <div className="flex items-center">
                  <span className="text-purple-400 mr-2">user&gt;</span>
                  <span className="text-purple-300 font-medium">{item.command}</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">$</span>
                  <span>{item.command}</span>
                </div>
              )}
              
              {item.timestamp && (
                <span className="text-xs text-zinc-500">{item.timestamp}</span>
              )}
            </div>
            
            {item.output && (
              <div className={`mt-2 ml-4 whitespace-pre-wrap ${item.command === "ai-response" ? 'text-blue-300 border-l-2 border-blue-500/30 pl-3' : isUserQuestion(item.command || '') ? 'text-blue-300 border-l-2 border-blue-500/30 pl-3' : 'text-zinc-400'}`}>
                {item.output.map((line, lineIndex) => (
                  <div 
                    key={lineIndex} 
                    className="py-0.5 animate-fade-in" 
                    style={{ animationDelay: `${(lineIndex * 100) + 100}ms` }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {currentCommand && (
          <div className="flex items-center mb-3">
            {isSystemCommand(currentCommand) ? (
              <span className="text-gray-500 mr-2">$</span>
            ) : (
              <span className="text-purple-400 mr-2">user&gt;</span>
            )}
            <span className={isSystemCommand(currentCommand) ? "text-gray-400" : "text-purple-300 font-medium"}>
              {currentCommand}
            </span>
            {isTyping && <span className="ml-1 h-4 w-2 bg-zinc-300 animate-cursor-blink"></span>}
          </div>
        )}
        
        {isAiResponding && (
          <div className="flex items-center mb-3">
            <span className="text-blue-500 mr-2">ai&gt;</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-thinking-dots" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-thinking-dots" style={{ animationDelay: '200ms' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-thinking-dots" style={{ animationDelay: '400ms' }}></div>
            </div>
          </div>
        )}
      </div>
      
      {/* User input area */}
      {commandIndex >= commands.length && (
        <form onSubmit={handleSubmit} className="border-t border-zinc-800 p-3 flex items-center bg-zinc-900/90">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask AI Crishna anything..."
            className="flex-1 bg-zinc-800/50 text-zinc-300 px-3 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 border border-zinc-700"
            disabled={isAiResponding}
          />
          <button
            type="submit"
            className={`flex items-center justify-center px-4 py-2 rounded-r-md ${isAiResponding 
              ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-500 text-white'} transition-colors duration-200`}
            disabled={isAiResponding}
          >
            <FiSend className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
