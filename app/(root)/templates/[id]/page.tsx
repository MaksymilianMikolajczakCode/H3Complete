
import Template from "@/components/Template";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchTemplateById} from "@/lib/actions/template.actions";
import { Button } from "@/components/ui/button";


async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const template = await fetchTemplateById(params.id);
  return (
    <section>
      <div>
        <Template
                title={template.title}
                description={template.description}
                download={template.download}
                settings={template.settings}
                rules={template.rules}
                specification={template.specification}
                trade={template.trade}
                image={template.image}
                templateId={params.id}
                versions={template.version}
              />
      </div>
    </section>
  );
}

export default page;