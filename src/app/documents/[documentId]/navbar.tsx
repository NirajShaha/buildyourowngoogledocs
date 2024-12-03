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
import { useEditorStore } from "@/store/use-editor-store";

export const Navbar = () => {
    const {editor} = useEditorStore();

    const insertTable = ({rows, cols}: {rows: number, cols: number}) => {
        editor
        ?.chain()
        .focus()
        .insertTable({rows, cols, withHeaderRow: false})
        .run();
    };

    const onDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    }

    const onSaveJson = () => {
        if(!editor) return;
        const content = editor.getJSON();
        const blob = new Blob([JSON.stringify(content)], { type: "application/json" });
        onDownload(blob, "document.json");
    }

    const onSaveHTML = () => {
        if(!editor) return;
        const content = editor.getHTML();
        const blob = new Blob([content], { type: "text/html" });
        onDownload(blob, "document.html");
    }

    const onSaveText = () => {
        if(!editor) return;
        const content = editor.getText();
        const blob = new Blob([content], { type: "text/plain" });
        onDownload(blob, "document.txt");
    }



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
                        <MenubarItem onClick={onSaveJson}>
                            <FileJsonIcon className="mr-2 size-4" />
                            JSON
                        </MenubarItem>
                        <MenubarItem onClick={onSaveHTML}>
                            <GlobeIcon className="mr-2 size-4" />
                            HTML
                        </MenubarItem>
                        <MenubarItem onClick={() => window.print()}>
                            <BsFilePdf className="mr-2 size-4" />
                            PDF
                        </MenubarItem>
                        <MenubarItem onClick={onSaveText}>
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
                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                        <Undo2Icon className="mr-2 size-4" />
                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
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
                            <MenubarItem onClick={() => insertTable({rows: 1, cols: 1})}>
                                1 x 1
                            </MenubarItem>
                            <MenubarItem onClick={() => insertTable({rows: 2, cols: 2})}>
                                2 x 2
                            </MenubarItem>
                            <MenubarItem onClick={() => insertTable({rows: 3, cols: 3})}>
                                3 x 3
                            </MenubarItem>
                            <MenubarItem onClick={() => insertTable({rows: 4, cols: 4})}>
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
                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                <BoldIcon className="mr-2 size-4" />
                                Bold <MenubarShortcut>⌘B</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                <ItalicIcon className="mr-2 size-4" />
                                Italic <MenubarShortcut>⌘I</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                <UnderlineIcon className="mr-2 size-4" />
                                Underline <MenubarShortcut>⌘U</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                                <StrikethroughIcon className="mr-2 size-4" />
                                <span>Strikethrough&nbsp;&nbsp;</span> <MenubarShortcut>⌘S</MenubarShortcut>
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
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