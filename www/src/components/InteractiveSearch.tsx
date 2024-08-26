import { useEffect, useState, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface SearchBoxProps extends HTMLAttributes<HTMLButtonElement> {}

function SearchBox({ children, className, ...props }: SearchBoxProps) {
  return (
    <button
      {...props}
      className={cn(
        "cursor-pointer",
        "bg-muted/75",
        "flex flex-row items-center justify-start gap-2",
        "h-10 w-full",
        "rounded-md",
        "px-3 py-2",
        "transition-all duration-300 ease-in-out",
        "text-muted-foreground text-sm",
        "ring-offset-muted",
        "active:opacity-50",
        "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}

interface Item {
  name: string;
  link: string;
}

interface Section {
  name: string;
  items: Item[];
}
interface SearchProps {
  hotkey: string;
  sections: Section[];
  children: React.ReactNode | React.ReactNode[];
}

export function InteractiveSearch({ hotkey, children, sections }: SearchProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === hotkey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <SearchBox onClick={() => setOpen(true)}>{children}</SearchBox>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {sections.map(({ name: section, items }) => (
            <CommandGroup heading={section}>
              {items.map((item) => (
                <CommandItem>{item.name}</CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
