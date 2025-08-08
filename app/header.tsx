import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-2xl font-bold" style={{ color: '#111' }}>PinClone</h1>
      <nav>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <span style={{ color: '#111' }}>Sign in</span>
          </SignInButton>
          <SignUpButton />
        </SignedOut>
      </nav>
    </header>
  );
}
