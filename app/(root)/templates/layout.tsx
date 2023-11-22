import { fetchTemplates } from "@/lib/actions/template.actions";
import Link from "next/link";

async function TemplatesLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  const result = await fetchTemplates();
  return (
    <section className='flex flex-row w-[calc(100vw-30px)] overflow-x-hidden'>
    <div className="mt-5 w-80 max-w-xs flex flex-col gap-5 m-3 stick">
      {result.templates.map((template) => (
        <Link 
          href={`/templates/${template._id}`}
          key={template._id}
        >
          {template.title}
        </Link>
      ))}
      <Link href="/create-template" className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded text-center mr-3'>
        New Template
      </Link>
    </div>
  
    <div className="w-[calc(100vw-30px)] ml-80">
      {children}
    </div>
  </section>
  
  );
}

export default TemplatesLayout;