import { fetchTemplates } from "@/lib/actions/template.actions";
import Link from "next/link";

async function Templates({
}) {
  const result = await fetchTemplates();
  return (
      <section className='mt-9 flex flex-col gap-10'>
            {result.templates.map((template) => (
              <Link 
              href={`/templates/${template._id}`}
              key={template._id}
              >
                {template.title}
              </Link>
            ))}
      </section>
  );
}

export default Templates;