import { Term } from "@/components/Term";
import { usePlanStore } from "@/stores/planStore";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DndYearLocation } from "@/types";
import { useShallow } from "zustand/react/shallow";

export function Year({
  dndId,
  location,
}: {
  dndId: string;
  location: DndYearLocation;
}) {
  const termDndIds = usePlanStore(
    useShallow(state => state.getTermDndIdsFromYear(location)),
  );

  const deleteYear = usePlanStore(state => state.deleteYear);

  return (
    <AccordionItem
      value={dndId}
      className="border rounded-lg shadow data-[state=open]:bg-accent/30 hover:bg-accent/30"
    >
      <AccordionHeader className="flex flex-row items-center justify-between transition-colors pr-4">
        <AccordionTrigger className="group flex flex-1 flex-row items-center justify-start space-x-2 px-4 py-4">
          <ChevronDownIcon className="group-data-[state=open]:rotate-180 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          <span className="text-base font-medium">{`Year ${
            location.yearIndex + 1
          }`}</span>
          <span className="text-sm text-muted-foreground">0 credits</span>
        </AccordionTrigger>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => deleteYear(location)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AccordionHeader>

      <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="grid grid-cols-4 space-x-2 min-h-64 px-4 pt-2 pb-4">
          {termDndIds.map((termDndId, termIndex) => (
            <Term
              location={{ ...location, termIndex }}
              termDndId={termDndId}
              key={termDndId}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
