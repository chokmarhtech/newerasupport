# Tiptap Editor Implementation Guide

This directory contains the documentation and references for replicating the custom Tiptap editor implementation in another React / Next.js / Tailwind CSS project.

---

## 1. Package Dependencies

Add these packages to your `package.json` dependencies:

```json
{
  "dependencies": {
    "@tiptap/react": "^3.28.0",
    "@tiptap/starter-kit": "^3.28.0",
    "@tiptap/extension-link": "^3.28.0",
    "@tiptap/extension-underline": "^3.28.0",
    "@tiptap/extension-superscript": "^3.29.1",
    "@tiptap/extension-subscript": "^3.29.1",
    "@tiptap/extension-text-align": "^3.29.1",
    "@tiptap/extension-image": "^3.29.1",
    "@tiptap/extension-highlight": "^3.29.1",
    "lucide-react": "^0.462.0",
    "sonner": "^1.7.4"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.16"
  }
}
```

---

## 2. Tailwind Typography Integration

Tiptap outputs raw, semantic HTML tags (e.g. `<h1>`, `<p>`, `<blockquote>`, `<ul>`, `<li>`, `<img>`). To render these styles instantly, register the `@tailwindcss/typography` plugin in your Tailwind configuration file:

### `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

export default {
  // ... configuration options
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"), // <--- Add this typography plugin
  ],
} satisfies Config;
```

---

## 3. Local Filesystem Image Upload (Server Action)

This Next.js server action handles file streams securely, sanitizes the folders, generates unique timestamps to prevent file overwrites, and outputs a web-relative path.

### `app/admin/actions.ts`

```typescript
'use server';

import fs from "fs";
import path from "path";

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { error: "No file provided" };
    }

    const folder = (formData.get("folder") as string) || "general";
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9-]/g, "_");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Make sure public/uploads/[folder]/ directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", sanitizedFolder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Build unique, secure file path
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    await fs.promises.writeFile(filePath, buffer);

    // Return the relative URL path to be used by the editor src tag
    return { url: `/uploads/${sanitizedFolder}/${uniqueFilename}` };
  } catch (error: any) {
    console.error("Local upload error:", error);
    return { error: error.message || "Failed to upload image" };
  }
}
```

---

## 4. Reusable Editor Component

This component includes client-side image compression (via HTML5 Canvas API), floating dropdown buttons for headings, hyperlinks control, standard text styling (subscripts, superscripts, highlight, alignments, inline code block, and blockquotes), and local image file/web URL insertion selectors.

### `components/rich-text-editor.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import TextAlign from '@tiptap/extension-text-align';
import ImageExtension from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
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
  Loader2
} from 'lucide-react';
import { uploadImageAction } from '@/app/admin/actions';
import { toast } from 'sonner';

// 1. Configure Tiptap Extensions
const EDITOR_EXTENSIONS = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5],
    },
  }),
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-blue-600 underline cursor-pointer hover:text-blue-800',
    },
  }),
  Superscript,
  Subscript,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  ImageExtension.configure({
    HTMLAttributes: {
      class: 'max-w-full h-auto rounded-xl shadow-md my-4 block mx-auto',
    },
  }),
  Highlight.configure({
    multicolor: true,
  }),
];

// 2. Client-side Image Resizing & JPEG Compression (via Canvas API)
const compressImage = (file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

interface RichTextEditorProps {
  content: string;
  onChange: (richText: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: EDITOR_EXTENSIONS,
    immediatelyRender: false, // Prevents SSR hydration mismatches in Next.js App Router
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-6 text-foreground placeholder-muted-foreground bg-card border border-border rounded-b-2xl focus:ring-0',
      },
    },
  });

  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor) return null;

  const handleOpenLinkEditor = () => {
    const previousUrl = editor.getAttributes('link').href || '';
    setLinkUrl(previousUrl);
    setShowLinkInput(true);
  };

  const handleApplyLink = () => {
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setShowLinkInput(false);
  };

  const handleRemoveLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setLinkUrl('');
    setShowLinkInput(false);
  };

  const handleInsertImage = () => {
    if (imageUrl.trim() !== '') {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
    }
    setShowImageInput(false);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    let fileToUpload = file;
    try {
      if (file.type.startsWith('image/')) {
        fileToUpload = await compressImage(file);
      }
    } catch (err) {
      console.error("Compression failed, uploading original:", err);
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("folder", "editor");

    try {
      const res = await uploadImageAction(formData);
      if (res.error) {
        toast.error(res.error);
      } else if (res.url) {
        editor.chain().focus().setImage({ src: res.url }).run();
        toast.success("Image uploaded and inserted successfully!");
        setShowImageInput(false);
      }
    } catch (err) {
      toast.error("Failed to upload image.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const getBtnClass = (isActive: boolean, activeColor = 'bg-primary/20 text-primary') => {
    const base = 'p-2 rounded-lg transition-all duration-200 cursor-pointer';
    return isActive 
      ? `${base} ${activeColor}`
      : `${base} text-muted-foreground hover:bg-muted hover:text-foreground`;
  };

  return (
    <div className="w-full rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap gap-1 items-center border-b border-border bg-muted/20 p-3">
        
        {/* 1. History Controls */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground disabled:opacity-30 cursor-pointer"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground disabled:opacity-30 cursor-pointer"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>

        <div className="h-6 w-[1px] bg-border mx-1" />

        {/* 2. Block Formatting (Custom Simple Dropdown) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer text-xs font-semibold"
            title="Headings"
          >
            <span>H</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {showDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg p-1 shadow-lg z-50 flex flex-col min-w-[120px]">
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().setParagraph().run();
                  setShowDropdown(false);
                }}
                className="px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-zinc-800 rounded text-foreground"
              >
                Paragraph
              </button>
              <div className="h-[1px] bg-gray-200 dark:bg-zinc-800 my-1" />
              {([1, 2, 3, 4, 5] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level }).run();
                    setShowDropdown(false);
                  }}
                  className={`px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-zinc-800 rounded ${
                    editor.isActive('heading', { level }) ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground'
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
          className={getBtnClass(editor.isActive('bulletList'))}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={getBtnClass(editor.isActive('orderedList'))}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={getBtnClass(editor.isActive('codeBlock'))}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={getBtnClass(editor.isActive('blockquote'))}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </button>

        <div className="h-6 w-[1px] bg-border mx-1" />

        {/* 3. Character Styles */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={getBtnClass(editor.isActive('bold'))}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={getBtnClass(editor.isActive('italic'))}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={getBtnClass(editor.isActive('strike'))}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={getBtnClass(editor.isActive('code'))}
          title="Inline Code"
        >
          <Code className="h-4 w-4 opacity-70" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={getBtnClass(editor.isActive('underline'))}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={getBtnClass(editor.isActive('highlight'))}
          title="Highlight / Marker"
        >
          <Highlighter className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          title="Clear Formatting"
        >
          <Eraser className="h-4 w-4" />
        </button>

        {/* Hyperlink Dialog */}
        <div className="relative">
          <button
            type="button"
            onClick={handleOpenLinkEditor}
            className={getBtnClass(editor.isActive('link'), 'bg-primary/20 text-primary font-bold')}
            title="Add/Edit Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>

          {showLinkInput && (
            <div className="absolute left-0 top-full mt-2 bg-card rounded-2xl border border-border p-4 shadow-elevated z-50 flex items-center gap-2 min-w-[280px]">
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL (e.g. https://...)"
                className="flex-1 h-9 rounded-xl border border-border px-3 text-xs focus:outline-none focus:border-primary bg-background text-foreground"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyLink();
                  if (e.key === 'Escape') setShowLinkInput(false);
                }}
                autoFocus
              />
              <button
                type="button"
                onClick={handleApplyLink}
                className="h-9 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 cursor-pointer transition-opacity"
              >
                Apply
              </button>
              {editor.isActive('link') && (
                <button
                  type="button"
                  onClick={handleRemoveLink}
                  className="h-9 px-3 rounded-xl border border-border text-muted-foreground text-xs font-bold hover:bg-destructive/10 hover:text-destructive cursor-pointer transition-colors"
                >
                  Unlink
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowLinkInput(false)}
                className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="h-6 w-[1px] bg-border mx-1" />

        {/* 4. Superscript / Subscript */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={getBtnClass(editor.isActive('superscript'))}
          title="Superscript"
        >
          <SuperscriptIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={getBtnClass(editor.isActive('subscript'))}
          title="Subscript"
        >
          <SubscriptIcon className="h-4 w-4" />
        </button>

        <div className="h-6 w-[1px] bg-border mx-1" />

        {/* 5. Alignments */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={getBtnClass(editor.isActive({ textAlign: 'left' }))}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={getBtnClass(editor.isActive({ textAlign: 'center' }))}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={getBtnClass(editor.isActive({ textAlign: 'right' }))}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={getBtnClass(editor.isActive({ textAlign: 'justify' }))}
          title="Align Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </button>

        <div className="h-6 w-[1px] bg-border mx-1" />

        {/* 6. Media Manager Upload / Attachment */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowImageInput(prev => !prev)}
            className="flex items-center gap-1.5 p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer text-xs font-semibold"
            title="Insert Image"
          >
            <ImageIcon className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">Add</span>
          </button>

          {showImageInput && (
            <div className="absolute right-0 top-full mt-2 bg-card rounded-2xl border border-border p-4 shadow-elevated z-50 flex flex-col gap-3 min-w-[320px]">
              <span className="text-xs font-bold text-foreground">Add Image</span>
              
              {/* Option A: Device File Upload */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">From Device</span>
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
                  onClick={() => document.getElementById('editor-image-file')?.click()}
                  className="flex items-center justify-center gap-2 h-9 rounded-xl border border-dashed border-border hover:border-primary hover:bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  disabled={isUploadingImage}
                >
                  {isUploadingImage ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 text-primary" />
                      <span>Upload from Device</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-[1px] bg-border flex-1" />
                <span className="text-[10px] text-muted-foreground font-bold">OR</span>
                <div className="h-[1px] bg-border flex-1" />
              </div>

              {/* Option B: Direct Image URL */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Web Link</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Paste image URL (e.g. https://...)"
                    className="flex-1 h-9 rounded-xl border border-border px-3 text-xs focus:outline-none focus:border-primary bg-background text-foreground w-full"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleInsertImage();
                      if (e.key === 'Escape') setShowImageInput(false);
                    }}
                    disabled={isUploadingImage}
                  />
                  <button
                    type="button"
                    onClick={handleInsertImage}
                    className="h-9 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 cursor-pointer transition-opacity"
                    disabled={isUploadingImage}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="h-[1px] bg-border my-1" />
              
              <button
                type="button"
                onClick={() => setShowImageInput(false)}
                className="self-end text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                disabled={isUploadingImage}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Editor Content Area */}
      <div className="bg-card border-none outline-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
```

---

## 5. Integrating with Forms

Use the component inside your page or form layout like a standard input element. Bind the component's state to React's local state hook:

```tsx
'use client';

import { useState } from 'react';
import RichTextEditor from "@/components/rich-text-editor";

export default function CreatePostForm() {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving HTML content:", content);
    // Send `content` directly to your database (stores as standard HTML string)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-semibold">Body Content</label>
        <RichTextEditor 
          content={content} 
          onChange={(html) => setContent(html)} 
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-yellow-500 rounded-lg text-white font-semibold">Submit Post</button>
    </form>
  );
}
```

---

## 6. Rendering Content on the Frontend (Display Page)

To render the rich text (HTML format) securely and style it automatically, use React's `dangerouslySetInnerHTML` wrapped inside Tailwind's `.prose` class. The `.prose` class handles layout, fonts, sizing, list styles, and blockquote margins, while `dark:prose-invert` handles automatic color adjustments in dark theme:

```tsx
interface PostContentProps {
  post: {
    title: string;
    content: string; // The HTML string loaded from database
  };
}

export function PostContent({ post }: PostContentProps) {
  return (
    <article className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      
      {/* Container wraps the rendering with tailwind-typography class styles */}
      <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 md:p-10">
        <div 
          className="prose prose-zinc max-w-none dark:prose-invert text-left" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </article>
  );
}
```

---

## 7. Shadcn UI Dependencies & Vanilla CSS/HTML Fallbacks

This implementation imports several components from Shadcn UI (`Input` and `DropdownMenu`). If your other project is not using Shadcn, you can easily substitute them with vanilla React and standard Tailwind classes:

### Input Fallback
Replace `<Input />` with a standard `<input />` element:
```tsx
// Before (Shadcn):
<Input
  type="text"
  value={imageUrl}
  onChange={(e) => setImageUrl(e.target.value)}
  placeholder="..."
  className="flex-1 h-9 rounded-xl border border-border px-3 text-xs focus:outline-none focus:border-primary bg-background text-foreground"
/>

// After (Vanilla HTML/Tailwind):
<input
  type="text"
  value={imageUrl}
  onChange={(e) => setImageUrl(e.target.value)}
  placeholder="..."
  className="flex-1 h-9 rounded-xl border border-gray-200 dark:border-zinc-800 px-3 text-xs focus:outline-none focus:border-yellow-500 bg-white dark:bg-zinc-900 text-black dark:text-white"
/>
```

### Dropdown Menu Fallback
If you do not want to install Radix UI / Shadcn DropdownMenu, you can replace it with a simple React state-controlled dropdown:
```tsx
// Simple custom dropdown implementation:
const [showDropdown, setShowDropdown] = useState(false);

// In the toolbar JSX:
<div className="relative">
  <button
    type="button"
    onClick={() => setShowDropdown(!showDropdown)}
    className="flex items-center gap-1 p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer text-xs font-semibold"
  >
    <span>H</span>
    <ChevronDown className="h-3 w-3" />
  </button>

  {showDropdown && (
    <div className="absolute left-0 top-full mt-1 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg p-1 shadow-lg z-50 flex flex-col min-w-[120px]">
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().setParagraph().run();
          setShowDropdown(false);
        }}
        className="px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-zinc-800 rounded text-foreground"
      >
        Paragraph
      </button>
      <div className="h-[1px] bg-gray-200 dark:bg-zinc-800 my-1" />
      {([1, 2, 3, 4, 5] as const).map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level }).run();
            setShowDropdown(false);
          }}
          className={`px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-zinc-800 rounded ${
            editor.isActive('heading', { level }) ? 'bg-yellow-500/10 text-yellow-600 font-semibold' : 'text-foreground'
          }`}
        >
          Heading {level}
        </button>
      ))}
    </div>
  )}
</div>
```
