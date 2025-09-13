import { useEffect } from "react";

import api from "./api";

import { ThemeProvider } from "./providers/theme-provider";

import { Header } from "@/components/layout/header";
import { Hero } from "./components/layout/hero";
import { UploadSection } from "./components/app/upload-section";
import { ChatSection } from "./components/app/chat-section";

import { useAppState } from "./hooks/use-app-state";

function App() {
  const {
    sessionId,
    setSessionId,
    status,
    setFile,
    setStatus,
    setMetadata,
    resetSession,
  } = useAppState();

  useEffect(() => {
    const handleVerifySession = async () => {
      if (!sessionId) {
        setSessionId(crypto.randomUUID());
        return;
      }

      api
        .post("/api/session/verify")
        .then((res) => {
          setStatus(res.data.session.status);
          setFile(res.data.session.file);
          setMetadata(res.data.session.metadata);
        })
        .catch((err) => {
          console.error("Error verifying session:", err);
          resetSession();
        });
    };

    handleVerifySession();
  }, []);

  return (
    <ThemeProvider>
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col px-4 pb-4 md:pb-6 md:px-10">
        <Header />
        <main className="flex flex-1 flex-col">
          <Hero />
          {status === "chatting" ? <ChatSection /> : <UploadSection />}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
