'use client'; // Ensure this component is treated as a client component

import { useState } from 'react';
import Link from 'next/link';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

type TemplatesByCategory = Record<string, Array<{ id: string, title: string }>>;

interface ClientSideTemplatesProps {
  templatesByCategory: TemplatesByCategory;
}

const ClientSideTemplates = ({ templatesByCategory }: ClientSideTemplatesProps) => {
  // Use a set to track expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Toggle the expanded state of a category
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newExpandedCategories = new Set(prev);
      if (newExpandedCategories.has(category)) {
        newExpandedCategories.delete(category);
      } else {
        newExpandedCategories.add(category);
      }
      return newExpandedCategories;
    });
  };

  return (
    <>
      {Object.entries(templatesByCategory).map(([category, templates]) => (
        <div key={category} className="my-1">
          <button
            onClick={() => toggleCategory(category)}
            className="w-full text-left bg-gray-200 p-2 rounded-md flex items-center justify-between font-bold"
          >
            {category}
            {expandedCategories.has(category) ? (
              <MdOutlineKeyboardArrowUp className="h-7 w-7" />
            ) : (
              <MdOutlineKeyboardArrowDown className="h-7 w-7" />
            )}
          </button>
          {expandedCategories.has(category) && (
            <div className="mt-1 ml-3">
              {templates.map((template) => (
                <div key={template.id} className="mb-2">
                  <Link href={`/templates/${template.id}`}>
                    {template.title}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ClientSideTemplates;
