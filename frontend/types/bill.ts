interface BillSession {
    session_id: number;
    state_id: number;
    year_start: number;
    year_end: number;
    prefile: number;
    sine_die: number;
    prior: number;
    special: number;
    session_tag: string;
    session_title: string;
    session_name: string;
  }
  
  interface BillProgress {
    date: string;
    event: number;
  }
  
  interface BillHistory {
    date: string;
    action: string;
    chamber: "H" | "S";
    chamber_id: number;
    importance: number;
  }
  
  interface BillSponsor {
    people_id: number;
    person_hash: string;
    party_id: string;
    state_id: number;
    party: string;
    role_id: number;
    role: string;
    name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    nickname: string;
    district: string;
    ftm_eid: number;
    votesmart_id: number;
    opensecrets_id: string;
    knowwho_pid: number;
    ballotpedia: string;
    bioguide_id: string;
    sponsor_type_id: number;
    sponsor_order: number;
    committee_sponsor: number;
    committee_id: number;
    state_federal: number;
  }
  
  interface BillSubject {
    subject_id: number;
    subject_name: string;
  }
  
  interface BillText {
    doc_id: number;
    date: string;
    type: string;
    type_id: number;
    mime: string;
    mime_id: number;
    url: string;
    state_link: string;
    text_size: number;
    text_hash: string;
    alt_bill_text: number;
    alt_mime: string;
    alt_mime_id: number;
    alt_state_link: string;
    alt_text_size: number;
    alt_text_hash: string;
  }
  
  interface Bill {
    bill_id: number;
    change_hash: string;
    session_id: number;
    session: BillSession;
    url: string;
    state_link: string;
    completed: number;
    status: number;
    status_date: string;
    progress: BillProgress[];
    state: string;
    state_id: number;
    bill_number: string;
    bill_type: string;
    bill_type_id: string;
    body: string;
    body_id: number;
    current_body: string;
    current_body_id: number;
    title: string;
    description: string;
    pending_committee_id: number;
    committee?: any;
    referrals?: any[];
    history: BillHistory[];
    sponsors: BillSponsor[];
    sasts?: any[];
    subjects: BillSubject[];
    texts: BillText[];
    votes?: any[];
    amendments?: any[];
    supplements?: any[];
    calendar?: any[];
  }
  
  interface BillResponse {
    status: string;
    bill: Bill;
  }

  type BillTextResponse = {
    status: string;
    text: {
      doc_id: number;
      bill_id: number;
      date: string;
      type: string;
      type_id: number;
      mime: string;
      mime_id: number;
      url: string;
      state_link: string;
      text_size: number;
      text_hash: string;
      doc: string;
    };
  };
  

  export type {Bill, BillHistory, BillProgress, BillResponse, BillSession, BillSponsor, BillSubject, BillText, BillTextResponse}
  