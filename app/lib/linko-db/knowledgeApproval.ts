/**
 * Connects the knowledge base to the staff approval workflow (Doc13 §06.1/§06.2).
 * Imported for its side effect by server code that builds prompts or validates citations.
 */
import { ApprovalState, registerApprovalLookup } from "@/app/lib/chatbot/knowledge";
import { db, tenantId } from "./db";

registerApprovalLookup((id, hash): ApprovalState => {
  const r = db()
    .prepare("SELECT state FROM knowledge_review WHERE tenant_id = ? AND item_id = ? AND content_hash = ?")
    .get(tenantId(), id, hash) as { state?: ApprovalState } | undefined;
  return r?.state ?? null;
});
