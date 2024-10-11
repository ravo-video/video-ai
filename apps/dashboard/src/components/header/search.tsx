'use client';

import { Button } from '@repo/ui/components/ui/button';
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@repo/ui/components/ui/command';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import useDebouncedValue from '@/hooks/use-debounced-value';

export function Search() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const searchTerm = useDebouncedValue(search, 300);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex w-[240px] items-center justify-between text-muted-foreground"
        onClick={() => setOpen(true)}>
        Buscar videos...
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-semibold text-muted-foreground opacity-100">
          <span className="text-sm">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Buscar videos..."
        />
        <CommandList className="h-auto">
          <CommandGroup heading="Recent uploads"></CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
