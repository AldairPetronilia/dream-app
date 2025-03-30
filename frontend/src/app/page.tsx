"use client";
import React, { useState } from "react";

// Interface for response data
interface ResponseEntry {
  code: number;
  message: string;
  time: string;
}

export default function Home() {
  // State to store response data
  const [responses, setResponses] = useState<ResponseEntry[]>([]);

  const handleHelloClick = async () => {
    try {
      const response = await fetch(`/api/hello`);
      const data = await response.json();
      console.log("Hello response:", data);
      
      // Add entry to responses
      setResponses(prev => [
        ...prev,
        {
          code: response.status,
          message: data.message || JSON.stringify(data),
          time: new Date().toLocaleTimeString()
        }
      ]);
    } catch (error) {
      console.error("Error calling /hello:", error);
      setResponses(prev => [
        ...prev,
        {
          code: 0,
          message: String(error),
          time: new Date().toLocaleTimeString()
        }
      ]);
    }
  };

  const handleDefaultClick = async () => {
    try {
      const response = await fetch(`/api/default`);
      const data = await response.json();
      console.log("Default response:", data);
      
      // Add entry to responses
      setResponses(prev => [
        ...prev,
        {
          code: response.status,
          message: data.message || JSON.stringify(data),
          time: new Date().toLocaleTimeString()
        }
      ]);
    } catch (error) {
      console.error("Error calling backend:", error);
      setResponses(prev => [
        ...prev,
        {
          code: 0,
          message: String(error),
          time: new Date().toLocaleTimeString()
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold mb-6">Button Example</h1>
        
        <div className="flex gap-4 flex-col sm:flex-row">
          <button
            onClick={handleHelloClick}
            className="rounded-full border border-solid border-transparent bg-foreground text-background px-6 py-3 font-medium hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Hello
          </button>
          
          <button
            onClick={handleDefaultClick}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] px-6 py-3 font-medium hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
          >
            Default
          </button>
        </div>
        
        {/* Response data table */}
        {responses.length > 0 && (
          <div className="w-full max-w-2xl mt-8">
            <h2 className="text-xl font-bold mb-4">Response History</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border p-2 text-left">Code</th>
                  <th className="border p-2 text-left">Message</th>
                  <th className="border p-2 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((res, index) => (
                  <tr key={index} className="border-b">
                    <td className="border p-2">{res.code}</td>
                    <td className="border p-2">{res.message}</td>
                    <td className="border p-2">{res.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
