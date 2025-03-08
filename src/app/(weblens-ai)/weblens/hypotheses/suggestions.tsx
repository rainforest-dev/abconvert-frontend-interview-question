"use client";

import { useEffect, useState } from "react";

interface ISuggestion {
  hypothesis: string;
  control: string;
  variant: string;
}

export default function Suggestions() {
  // file upload if file is undefined
  // otherwise display the suggestions from json file
  const [file, setFile] = useState<File | null>(null);
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const jsonData = JSON.parse(e.target.result as string);
          console.log(jsonData);
          setSuggestions(jsonData);
        }
      };
      reader.readAsText(file);
    }
  }, [file]);

  if (file) {
    return (
      <div className="flex-col-center gap-10">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.hypothesis}
            className="text-foreground p-4 odd:bg-amber-100 even:bg-purple-100"
          >
            <div className="bg-background flex flex-col gap-6 py-6">
              <div className="px-8">
                <h3 className="text-xl font-bold">Hypothesis</h3>
                <p>{suggestion.hypothesis}</p>
              </div>
              <hr />
              <div className="px-8">
                <h3 className="text-xl font-bold">Control</h3>
                <p>{suggestion.control}</p>
              </div>
              <div className="px-8">
                <h3 className="text-xl font-bold">Variant</h3>
                <p>{suggestion.variant}</p>
              </div>
            </div>
          </div>
        ))}
        <button
          className="btn rounded-full bg-amber-600 font-bold w-fit"
          onClick={() => setFile(null)}
        >
          Upload another file
        </button>
      </div>
    );
  }

  return (
    <label
      htmlFor="suggestions-file"
      className="flex-center flex-col gap-10 w-full aspect-square border border-dashed"
    >
      <h1 className="text-xl">Upload Suggestions File</h1>
      <input
        type="file"
        id="suggestions-file"
        name="suggestions-file"
        onChange={handleFileChange}
        className="sr-only"
      />
    </label>
  );
}
