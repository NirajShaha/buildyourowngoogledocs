"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {type Level} from "@tiptap/extension-heading";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu";
import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

const FontFamilyButton = () => {
  const {editor} = useEditorStore();
  const fonts = [
    {
      label: "Arial", Value: "Arial"
    },
    {
      label: "Times New Roman", Value: "Times New Roman"
    },
    {
      label: "Courier New", Value: "Courier New"
    },
    {
      label: "Georgia", Value: "Georgia"
    },
    {
      label: "Verdana", Value: "Verdana"
    },
    {
      label: "Trebuchet MS", Value: "Trebuchet MS"
    },
    {
      label: "Comic Sans MS", Value: "Comic Sans MS"
    },
    {
      label: "Arial Black", Value: "Arial Black"
    },
    {
      label: "Arial Narrow", Value: "Arial Narrow"
    },
    {
      label: "Arial Rounded MT Bold", Value: "Arial Rounded MT Bold"
    },
    {
      label: "Roboto", Value: "Roboto"
    },
    {
      label: "Franklin Gothic Medium", Value: "Franklin Gothic Medium"
    },
    {
      label: "Garamond", Value: "Garamond"
    },
    {
      label: "Impact", Value: "Impact"
    },
    {
      label: "Calibri", Value: "Calibri"
    },
    {
      label: "Microsoft Sans Serif", Value: "Microsoft Sans Serif"
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
        className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({label, Value}) => (
          <button
          onClick={() => editor?.chain().focus().setFontFamily(Value).run()}
          key={Value}
          className={cn(
            "flex items-center gap-x-2 px-2 py-1  rounded-sm hover:bg-neutral-200/80",
            editor?.getAttributes("textStyle").fontFamily === Value && "bg-neutral-200/80"
          )}
          style={{fontFamily: Value}}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

const HeadingLevelButton = () => {
  const {editor} = useEditorStore();

  const heading = [
    {label: "Normal text", value: 0, fontSize: "16px"},
    {label: "Heading 1", value: 1, fontSize: "32px"},
    {label: "Heading 2", value: 2, fontSize: "24px"},
    {label: "Heading 3", value: 3, fontSize: "20px"},
    {label: "Heading 4", value: 4, fontSize: "18px"},
    {label: "Heading 5", value: 5, fontSize: "16px"},
  ];

  const getCurrentHeading = () => {
    for(let level = 1; level<= 5; level++) {
      if(editor?.isActive("heading", {level})) {
        return `Heading ${level}`;
      }
    }
    return "Normal text"
  }
  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <button
        className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <span className="truncate">
            {getCurrentHeading()}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {heading.map(({label, value, fontSize}) => (
          <button
          onClick={() => {
            if(value === 0){
              editor?.chain().focus().setParagraph().run();
            }else{
              editor?.chain().focus().toggleHeading({level: value as Level}).run();
            }
          }}
          key={value}
          style={{fontSize}}
          className={cn(
            "flex items-center gap-x-2 px-2 py-1  rounded-sm hover:bg-neutral-200/80",
            (value === 0 && !editor?. isActive("heading")) || editor?.isActive("heading", {level: value}) && "bg-neutral-200/80"
          )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const ToolBar = () => {
  const { editor } = useEditorStore();
  console.log("Toolbar editor: ", { editor });

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          console.log("Spell Check");
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comments",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("comment"),
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        isActive: editor?.isActive("removeFormatting"),
      },
    ]
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/*TODO: Font size*/}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/*TODO: Text Color*/}
      {/*TODO: Highlight color*/}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/*TODO: Link*/}
      {/*TODO: Image*/}
      {/*TODO: Align*/}
      {/*TODO: Line Height*/}
      {/*TODO: List*/}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};