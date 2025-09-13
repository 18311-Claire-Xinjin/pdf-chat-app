import { useAppState } from "@/hooks/use-app-state";
import { PdfIcon } from "@/svgs";
import { PdfDetailsModal } from "../modals/pdf-details-modal";

export function ViewPdfButton() {
  const { file } = useAppState();

  if (!file) {
    return;
  }

  return (
    <PdfDetailsModal>
      <button className="w-0 flex-1 min-w-0">
        <div className="cursor-pointer border border-muted/50 bg-muted/30 rounded-md px-2 py-1 flex items-center gap-1 justify-center text-muted-foreground hover:text-foreground transition-colors duration-200 max-w-fit">
          <PdfIcon className="shrink-0 size-5" />

          <p className="text-sm font-bricolage align-baseline truncate">
            {file.name}
          </p>
        </div>
      </button>
    </PdfDetailsModal>
  );
}
