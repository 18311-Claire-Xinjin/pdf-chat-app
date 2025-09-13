import api from "@/api";

import { useAppState } from "@/hooks/use-app-state";

export const useDeleteSession = () => {
  const { resetSession, setIsDeletingSession } = useAppState();

  const deleteSession = () => {
    setIsDeletingSession(true);

    api
      .delete("/api/session/delete")
      .then(() => {
        resetSession();
      })
      .catch((err) => {
        console.error("Error deleting session:", err);
        setIsDeletingSession(false);
      });
  };

  return {
    deleteSession,
  };
};
