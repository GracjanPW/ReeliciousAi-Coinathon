"use client";

import { MultipartSections } from "@/components/multipart-sections";
import { BACKEND_PROMPT_URL, BACKEND_SERVICE_URL } from "@/config";
import {
  BackgroundVideo,
  PromptResponse,
  ServiceBackgroundVideosResponse,
  ServiceFile,
  ServiceResponse,
} from "@/types/responses";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import ScriptPrompt from "./script-prompt";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateSelect from "./template-select";
import BackgroundAudioSelector from "./background-audio-selector";
import ToneSelector from "./tone-selector";
import { Button } from "@/components/ui/button";

const toneOptions = [
  {
    name: "Neutral",
    id: 0,
    description: "Emotionally balanced, with no strong feelings expressed.",
  },
  {
    name: "Happy",
    id: 1,
    description: "A positive, joyful, or content emotional state.",
  },
  {
    name: "Sad",
    id: 2,
    description: "A feeling of sorrow, disappointment, or unhappiness.",
  },
  {
    name: "Angry",
    id: 3,
    description:
      "Intense displeasure or hostility, often in response to frustration or injustice.",
  },
  {
    name: "Afraid",
    id: 4,
    description:
      "An emotional reaction to threat or danger, often resulting in fear or anxiety.",
  },
  {
    name: "Disgusted",
    id: 5,
    description:
      "A strong feeling of aversion or revulsion toward something unpleasant.",
  },
  {
    name: "Surprised",
    id: 6,
    description: "A reaction to something unexpected or astonishing.",
  },
  {
    name: "Excited",
    id: 7,
    description:
      "High energy and enthusiasm, often in anticipation of something positive.",
  },
  {
    name: "Horny",
    id: 8,
    description: "Experiencing sexual arousal or desire.",
  },
  {
    name: "Assertive",
    id: 9,
    description:
      "Confident and self-assured in expression without being aggressive.",
  },
  {
    name: "Submissive",
    id: 10,
    description:
      "Yielding to the will of others; compliant or passive in behavior.",
  },
  {
    name: "Skibidi",
    id: 11,
    description:
      "Chaotic or absurd emotional energy; meme-inspired nonsensical vibe.",
  },
];

export function PromptSteps() {
  const router = useRouter();

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ["template"],
    queryFn: async () => {
      const res = await fetch(BACKEND_SERVICE_URL + "?type=1", {
        credentials: "include",
      });
      if (!res.ok) {
        toast.error(res.statusText);
        return [];
      }
      const data: ServiceBackgroundVideosResponse = await res.json();
      if (!data.isSuccessful) {
        toast.error(`Failed to fetch video templates: ${data.errorMessage}`);
        return [];
      }
      return data.serviceData;
    },
  });
  const { data: audios, isLoading: audiosLoading } = useQuery({
    queryKey: ["audio"],
    queryFn: async () => {
      const res = await fetch(BACKEND_SERVICE_URL + "?type=2", {
        credentials: "include",
      });
      if (!res.ok) {
        toast.error(res.statusText);
        return [];
      }
      const data: ServiceResponse = await res.json();
      if (!data.isSuccessful) {
        toast.error(`Failed to fetch background audio: ${data.errorMessage}`);
        return [];
      }
      return data.serviceData;
    },
  });


  const [selectedAudio, setSelectedAudio] = useState<number | null>(null);
  const [selectedTone, setSelectedTone] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [prompt, setPrompt] = useState("");
  const [scriptFile, setScriptFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptSource, setScriptSource] = useState<"prompt" | "file">("prompt");

  const handleAudioSelect = (id: number) => {
    setSelectedAudio(id);
  };

  const handleToneSelect = (id: number) => {
    setSelectedTone(id);
  };

  const handleGenerate = async () => {
    if (
      !prompt.trim() &&
      !scriptFile &&
      !selectedAudio &&
      !selectedTemplate &&
      !audios &&
      !videos
    )
      return;
    if (scriptSource === "prompt" && !scriptFile) {
      try {
        setIsGenerating(true);
        const body = {
          prompt,
          tone: selectedTone,
          audio: audios!.find(
            (audio: ServiceFile) => audio.id === selectedAudio
          )?.url,
          video: videos!.find(
            (video: BackgroundVideo) => video.id === selectedTemplate
          )?.url,
        };

        const request: RequestInit = {
          method: "POST",
          credentials: "include",
          headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
          },
          body: JSON.stringify(body),
        };

        console.log(request);

        const response = await fetch(BACKEND_PROMPT_URL, request);

        if (!response.ok) {
          throw new Error("Failed to generate content");
        }

        const data: PromptResponse = await response.json();
        if (!data.isSuccessful) {
          throw new Error(
            data.errorMessage ? data.errorMessage : "Something went wrong"
          );
        }
        router.push(`/projects/${data.projectId}`);
      } catch (error) {
        toast.error("Error generating content: " + error || "");
      } finally {
        setIsGenerating(false);
      }
    } else if (scriptSource === "file" && scriptFile) {
      try {
        setIsGenerating(true);
        const form = new FormData();

        form.append("file", scriptFile);
        form.append("tone", selectedTone?.toString() || "0");
        if (selectedAudio) {
          form.append("audio", selectedAudio?.toString() || "0");
        }
        form.append("video", selectedTemplate?.toString() || "0");

        const request: RequestInit = {
          method: "POST",
          credentials: "include",
          body: form,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await fetch("/api/generate/prompt", request);

        if (!response.ok) {
          throw new Error("Failed to generate content");
        }
      } catch (error) {
        toast.error("Error generating content: " + error || "");
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div>
      <MultipartSections>
        <MultipartSections.Section title="Script">
          <ScriptPrompt
            prompt={prompt}
            scriptFile={scriptFile}
            scriptSource={scriptSource}
            setPrompt={setPrompt}
            setScriptFile={setScriptFile}
            setScriptSource={setScriptSource}
          />
        </MultipartSections.Section>
        <MultipartSections.Section title="Video">
          <Tabs defaultValue="subway_surfer" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="subway_surfer">Subway Surfers</TabsTrigger>
              <TabsTrigger value="minecraft">Minecraft</TabsTrigger>
              <TabsTrigger value="csgo">CSGO</TabsTrigger>
            </TabsList>
            <TabsContent value="subway_surfer">
              <TemplateSelect
                templates={videos}
                loading={videosLoading}
                selected={selectedTemplate}
                onSelect={setSelectedTemplate}
              />
            </TabsContent>
          </Tabs>
        </MultipartSections.Section>
        <MultipartSections.Section title="Audio">
          <BackgroundAudioSelector
            audioFiles={audios}
            loading={audiosLoading}
            selected={selectedAudio}
            onSelect={handleAudioSelect}
          />
        </MultipartSections.Section>
        <MultipartSections.Section title="Tone">
          <ToneSelector
            toneOptions={toneOptions}
            selectedTone={selectedTone}
            handleToneSelect={handleToneSelect}
          />
        </MultipartSections.Section>
        <MultipartSections.Section title="Create">
          <Button
            variant={'outlineGradient'}
            size="lg"
            disabled={
              (!prompt.trim() && !scriptFile) ||
              !selectedTemplate ||
              selectedTone == null ||
              !selectedTemplate
            }
            onClick={handleGenerate}
          >
            {isGenerating ? "Generating..." : "Generate Content"}
          </Button>
        </MultipartSections.Section>
      </MultipartSections>
    </div>
  );
}
