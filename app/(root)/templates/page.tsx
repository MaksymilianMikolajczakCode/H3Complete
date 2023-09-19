import { Button } from "@/components/ui/button";
import { fetchTemplates } from "@/lib/actions/template.actions";
import Link from "next/link";

async function Templates({
}) {
  const result = await fetchTemplates();
  return (
      <section className='mt-5 max-w-xs flex flex-col gap-5 ml-3'>
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
      </section>
  );
}

export default Templates;