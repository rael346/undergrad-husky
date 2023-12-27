import { Term } from "@/components/Term";
import { usePlanStore } from "@/stores/planStore";
import { useShallow } from "zustand/react/shallow";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export function Year({
  dndId,
  yearIndex,
}: {
  dndId: string;
  yearIndex: number;
}) {
  const year = usePlanStore(useShallow(state => state.schedule[yearIndex]));

  return (
    <AccordionItem value={dndId} className="border rounded-lg divide-y shadow">
      <AccordionHeader className="flex flex-row items-center justify-between px-4 py-2">
        <AccordionTrigger className="group flex flex-1 flex-row items-center justify-start space-x-4">
          <ChevronDownIcon className="group-data-[state=open]:rotate-180 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          <div className="flex flex-col items-start">
            <span className="text-base font-medium">{`Year ${
              yearIndex + 1
            }`}</span>
            <span className="text-sm text-muted-foreground">
              0 credits completed
            </span>
          </div>
        </AccordionTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AccordionHeader>

      <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="grid grid-cols-4 min-h-64 py-2">
          {year.terms
            .map(term => term.dndId)
            .map((termDndId, termIndex) => (
              <Term
                yearIndex={yearIndex}
                termIndex={termIndex}
                termDndId={termDndId}
                key={termDndId}
              />
            ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
