"use client";

import { FileUpload } from "@/components";
import { useEffect, useState } from "react";

interface ISuggestion {
  suggestion: string;
  hypothesis: string;
  control: string;
  variant: string;
}

export default function Suggestions() {
  // file upload if file is undefined
  // otherwise display the suggestions from json file
  const [file, setFile] = useState<File | null>(null);
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

  const pickAnother = () => {
    setSuggestions([]);
    setFile(null);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const jsonData = JSON.parse(e.target.result as string);
          if (Array.isArray(jsonData)) setSuggestions(jsonData);
          else {
            setFile(null);
            alert("Invalid JSON format");
          }
        }
      };
      reader.readAsText(file);
    }
  }, [file]);

  if (suggestions.length) {
    return (
      <div className="flex-col-center gap-10">
        {suggestions.map((suggestion, index) => (
          <div
            key={suggestion.hypothesis}
            className="text-foreground p-4 odd:bg-amber-100 even:bg-purple-100"
          >
            <h3 className="flex-row-center gap-1 mb-2">
              <div className="bg-foreground text-background size-6 flex-center rounded-full">
                {index + 1}
              </div>
              {suggestion.suggestion}
            </h3>
            <ul className="bg-background flex flex-col gap-6 py-6">
              <li className="px-8">
                <h4 className="text-xl font-bold">Hypothesis</h4>
                <p>{suggestion.hypothesis}</p>
              </li>
              <hr />
              <li className="px-8">
                <h4 className="text-xl font-bold">Control</h4>
                <p>{suggestion.control}</p>
              </li>
              <li className="px-8">
                <h4 className="text-xl font-bold">Variant</h4>
                <p>{suggestion.variant}</p>
              </li>
            </ul>
          </div>
        ))}
        <button
          className="btn rounded-full bg-amber-600 font-bold w-fit"
          onClick={pickAnother}
        >
          Upload another file
        </button>
      </div>
    );
  }

  return (
    <FileUpload
      value={file}
      onChange={setFile}
      validateOnDrag={(item) => item.type === "application/json"}
      accept=".json"
      name="suggestions-file"
    >
      <div
        className="flex-center flex-col gap-10 w-full aspect-square border border-dashed cursor-pointer
                group-data-[is-dragover=true]:border-amber-300 group-data-[is-dragover=true]:bg-amber-500/10"
      >
        <h1 className="text-xl">Upload Suggestions File</h1>
      </div>
    </FileUpload>
  );
}
