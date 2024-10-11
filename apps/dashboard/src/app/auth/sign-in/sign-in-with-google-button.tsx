'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { FcGoogle } from 'react-icons/fc';

export function SignInWithGoogleButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant="outline"
      type="submit"
      className="w-full">
      {pending ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <FcGoogle className="mr-2 size-4" />
      )}
      Entrar com o Google
    </Button>
  );
}
