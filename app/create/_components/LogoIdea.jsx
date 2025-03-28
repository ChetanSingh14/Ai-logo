import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import axios from "axios";
import Prompt from "@/app/_data/Prompt";
import { Loader2Icon } from "lucide-react";

function LogoIdea({ formData, onHandleInputChange }) {
  const [ideas, setIdeas] = useState([]); // ✅ Initialize as empty array
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formData?.idea);

  useEffect(() => {
    generateLogoDesignIdea();
  }, [formData]); // ✅ Depend on `formData` to refresh ideas if needed

  const generateLogoDesignIdea = async () => {
    setLoading(true);
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT
      .replace("{logoType}", formData?.designs?.title || "Default Type")
      .replace("{logoTitle}", formData?.title || "")
      .replace("{logoDesc}", formData?.description || "")
      .replace("{logoPrompt}", formData?.designs?.prompt || "");

    console.log("Generated Prompt:", PROMPT);

    try {
      const result = await axios.post("/api/ai-design-ideas", { prompt: PROMPT });
      console.log("API Response:", result.data);

      // ✅ Always update ideas when new data is received
      setIdeas(result.data.ideas || []);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      <HeadingDescription title={Lookup.LogoIdeaTitle} description={Lookup.LogoIdeaDesc} />

      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center justify-center">
          <Loader2Icon className="animate-spin my-10" />
        </div>
      )}

      {/* Idea Selection */}
      {!loading && ideas.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-6">
          {ideas.map((item, index) => (
            <h2
              key={index}
              onClick={() => {
                setSelectedOption(item);
                onHandleInputChange("idea", item); // ✅ Fix missing field name
              }}
              className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${
                selectedOption === item ? "border-primary" : ""
              }`}
            >
              {item}
            </h2>
          ))}

          {/* AI Selection Option */}
          <h2
            onClick={() => {
              setSelectedOption("Let AI Select the best idea");
              onHandleInputChange("idea", "Let AI Select the best idea");
            }}
            className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${
              selectedOption === "Let AI Select the best idea" ? "border-primary" : ""
            }`}
          >
            Let AI Select the best idea
          </h2>
        </div>
      )}

      {/* No ideas case */}
      {!loading && ideas.length === 0 && <p className="text-gray-500">No ideas generated yet.</p>}
    </div>
  );
}

export default LogoIdea;
