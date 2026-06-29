import type { PageConfig } from "@/lib/schema";
import { buildSchema } from "@/lib/schema";

export function JsonLd({ config }: { config: PageConfig }) {
  const schema = buildSchema(config);

  return (
    <script
      type="application/ld+json"
      id="schema-json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
