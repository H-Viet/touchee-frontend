import type { Comment } from "@/types";

export function findCommentById(
  comments: Comment[],
  id: string,
): Comment | null {
  for (const comment of comments) {
    if (comment.id === id) return comment;
    if (comment.replies?.length) {
      const found = findCommentById(comment.replies, id);
      if (found) return found;
    }
  }
  return null;
}
