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
    <div className="mt-5 w-208px flex flex-col gap-5 m-3">
      {result.templates.map((template) => (
        <Link 
          href={`/templates/${template._id}`}
          key={template._id}
        >
          {template.title}
        </Link>
      ))}
      <Link href="/create-template">
        Add Template
      </Link>
    </div>
  
    <div className="mt-5 w-[calc(100vw-272px)]">
      {children}
    </div>
  </section>
  
  );
}

export default TemplatesLayout;