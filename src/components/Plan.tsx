import { Year } from "@/components/Year";
import { usePlanStore } from "@/stores/planStore";
import { Accordion } from "@radix-ui/react-accordion";
import { useShallow } from "zustand/react/shallow";

function Plan() {
  const yearDndIds = usePlanStore(
    useShallow(state => state.schedule.map(year => year.dndId)),
  );

  return (
    <Accordion
      type="multiple"
      className="flex flex-col justify-center w-full space-y-4 px-8"
      defaultValue={yearDndIds}
    >
      {yearDndIds.map((yearDndId, yearIndex) => (
        <Year dndId={yearDndId} location={{ yearIndex }} key={yearDndId} />
      ))}
    </Accordion>
  );
}

export { Plan };
