import type { Playbook } from "./types";
import { restApiDesignPlaybook } from "./rest-api-design";

export const playbooks: Playbook[] = [restApiDesignPlaybook];

export function getPlaybook(slug: string): Playbook | undefined {
  return playbooks.find((p) => p.slug === slug);
}

export function getAllPlaybooks(): Playbook[] {
  return playbooks;
}
