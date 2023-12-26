import { ThemeToggle } from "@/components/ThemeToggle";
import { GraduationCap } from "lucide-react";

export function Header() {
  return (
    <div className="flex flex-row justify-between items-center px-8 py-3 border-b">
      <span className="flex flex-row justify-start space-x-2">
        <GraduationCap />
        <span className="text-md font-bold">Undergrad Husky</span>
      </span>
      <ThemeToggle />
    </div>
  );
}
