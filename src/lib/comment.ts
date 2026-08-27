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

// Immutably walks the nested tree to find the right parent and insert a reply
export function addReplyToTree(
  comments: Comment[],
  parentId: string,
  reply: Comment,
): Comment[] {
  return comments.map((c) => {
    if (c.id === parentId) {
      return { ...c, replies: [...(c.replies ?? []), reply] };
    }
    if (c.replies && c.replies.length > 0) {
      return { ...c, replies: addReplyToTree(c.replies, parentId, reply) };
    }
    return c;
  });
}
