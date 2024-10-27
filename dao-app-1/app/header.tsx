import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="my-1 border-b border-gray-300">
      <div className="ml-5 flex">
        <Link className="flex items-center" href="/">
          <Image
                src="/backtheblock-logo.png"
                width={44}
                height={44}
                alt="Webpage Logo"
              />
          <h1 className="text-black ml-3 font-black tracking-tighter text-xl">BackTheBlock</h1>
        </Link>
        <div className="hidden w-full flex-grow sm:flex sm:w-auto mt-3">
          <div className="sm:flex-grow ml-8 text-zinc-300 font-light text-sm">
            <Link className="block mt-4 sm:inline-block h-full sm:mt-0 pl-4 pr-4 hover:border-b-2 border-blue-600" href="/discover"><p className="text-gray-600">Discover</p></Link>
            <Link className="block mt-4 sm:inline-block h-full sm:mt-0 pl-4 pr-4 hover:border-b-2 border-blue-600" href="/dashboard/donate"><p className="text-gray-600">Donate</p></Link>
            <Link className="block mt-4 sm:inline-block h-full sm:mt-0 pl-4 pr-4 hover:border-b-2 border-blue-600" href="/dashboard/vote"><p className="text-gray-600">Vote</p></Link>
            <Link className="block mt-4 sm:inline-block h-full sm:mt-0 pl-4 pr-4 hover:border-b-2 border-blue-600" href="/dashboard/add-your-business"><p className="text-gray-600">Add your Business</p></Link>
          </div>
        </div>
      </div>
    </header>
  )
}