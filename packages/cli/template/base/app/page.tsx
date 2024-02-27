import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#3730a3] to-[#312e81]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Next <span className="text-[hsl(219,100%,70%)]">Kickstart</span>
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-[#fff2] p-4 hover:bg-[#fff3]"
            href="https://kickstart-docs.vercel.app/"
            target="_blank"
          >
            <h3 className="text-xl font-bold">First Steps →</h3>
            <p>
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </p>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-[#fff2] p-4 hover:bg-[#fff3]"
            href="https://kickstart-docs.vercel.app/"
            target="_blank"
          >
            <h3 className="text-xl font-bold">Documentation →</h3>
            <p>
              Learn more about Next Kickstart, the libraries it uses, and how to
              deploy it.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
