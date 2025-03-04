"use client";

import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (commandIndex >= commands.length) return;
    
    setIsTyping(true);
    let typingTimer: NodeJS.Timeout;
    let currentText = '';
    const command = commands[commandIndex].command;
    const typingDelay = 50; // ms per character
    
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
    
    // Start typing the command
    typingTimer = setTimeout(() => typeCharacter(0), 500);
    
    return () => {
      clearTimeout(typingTimer);
    };
  }, [commandIndex, commands]);

  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg border border-zinc-800 overflow-hidden font-mono text-sm">
      <div className="flex items-center px-4 py-2 bg-zinc-800/50 border-b border-zinc-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-zinc-400">Terminal</div>
      </div>
      
      <div className="p-4 h-64 overflow-y-auto text-zinc-300 space-y-2">
        {history.map((item, index) => (
          <div key={index}>
            <div className="flex items-center">
              <span className="text-green-400 mr-2">$</span>
              <span>{item.command}</span>
            </div>
            {item.output && (
              <div className="mt-1 ml-4 text-zinc-400 whitespace-pre-wrap">
                {item.output.map((line, lineIndex) => (
                  <div key={lineIndex}>{line}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {currentCommand && (
          <div className="flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <span>{currentCommand}</span>
            {isTyping && <span className="ml-1 h-4 w-2 bg-zinc-300 animate-pulse"></span>}
          </div>
        )}
      </div>
    </div>
  );
} 