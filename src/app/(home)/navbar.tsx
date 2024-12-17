import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Avatars } from "../documents/[documentId]/avatar";

export const Navbar = () => {
    return(
        <nav className="flex items-center justify-between h-full w-full">
            <div className="flex items-center gap-3 shrink-0 pr-6">
                <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={36} height={36} />
                </Link>
                <h3 className="text-xl">Docs</h3>
            </div>
            <SearchInput />
            <div className="flex gap-3 items-center pl-6">
                <Avatars />
                <OrganizationSwitcher 
                afterCreateOrganizationUrl="/"
                afterLeaveOrganizationUrl="/"
                afterSelectOrganizationUrl="/"
                afterSelectPersonalUrl="/"
                />
                <UserButton />  
            </div>
        </nav>
    )
}