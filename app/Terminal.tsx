"use client";

import React, { useEffect, useState, useRef } from 'react';

type Command = {
  command: string;
  delay: number;
  output?: string[];
}

type TerminalProps = {
  commands: Command[];
}

export default function Terminal({ commands }: TerminalProps) {
  const [history, setHistory] = useState<{command?: string; output?: string[]}[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [commandIndex, setCommandIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Add a small delay before starting the terminal animation for smoother page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
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
          setHistory(prev => [
            ...prev, 
            { 
              command: command,
              output: commands[commandIndex].output 
            }
          ]);
          setCurrentCommand('');
          setCommandIndex(prev => prev + 1);
        }, commands[commandIndex].delay);
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
  }, [history, currentCommand]);

  // Helper function to determine if a command is a system command or user question
  const isSystemCommand = (cmd: string) => {
    return cmd === 'clear' || cmd.startsWith('ai-crishna');
  };

  const isUserQuestion = (cmd: string) => {
    return !isSystemCommand(cmd);
  };

  if (!isVisible) {
    return (
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg border border-zinc-800 overflow-hidden font-mono text-sm h-[276px] animate-pulse">
        <div className="flex items-center px-4 py-2 bg-zinc-800/50 border-b border-zinc-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="ml-4 text-zinc-400">AI Crishna Terminal</div>
        </div>
        <div className="p-4 h-64 bg-zinc-900/50"></div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg border border-zinc-800 overflow-hidden font-mono text-sm transform transition-all duration-300">
      <div className="flex items-center px-4 py-2 bg-zinc-800/50 border-b border-zinc-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-zinc-400">AI Crishna Terminal</div>
      </div>
      
      <div ref={terminalRef} className="p-4 h-80 overflow-y-auto text-zinc-300 space-y-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
        {history.map((item, index) => (
          <div key={index} className="mb-3">
            {isSystemCommand(item.command || '') ? (
              <div className="flex items-center text-gray-500">
                <span className="text-gray-500 mr-2">$</span>
                <span className="text-gray-400">{item.command}</span>
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
            
            {item.output && (
              <div className={`mt-1 ml-4 whitespace-pre-wrap ${isUserQuestion(item.command || '') ? 'text-blue-300 border-l-2 border-blue-500/30 pl-3' : 'text-zinc-400'}`}>
                {item.output.map((line, lineIndex) => (
                  <div key={lineIndex} className="py-0.5">{line}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {currentCommand && (
          <div className="flex items-center">
            {isSystemCommand(currentCommand) ? (
              <span className="text-gray-500 mr-2">$</span>
            ) : (
              <span className="text-purple-400 mr-2">user&gt;</span>
            )}
            <span className={isSystemCommand(currentCommand) ? "text-gray-400" : "text-purple-300 font-medium"}>
              {currentCommand}
            </span>
            {isTyping && <span className="ml-1 h-4 w-2 bg-zinc-300 animate-pulse"></span>}
          </div>
        )}
      </div>
    </div>
  );
}
