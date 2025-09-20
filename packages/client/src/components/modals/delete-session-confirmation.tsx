import { Loader } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useAppState } from "@/hooks/use-app-state";
import { useDeleteSession } from "@/hooks/use-delete-session";

export function DeleteSessionConfirmation({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const { isDeletingSession } = useAppState();
  const { deleteSession } = useDeleteSession();

  const handleDeleteSession = async (e: React.MouseEvent) => {
    e.preventDefault();
    await deleteSession();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this session?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your PDF and all chat history will be
            permanently removed from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeletingSession}
            onClick={handleDeleteSession}
            className="cursor-pointer"
          >
            {isDeletingSession && <Loader className="h-4 w-4 animate-spin" />}
            {isDeletingSession ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
