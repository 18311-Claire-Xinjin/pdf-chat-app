import api from "@/api";

import { useAppState } from "@/hooks/use-app-state";
import { EXAMPLE_SESSIONS } from "@/lib/example-sessions";

export const useDeleteSession = () => {
  const { sessionId, resetSession, setIsDeletingSession } = useAppState();

  const deleteSession = async () => {
    setIsDeletingSession(true);

    if (EXAMPLE_SESSIONS.some((session) => session.sessionId === sessionId)) {
      resetSession();
      return;
    }

    try {
      await api.delete("/api/session/delete");
      resetSession();
    } catch (err) {
      console.error("Error deleting session:", err);
      setIsDeletingSession(false);
    }
  };

  return {
    deleteSession,
  };
};
