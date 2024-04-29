import AddButton from "@/components/AddButton";
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
    <div className="mt-5 w-20 flex flex-col gap-3 m-2 stick">
    {result.map((template) => (
  <Link 
    href={`/templates/${template.id}`}
    key={template._id}
  >
    {template.title.length > 22 ? `${template.title.slice(0, 22)}...` : template.title}
  </Link>
))}
      <AddButton/>
    </div>
  
    <div className="w-[calc(100vw-300px)] ml-48">
      {children}
    </div>
  </section>
  
  );
}

export default TemplatesLayout;