"use client";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { hypothesisSchema } from "@/utils";
import { z } from "zod";
import { useEffect } from "react";

export default function Hypotheses({ url }: { url: string }) {
  const {
    object: hypotheses,
    isLoading,
    submit,
  } = useObject({
    api: "/api/weblens",
    schema: z.object({ hypotheses: z.array(hypothesisSchema) }),
  });

  useEffect(() => {
    submit({ url });
  }, []);

  return (
    <div className="flex-col-center gap-10">
      {hypotheses?.hypotheses?.map((hypothesis, index) => (
        <div
          key={hypothesis?.hypothesis}
          className="w-full text-foreground p-4 odd:bg-amber-100 even:bg-purple-100"
        >
          <h3 className="flex-row-center gap-1 mb-2">
            <div className="bg-foreground text-background size-6 flex-center rounded-full">
              {index + 1}
            </div>
            {hypothesis?.suggestion}
          </h3>
          <ul className="bg-background flex flex-col gap-6 py-6">
            <li className="px-8">
              <h4 className="text-xl font-bold">Hypothesis</h4>
              <p>{hypothesis?.hypothesis}</p>
            </li>
            <hr />
            <li className="px-8">
              <h4 className="text-xl font-bold">Control</h4>
              <p>{hypothesis?.control}</p>
            </li>
            <li className="px-8">
              <h4 className="text-xl font-bold">Variant</h4>
              <p>{hypothesis?.variant}</p>
            </li>
          </ul>
        </div>
      ))}
      {isLoading && (
        <div className="text-foreground p-4 odd:bg-amber-100 even:bg-purple-100 w-full">
          <h3 className="flex-row-center gap-1 mb-2">
            <div className="bg-foreground/50 text-background size-6 flex-center rounded-full animate-pulse">
              {(hypotheses?.hypotheses?.length ?? 0) + 1}
            </div>
            <span className="h-4 w-1/3 rounded-full bg-foreground/50 animate-pulse"></span>
          </h3>
          <ul className="bg-background flex flex-col gap-6 py-6">
            <li className="px-8">
              <h4 className="text-xl font-bold">Hypothesis</h4>
              <p className="h-5 w-1/2 bg-foreground/50 rounded-full animate-pulse"></p>
            </li>
            <hr />
            <li className="px-8">
              <h4 className="text-xl font-bold">Control</h4>
              <p className="h-5 w-full bg-foreground/50 rounded-full animate-pulse"></p>
            </li>
            <li className="px-8">
              <h4 className="text-xl font-bold">Variant</h4>
              <p className="h-5 w-2/3 bg-foreground/50 rounded-full animate-pulse"></p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
