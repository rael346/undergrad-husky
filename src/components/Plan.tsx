import { Year } from "@/components/Year";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/stores/planStore";
import { Accordion } from "@radix-ui/react-accordion";
import { PlusIcon } from "@radix-ui/react-icons";
import { useShallow } from "zustand/react/shallow";

function Plan() {
  const yearDndIds = usePlanStore(
    useShallow(state => state.schedule.map(year => year.dndId)),
  );

  const addYear = usePlanStore(state => state.addYear);

  return (
    <div className="flex flex-col space-y-4 w-full pr-8">
      <Accordion
        type="multiple"
        className="flex flex-col justify-center space-y-4"
        defaultValue={yearDndIds}
      >
        {yearDndIds.map((yearDndId, yearIndex) => (
          <Year dndId={yearDndId} location={{ yearIndex }} key={yearDndId} />
        ))}
      </Accordion>

      <Button
        variant="ghost"
        className="justify-start max-w-fit"
        onClick={() => addYear()}
      >
        <PlusIcon />
        <span className="pl-2">Add Year</span>
      </Button>
    </div>
  );
}

export { Plan };
