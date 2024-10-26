import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className="border-b border-gray-300">
      <div className="ml-5 py-1 flex items-center">
        <Link className="flex items-center" href="./">
          <Image
                src="/backtheblock-logo.png"
                width={44}
                height={44}
                alt="Webpage Logo"
              />
          <h1 className="text-black ml-3 ">BackTheBlock</h1>
        </Link>
        <div className="hidden w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="sm:flex-grow text-zinc-300 font-light">
            <Link className="block mt-4 sm:inline-block sm:mt-0 ml-12 mr-8" href="./"><p className="text-gray-600">Discover</p></Link>
            <Link className="block mt-4 sm:inline-block sm:mt-0 mr-8" href="./"><p className="text-gray-600">Donate</p></Link>
            <Link className="block mt-4 sm:inline-block sm:mt-0 mr-8" href="./"><p className="text-gray-600">Vote</p></Link>
            <Link className="block mt-4 sm:inline-block sm:mt-0" href="./"><p className="text-gray-600">Add your Business</p></Link>
          </div>
        </div>
      </div>
    </div>
  )
}