"use client"
import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";
import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlus2Icon, FileTextIcon, GlobeIcon, ItalicIcon, Menu, PrinterIcon, Redo2Icon, RemoveFormattingIcon, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { BsFilePdf } from "react-icons/bs";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:background-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="mr-2 size-4" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                        <MenubarItem>
                            <FileJsonIcon className="mr-2 size-4" />
                            JSON
                        </MenubarItem>
                        <MenubarItem>
                            <GlobeIcon className="mr-2 size-4" />
                            HTML
                        </MenubarItem>
                        <MenubarItem>
                            <BsFilePdf className="mr-2 size-4" />
                            PDF
                        </MenubarItem>
                        <MenubarItem>
                            <FileTextIcon className="mr-2 size-4" />
                            Text
                        </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlus2Icon className="mr-2 size-4" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon className="mr-2 size-4" />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className="mr-2 size-4" />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="mr-2 size-4" />
                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:background-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Undo2Icon className="mr-2 size-4" />
                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        <Redo2Icon className="mr-2 size-4" />
                        Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:background-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>Table</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>
                                1 x 1
                            </MenubarItem>
                            <MenubarItem>
                                2 x 2
                            </MenubarItem>
                            <MenubarItem>
                                3 x 3
                            </MenubarItem>
                            <MenubarItem>
                                4 x 4
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:background-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            <TextIcon className="mr-2 size-4" />
                            Text
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>
                                <BoldIcon className="mr-2 size-4" />
                                Bold <MenubarShortcut>⌘B</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>
                                <ItalicIcon className="mr-2 size-4" />
                                Italic <MenubarShortcut>⌘I</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>
                                <UnderlineIcon className="mr-2 size-4" />
                                Underline <MenubarShortcut>⌘U</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>
                                <StrikethroughIcon className="mr-2 size-4" />
                                <span>Strikethrough&nbsp;&nbsp;</span> <MenubarShortcut>⌘S</MenubarShortcut>
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem>
                        <RemoveFormattingIcon className="mr-2 size-4" />
                        Clear Formatting
                    </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};
