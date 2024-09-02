import { useEffect, useState, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import fuzzysort from "fuzzysort";

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
        "bg-muted/50",
        "border-border-foreground border",
        "flex flex-row items-center justify-start gap-2",
        "h-10 w-full",
        "rounded-lg",
        "min-w-96",
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
  description: string;
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
  const [results, setResults] = useState<Section[]>(sections);

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

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (!value) {
      setResults(sections);
      return;
    }

    const results = sections.map(({ name, items }) => ({
      name,
      items: fuzzysort
        .go(value, items, {
          keys: [(x) => x.name, (x) => x.description],
        })
        .map((result) => result.obj),
    }));

    setResults(results);
  }

  return (
    <>
      <SearchBox onClick={() => setOpen(true)}>{children}</SearchBox>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          className="py-8 text-lg"
          placeholder="Search for a utility by name..."
        />
        <CommandList onChange={handleSearch}>
          <CommandEmpty>No results found.</CommandEmpty>
          {results.map(({ name: section, items }) => (
            <CommandGroup key={section} heading={section}>
              {items.map((item) => (
                <CommandItem
                  onSelect={() => (window.location.href = item.link)}
                  key={item.name}
                  className="flex flex-col items-start justify-start gap-1"
                >
                  <h6 className="text-base font-semibold">{item.name}</h6>
                  <p className="text-muted-foreground">
                    {item.description.split(".")[0] + "."}
                  </p>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
