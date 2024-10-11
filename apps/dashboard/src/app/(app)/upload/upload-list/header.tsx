'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/components/ui/alert-dialog';
import { Button } from '@repo/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdown-menu';
import { Separator } from '@repo/ui/components/ui/separator';
import { ChevronDownIcon, Loader2, TextIcon, Wand2Icon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface HeaderProps {
  onSubmit: () => void;
}

export function Header({ onSubmit }: HeaderProps) {
  const {
    formState: { isSubmitting },
    setValue,
  } = useFormContext();

  return (
    <div className="flex items-center justify-between space-x-6">
      <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
        Upload
        {false && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </h2>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="flex gap-2"
              disabled={false || isSubmitting}>
              {false ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Wand2Icon className="h-3 w-3" />
              )}
              AI Tools
              <ChevronDownIcon className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled={false} onSelect={() => {}}>
              <TextIcon className="mr-2 h-4 w-4" />
              <span>Generate titles</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6" />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="ghost" disabled={false || isSubmitting}>
              Clear all
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action can&apos;t be undone and all uploads will be deleted
                from the server.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => {}}>
                Prosseguir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          type="button"
          size="sm"
          className="w-32"
          disabled={false || isSubmitting}
          onClick={onSubmit}>
          {isSubmitting ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <>Create all ({0})</>
          )}
        </Button>
      </div>
    </div>
  );
}
