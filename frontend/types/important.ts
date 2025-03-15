export interface Violence {
    id: number;
    name: string;
    street_address: string;
    city: string;
    agency_responsible: string;
    image_url: string;
    cause_of_death: string;
    description: string;
    ori_identifier: string;
    encounter_type: string;
    county: string;
    news_link: string;
    date: string;
    lat: string;
    long: string;
    state: string;
}

export interface ViolenceAPIResponse {
    current_page : number;
    incidents : Violence[];
    per_page : number;
    total_count : number;
    total_pages : number;
}