import AddButton from "@/components/AddButton";
import { fetchTemplates } from "@/lib/actions/template.actions";
import ClientSideTemplates from "@/components/shared/ClientTemplateList";

async function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await fetchTemplates();

  // Organize templates by category
  const templatesByCategory = result.reduce((acc, template) => {
    const { category } = template;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(template);
    return acc;
  }, {} as Record<string, typeof result>);

  return (
    <section className='flex flex-row w-[calc(100vw-30px)] overflow-x-hidden'>
      <div className="mt-5 flex flex-col gap-3 m-2 stick w-[300px]"> {/* Adjust width for sidebar */}
        <ClientSideTemplates templatesByCategory={templatesByCategory} />
        <AddButton />
      </div>

      <div className="w-[calc(100vw-300px)] ml-[200px]"> {/* Adjust margin for main content */}
        {children}
      </div>
    </section>
  );
}

export default TemplatesLayout;
