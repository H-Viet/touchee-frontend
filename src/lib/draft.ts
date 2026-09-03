// Local-storage-backed post drafts. Once the backend supports drafts,
// only the *insides* of these three functions need to change — every
// call site (saveDraft/getDrafts/deleteDraft) stays exactly the same.

const DRAFTS_KEY = "touchee:post-drafts";

export interface PostDraft {
  id: string;
  communityId: string | null;
  content: string; // HTML from the rich text editor
  mediaUrl: string | null;
  mediaType: "image" | "video" | null;
  savedAt: string;
}

function readAll(): PostDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(DRAFTS_KEY);
    return raw ? (JSON.parse(raw) as PostDraft[]) : [];
  } catch {
    return [];
  }
}

function writeAll(drafts: PostDraft[]) {
  window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function getDrafts(): PostDraft[] {
  return readAll();
}

export function saveDraft(draft: Omit<PostDraft, "id" | "savedAt">): PostDraft {
  const newDraft: PostDraft = {
    ...draft,
    id: `draft-${Date.now()}`,
    savedAt: new Date().toISOString(),
  };
  writeAll([newDraft, ...readAll()]);
  return newDraft;
}

export function deleteDraft(id: string): void {
  writeAll(readAll().filter((d) => d.id !== id));
}
