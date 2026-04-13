export interface PlaybookGuidanceItem {
  do: string;
  dont: string;
  why: string;
}

export interface PlaybookStep {
  id: string;
  title: string;
  what: string;
  whyItMatters: string;
  commonGaps: string;
  guidance: PlaybookGuidanceItem[];
}

export interface PlaybookChecklistItem {
  step: string;
  description: string;
}

export interface Playbook {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  estimatedMinutes: number;
  targetAudience: string;
  useContext: string;
  overview: string;
  whenToUse: string[];
  whenNotToUse: string[];
  checklist: PlaybookChecklistItem[];
  steps: PlaybookStep[];
}
