"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import ImageExtension from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Code,
  Strikethrough,
  Eraser,
  Highlighter,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Image as ImageIcon,
  ChevronDown,
  Upload,
  Loader2,
} from "lucide-react";
import { uploadBlogImageAction } from "@/app/actions/blog";

const EDITOR_EXTENSIONS = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5],
    },
    // Disabled here because they are configured explicitly below.
    // StarterKit includes Link & Underline by default — passing them
    // again would cause Tiptap "Duplicate extension names" warnings.
    link: false,
    underline: false,
  } as any),
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-brand-navy underline cursor-pointer hover:text-slate-900 font-bold",
    },
  }),
  Superscript,
  Subscript,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  ImageExtension.configure({
    HTMLAttributes: {
      class: "max-w-full h-auto rounded-2xl shadow-md my-6 block mx-auto border border-slate-200",
    },
  }),
  Highlight.configure({
    multicolor: true,
  }),
];

interface RichTextEditorProps {
  content: string;
  onChange: (richText: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: EDITOR_EXTENSIONS,
    immediatelyRender: false,
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[320px] p-5 text-slate-800 placeholder-slate-400 bg-white border border-slate-200 rounded-b-2xl focus:ring-1 focus:ring-brand-navy font-sans",
      },
    },
  });

  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) return null;

  const handleOpenLinkEditor = () => {
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkUrl(previousUrl);
    setShowLinkInput(true);
  };

  const handleApplyLink = () => {
    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
    }
    setShowLinkInput(false);
  };

  const handleRemoveLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkUrl("");
    setShowLinkInput(false);
  };

  const handleInsertImage = () => {
    if (imageUrl.trim() !== "") {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
    setShowImageInput(false);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "blog");

    try {
      const res = await uploadBlogImageAction(formData);
      if (res.url) {
        editor.chain().focus().setImage({ src: res.url }).run();
        setShowImageInput(false);
      }
    } catch (err) {
      console.error("Failed to upload image:", err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const getBtnClass = (isActive: boolean) => {
    const base = "p-2 rounded-lg transition-all duration-200 cursor-pointer";
    return isActive
      ? `${base} bg-slate-200 text-brand-navy font-bold border border-slate-300`
      : `${base} text-slate-600 hover:bg-slate-100 hover:text-brand-navy`;
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
      {/* EDITOR TOOLBAR */}
      <div className="flex flex-wrap gap-1 items-center border-b border-slate-200 bg-slate-50 p-3">
        {/* HISTORY */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 mx-1" />

        {/* HEADINGS DROPDOWN */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 p-2 rounded-lg text-slate-700 hover:bg-slate-200 cursor-pointer text-xs font-bold"
            title="Headings"
          >
            <span>H</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {showDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-white border border-slate-200 rounded-xl p-1 shadow-xl z-50 flex flex-col min-w-[130px]">
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().setParagraph().run();
                  setShowDropdown(false);
                }}
                className="px-3 py-1.5 text-xs text-left hover:bg-slate-100 rounded-lg text-slate-700"
              >
                Paragraph
              </button>
              <div className="h-[1px] bg-slate-100 my-1" />
              {([1, 2, 3, 4, 5] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level }).run();
                    setShowDropdown(false);
                  }}
                  className={`px-3 py-1.5 text-xs text-left hover:bg-slate-100 rounded-lg ${
                    editor.isActive("heading", { level })
                      ? "bg-slate-200 text-brand-navy font-bold"
                      : "text-slate-700"
                  }`}
                >
                  Heading {level}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={getBtnClass(editor.isActive("bulletList"))}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={getBtnClass(editor.isActive("orderedList"))}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={getBtnClass(editor.isActive("blockquote"))}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 mx-1" />

        {/* CHARACTER STYLES */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={getBtnClass(editor.isActive("bold"))}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={getBtnClass(editor.isActive("italic"))}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={getBtnClass(editor.isActive("underline"))}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={getBtnClass(editor.isActive("highlight"))}
          title="Marker Highlight"
        >
          <Highlighter className="h-4 w-4" />
        </button>

        {/* HYPERLINK */}
        <div className="relative">
          <button
            type="button"
            onClick={handleOpenLinkEditor}
            className={getBtnClass(editor.isActive("link"))}
            title="Add Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>

          {showLinkInput && (
            <div className="absolute left-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 p-4 shadow-xl z-50 flex items-center gap-2 min-w-[280px]">
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL (https://...)"
                className="flex-1 h-9 rounded-xl border border-slate-200 px-3 text-xs bg-slate-50 text-slate-800"
              />
              <button
                type="button"
                onClick={handleApplyLink}
                className="h-9 px-3 rounded-xl bg-brand-navy text-white text-xs font-bold"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        <div className="h-6 w-[1px] bg-slate-200 mx-1" />

        {/* ALIGNMENT */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={getBtnClass(editor.isActive({ textAlign: "left" }))}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={getBtnClass(editor.isActive({ textAlign: "center" }))}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={getBtnClass(editor.isActive({ textAlign: "right" }))}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 mx-1" />

        {/* IMAGE UPLOAD */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowImageInput(!showImageInput)}
            className="flex items-center gap-1.5 p-2 rounded-lg text-brand-navy hover:bg-slate-200 cursor-pointer text-xs font-bold"
            title="Insert Image"
          >
            <ImageIcon className="h-4 w-4" />
            <span>Add Image</span>
          </button>

          {showImageInput && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 p-4 shadow-xl z-50 flex flex-col gap-3 min-w-[300px]">
              <span className="text-xs font-bold text-slate-800">Insert Image into Article</span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
                id="editor-image-file"
                disabled={isUploadingImage}
              />
              <button
                type="button"
                onClick={() => document.getElementById("editor-image-file")?.click()}
                className="flex items-center justify-center gap-2 h-10 rounded-xl border border-dashed border-slate-300 hover:border-brand-navy bg-slate-50 text-xs font-semibold text-slate-700 hover:text-brand-navy cursor-pointer transition-colors"
                disabled={isUploadingImage}
              >
                {isUploadingImage ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-brand-navy" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 text-brand-navy" />
                    <span>Upload Image File</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <div className="h-[1px] bg-slate-200 flex-1" />
                <span className="text-[10px] text-slate-400 font-bold">OR URL</span>
                <div className="h-[1px] bg-slate-200 flex-1" />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste URL (https://...)"
                  className="flex-1 h-9 rounded-xl border border-slate-200 px-3 text-xs bg-slate-50 text-slate-800"
                />
                <button
                  type="button"
                  onClick={handleInsertImage}
                  className="h-9 px-3 rounded-xl bg-brand-navy text-white text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EDITOR CONTENT CANVAS */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
