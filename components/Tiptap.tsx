import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'

import {FaBold, FaItalic, FaParagraph, FaStrikethrough} from 'react-icons/fa'
import {BsChatQuoteFill, BsCodeSlash, BsFileEarmarkBreak} from 'react-icons/bs'
import {AiOutlineClear, AiOutlineOrderedList} from 'react-icons/ai'
import {HiMiniListBullet} from 'react-icons/hi2'
import {BiRedo, BiUndo} from 'react-icons/bi'
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex space-x-2 mb-2 items-center justify-center w-[80vw]">
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <FaBold />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <FaItalic />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <FaStrikethrough />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <AiOutlineClear />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <FaParagraph />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        h2
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        h3
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <HiMiniListBullet />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <AiOutlineOrderedList />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <BsCodeSlash />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <BsChatQuoteFill />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <BsFileEarmarkBreak />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().undo().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <BiUndo />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().redo().run()}
        className="flex px-2 py-1 rounded hover:bg-gray-200 focus:outline-none"
      >
        <BiRedo />
      </button>
    </div>

  );
}

function Tiptap({ content, onChange }) {
    const editor = useEditor({
      onUpdate({ editor }) {
        onChange(editor?.getHTML());
      },
      extensions: [StarterKit, BulletList],
  
      content: content, // Initialize the editor with the passed content
      
      editorProps: {
        attributes: {
          spellcheck: 'true',
          class: 'mx-auto focus:outline-none',
        },
      },
    });
    // Update the content whenever Tiptap content changes
    // useEffect(() => {
    //   onChange(editor?.getHTML()); // Get the HTML content from Tiptap
    // }, [ ,editor, onChange, content]);
    return (
      <div>
        <MenuBar editor={editor}/>
        <div className='no-focus border rounded border-dark-4 bg-dark-3 text-light-1 w-[calc(80vw)] focus:outline-none'>
          <EditorContent editor={editor}/>
        </div>
        
      </div>
    );
  }
  
  export default Tiptap;