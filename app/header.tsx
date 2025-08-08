import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-2xl font-bold" style={{ color: '#111' }}>NicoPin</h1>
      <nav>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-4">
            <SignInButton>
              <span className='text-pink-600'>LogIn</span>
            </SignInButton>
            <SignUpButton />
          </div>
        </SignedOut>
      </nav>
    </header>
  );
}
