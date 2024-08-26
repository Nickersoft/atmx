import { type Snippet, SNIPPET_TYPES, type SnippetType } from "@atmx-org/common"

export function getSnippetsForSideBar(snippets: Record<SnippetType, Snippet[]>): [string, Snippet[]][]{
    return Object.entries(snippets).filter(entry=>SNIPPET_TYPES.includes(entry[0] as SnippetType) );
}