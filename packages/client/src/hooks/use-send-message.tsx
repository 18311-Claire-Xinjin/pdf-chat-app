import api from "@/api";
import type { ChatInputData } from "@/types";

import { useAppState } from "@/hooks/use-app-state";

import popSound from "@/assets/sounds/pop.mp3";
import notificationSound from "@/assets/sounds/notification.mp3";

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

export const useSendMessage = () => {
  const { addMessage, setIsBotTyping, setError } = useAppState();

  const sendMessage = async ({ prompt }: ChatInputData) => {
    try {
      addMessage({
        id: crypto.randomUUID(),
        content: prompt,
        role: "user",
      });

      setIsBotTyping(true);
      setError("");
      popAudio.play();

      const { data } = await api.post("/api/chat", { prompt });

      addMessage({
        id: data?.id,
        content: data?.content,
        sources: data?.sources,
        usage_metadata: data?.usage_metadata,
        generationTime: data?.generationTime,
        role: "assistant",
      });
      notificationAudio.play();
    } catch (error) {
      console.error("Chat API error:", error);
      setError("Something went wrong, try again!");
    } finally {
      console.log("false");
      setIsBotTyping(false);
    }
  };

  return {
    sendMessage,
  };
};
