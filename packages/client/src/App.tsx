import { useEffect } from "react";

import api from "./api";

import { ThemeProvider } from "./providers/theme-provider";

import { Header } from "@/components/layout/header";
import { Hero } from "./components/layout/hero";
import { UploadSection } from "./components/app/upload-section";
import { ChatSection } from "./components/app/chat-section";

import { useAppState } from "./hooks/use-app-state";

function App() {
  const { sessionId, setSessionId, file, setFile } = useAppState();

  useEffect(() => {
    const handleVerifySession = async () => {
      if (!sessionId) {
        setSessionId(crypto.randomUUID());
        return;
      }

      api
        .post("/api/session/verify")
        .then((res) => {
          setFile(res.data.session.file);
        })
        .catch((err) => {
          console.error("Error verifying session:", err);
        });
    };

    handleVerifySession();
  }, []);

  return (
    <ThemeProvider>
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col px-6 pb-6 md:px-10">
        <Header />
        <main className="flex flex-1 flex-col gap-8 pt-16 sm:pt-28">
          <Hero />
          {file ? <ChatSection /> : <UploadSection />}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
