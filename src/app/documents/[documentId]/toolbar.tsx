"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {type Level} from "@tiptap/extension-heading";
import {type ColorResult, CirclePicker, SketchPicker} from 'react-color';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FontSizeButton = () => {
  const {editor} = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize 
   ? editor?.getAttributes("textStyle").fontSize.replace("px","")
   : "16";

   const [fontSize, setFontSize] = useState(currentFontSize);
   const [inputValue, setInputValue] = useState(fontSize);
   const [isEditing, setIsEditing] = useState(false);

   const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if(!isNaN(size) && size > 0){
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
   }

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setInputValue(e.target.value);
   };

   const handleInputBlur = () => {
     updateFontSize(inputValue);
   };

   const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
     if(e.key === "Enter"){
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
   };
  }

   const increment = () => {
    const newSize = parseInt(fontSize)+1;
    updateFontSize(newSize.toString());
   };

   const decrement = () => {
    const newSize = parseInt(fontSize)-1;
    if(newSize > 0){
      updateFontSize(newSize.toString());
    }
   };


  return(
    <div className="flex items-center gap-x-0.5">
      <button
      onClick={decrement}
      className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input 
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transper focus:outline-none focus:ring-0"
        />
      ) : (
        <button
        onClick={() => {
          setIsEditing(true);
          setFontSize(currentFontSize)
        }}
        className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent cursor-text"
        >
          {currentFontSize}
        </button>
      )}
      <button
      onClick={increment}
      className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  )
}


const ListButton = () => {
  const {editor} = useEditorStore();

  const lists = [
    {
      label:"Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label:"Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ]

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
        className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
      {lists.map(({label, icon: Icon, onClick, isActive}) => (
        <button
        key={label}
        onClick={onClick}
        className={cn(
          "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
          isActive() && "bg-neutral-200/80"
        )}
        >
          <Icon className="size-4"/>
          <span className="text-sm">{label}</span>
        </button>
      ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const AlignButton = () => {
  const {editor} = useEditorStore();
  const alignments = [
    {
      label:"Align Left",
      value:"left",
      icon: AlignLeftIcon
    },
    {
      label:"Align Justify",
      value:"justify",
      icon: AlignJustifyIcon
    },
    {
      label:"Align center",
      value:"center",
      icon: AlignCenterIcon
    },
    {
      label:"Align Right",
      value:"right",
      icon: AlignRightIcon
    },
  ]

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
        className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
      {alignments.map(({label, value, icon: Icon}) => (
        <button
        key={value}
        onClick={() => editor?.chain().focus().setTextAlign(value).run()}
        className={cn(
          "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
          editor?.isActive("textAlign", value) && "bg-neutral-200/80"
        )}
        >
          <Icon className="size-4"/>
          <span className="text-sm">{label}</span>
        </button>
      ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ImageButton = () => {
  const {editor} = useEditorStore();

  const[isDialogueOpen, setIsDialogueOpen] = useState(false);
  const[imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({src}).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if(file){
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    }

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if(imageUrl){
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogueOpen(false);
    }
  }

    return(
      <>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="mr-2 size-4" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogueOpen(true)}>
            <SearchIcon className="mr-2 size-4" />
            Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogueOpen} onOpenChange={setIsDialogueOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <Input placeholder="Insert image url" 
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter"){
              handleImageUrlSubmit();
            }
          }}
          />
          <DialogFooter>
          <Button onClick={handleImageUrlSubmit}>
            Insert
          </Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
      </>
    )
};

const LinkButton = () => {
  const {editor} = useEditorStore();

  const[value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({href}).run();
    setValue("");
  };

    return(
      <DropdownMenu onOpenChange={(open) => {
        if(open){
          setValue(editor?.getAttributes("link").href || "");
        }
      }}>
        <DropdownMenuTrigger asChild>
          <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <Link2Icon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
          <Input placeholder="https://example.com" value={value} onChange={(e) => setValue(e.target.value)}/>
          <Button onClick={() => onChange(value)}>
            Apply
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    )
};

const HighlightColorButton = () => {
  const {editor} = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#000000";  

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({color: color.hex}).run();
  };

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
        className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
      {/*
      <CirclePicker
        color={value}
        onChange={onChange}
        />
        */}
        <SketchPicker
        color={value}
        onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TextColorButton = () => {
  const {editor} = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
        className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <span className="text-xs">A</span>
          <div className="h-0.5 w-full" style={{backgroundColor: value}}></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
      {/*
      <CirclePicker
        color={value}
        onChange={onChange}
        />
        */}
        <SketchPicker
        color={value}
        onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


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
      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      {/*TODO: Line Height*/}
      <ListButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
