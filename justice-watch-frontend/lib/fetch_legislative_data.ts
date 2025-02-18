import { LegislativeResponse, SearchResult, LegislativeBill } from '@/types/legi_search_result'
import { Bill, BillResponse, BillTextResponse } from "@/types/bill";

export async function obtainBillList() : Promise<number[]> {
    /* In the future, this will be an actual REST API Call. Right, now it's "fetching" from a file" */
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/bill_text_search.json`, {
      cache: 'no-store', // Ensures fresh data on every request
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data : LegislativeResponse = await response.json();
    const billNumbers = Object.keys(data.searchresult) // Get all keys in searchresult
      .filter((key) => key !== 'summary') // Filter out the 'summary' key
      .map((key) => (data.searchresult[key as keyof SearchResult] as LegislativeBill).bill_id);
    return billNumbers
  }
  
export async function obtainSingleBill(bill_id : number) : Promise<Bill> {
    /* In the future, this will be an actual REST API Call. Right, now it's "fetching" from a file" */
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/sample_bills.json`, {
      cache: 'no-store', // Ensures fresh data on every request
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const single_bill_data : BillResponse = data[bill_id.toString()];
    return single_bill_data.bill;
  }

  export async function getBillContent(src: string): Promise<string> {
    try {
      const response = await fetch(src, {
        next: { revalidate: 3600 }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch content from ${src}`);
      }
      
      return response.text();
    } catch (error) {
      console.error('Error fetching bill content:', error);
      throw new Error('Failed to load bill content');
    }
  }
  
