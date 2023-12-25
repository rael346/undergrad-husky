import { Term } from "@/components/Term";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePlanStore } from "@/stores/planStore";
import { useShallow } from "zustand/react/shallow";

function Plan() {
  const yearDndIds = usePlanStore(
    useShallow(state => state.schedule.map(year => year.dndId)),
  );

  return (
    <Accordion type="multiple" className="flex flex-col justify-center">
      {yearDndIds.map((yearDndId, yearIndex) => (
        <Year dndId={yearDndId} yearIndex={yearIndex} key={yearDndId} />
      ))}
    </Accordion>
  );
}

function Year({ dndId, yearIndex }: { dndId: string; yearIndex: number }) {
  const year = usePlanStore(useShallow(state => state.schedule[yearIndex]));

  return (
    <AccordionItem
      value={`year-${yearIndex + 1}`}
      key={`year-${yearIndex + 1}`}
    >
      <AccordionTrigger className="px-2 py-4 font-bold text-base">{`Year ${
        yearIndex + 1
      }`}</AccordionTrigger>

      <AccordionContent className="grid grid-cols-4 gap-x-2 bg-slate-100 min-h-64">
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
      </AccordionContent>
    </AccordionItem>
  );
}

export { Plan };
