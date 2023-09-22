import { Button } from "@/components/ui/button";
import { fetchTemplates } from "@/lib/actions/template.actions";
import Link from "next/link";

async function Templates({
}) {
  const result = await fetchTemplates();
  return (
      <h1>hello</h1>
  );
}

export default Templates;