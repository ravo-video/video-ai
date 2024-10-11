import { Metadata } from 'next';
import Link from 'next/link';

import { signInWithGoogle } from './actions';
import { SignInWithGoogleButton } from './sign-in-with-google-button';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Ravo</h1>
            <p className="text-muted-foreground text-sm">
              Adicione legendas nos seus vídeos automaticamente.
            </p>
          </div>
        </div>
        <form action={signInWithGoogle} method="POST">
          <SignInWithGoogleButton />
        </form>
        <p className="text-muted-foreground px-8 text-center text-sm leading-relaxed">
          Ao clicar em entrar, você concorda com nossos{' '}
          <Link
            href="/terms"
            className="hover:text-primary underline underline-offset-4"
            target="_blank"
            rel="noreferrer">
            Termos de serviço
          </Link>{' '}
          e{' '}
          <Link
            href="/privacy"
            className="hover:text-primary underline underline-offset-4"
            target="_blank"
            rel="noreferrer">
            Política de privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
