import { Term } from "@/components/Term";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePlanStore } from "@/stores/planStore";

function Plan() {
  const schedule = usePlanStore(state => state.schedule);

  return (
    <Accordion type="multiple" className="flex flex-col justify-center">
      {schedule.map((year, yearIndex) => (
        <AccordionItem
          value={`year-${yearIndex + 1}`}
          key={`year-${yearIndex + 1}`}
        >
          <AccordionTrigger className="px-2 py-4 font-bold text-base">{`Year ${
            yearIndex + 1
          }`}</AccordionTrigger>

          <AccordionContent className="grid grid-cols-4 gap-x-2 bg-slate-100 min-h-64">
            {year.map(term => (
              <Term term={term} key={term.dndId} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { Plan };
