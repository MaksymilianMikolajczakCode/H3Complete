
import Template from "@/components/Template";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchTemplateById} from "@/lib/actions/template.actions";
import { Button } from "@/components/ui/button";


async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const result = await fetchTemplateById(params.id);
  return (
    <section>
      <div>
        <Template
                title={result.template.title}
                description={result.template.description}
                download={result.template.download}
                settings={result.template.settings}
                rules={result.template.rules}
                specification={result.template.specification}
                trade={result.template.trade}
                image={result.template.image}
                templateId={params.id}
                versions={result.templateVersions}
                specificationLink={result.template.specificationlink}
                changelog={result.template.changelog}
                changelogLink={result.template.changeloglink}
                id={params.id}
              />
      </div>
    </section>
  );
}

export default page;