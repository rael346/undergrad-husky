import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <div className="flex flex-row justify-between items-center px-6 py-3">
      <span className="text-lg font-bold">Undergrad Husky</span>
      <ThemeToggle />
    </div>
  );
}
