// Interface for individual bill information
interface LegislativeBill {
    relevance: number;
    state: string;
    bill_number: string;
    bill_id: number;
    change_hash: string;
    url: string;
    text_url: string;
    research_url: string;
    last_action_date: string;
    last_action: string;
    title: string;
}
  
// Interface for search summary information
interface SearchSummary {
    page: string;
    range: string;
    relevancy: string;
    count: number;
    page_current: number;
    page_total: number;
    query: string;
}
  
// Interface for search results containing bills
interface SearchResult {
    summary: SearchSummary;
    [key: string]: SearchSummary | LegislativeBill; // Index signature for numbered results
}
  
// Main response interface
interface LegislativeResponse {
    status: string;
    searchresult: SearchResult;
}

export type {LegislativeBill, SearchSummary, SearchResult, LegislativeResponse};