import type { SiteConfig } from "@/lib/site-config";
import { buildSchema } from "@/lib/schema";

export function JsonLd({ config }: { config: SiteConfig }) {
  const schema = buildSchema(config);

  return (
    <script
      type="application/ld+json"
      id="schema-json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
