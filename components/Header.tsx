import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center"></div>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Scripted Symphony, Where Texts{" "}
        <a
          href=""
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Create Harmony.
        </a>{" "}
      </p>

      <div className="inline-block">
        
        <Link href="/explore">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full">
            Get Started
            <span className="inline-block w-2 border-white h-2 border-t-2 border-r-2 transform rotate-45 -mt-1 ml-6"></span>
          </button>
        </Link>
      </div>

      <div className="w-full p-[5px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4" />
    </div>
  );
}
