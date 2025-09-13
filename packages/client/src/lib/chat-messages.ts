import type { ChatMessage } from "@/types";

const key = "pdf-chat-messages";

export function getChatMessagesFromLS(): ChatMessage[] {
  const messages = localStorage.getItem(key);
  return messages ? JSON.parse(messages) : [];
}

export function setChatMessagesInLS(chatMessages: ChatMessage[]) {
  localStorage.setItem(key, JSON.stringify(chatMessages));
}

export function removeChatMessagesFromLS() {
  localStorage.removeItem(key);
}
