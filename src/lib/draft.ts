const CURRENT_DRAFT_KEY = "touchee:current-create-post-draft";

export interface PostDraft {
  id: "current-create-post";
  title: string;
  communityId: string | null;
  content: string;
  savedAt: string;
}

export function getCurrentDraft(): PostDraft | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CURRENT_DRAFT_KEY);
    return raw ? (JSON.parse(raw) as PostDraft) : null;
  } catch {
    return null;
  }
}

export function saveCurrentDraft(
  draft: Omit<PostDraft, "id" | "savedAt">,
): PostDraft {
  const savedDraft: PostDraft = {
    ...draft,
    id: "current-create-post",
    savedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(CURRENT_DRAFT_KEY, JSON.stringify(savedDraft));

  return savedDraft;
}

export function clearCurrentDraft(): void {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(CURRENT_DRAFT_KEY);
}
