// services/historyService.ts
export interface HistoryItem {
  id: string;
  type: 'department' | 'legislation' | 'violence';
  title: string;
  path: string;
  imageUrl: string;
  timestamp: number;
}

// Helper function to get image URL based on type and data
function getImageUrl(type: 'department' | 'legislation' | 'violence', id: string): string {
  if (type === 'legislation') {
    // Try to extract state from ID format
    console.log(id);
    const stateMatch = id.match(/^[A-Z]{2}/);
    const state = stateMatch ? stateMatch[0].toLowerCase() : '';
    console.log("hello")
    console.log(state);
    if (state && Object.keys(stateTranslation).includes(state)) {
      return `/flags/${stateTranslation[state]}.png`;
    }
  }
  
  // Default placeholder images by type
  const placeholders = {
    department: '/images/department-placeholder.jpg',
    legislation: '/images/legislation-placeholder.jpg',
    violence: '/images/incident-placeholder.jpg'
  };
  
  return placeholders[type] || '/api/placeholder/400/225';
}

// State translation map for flag images
const stateTranslation: { [key: string]: string } = {
  AL: "alabama", AK: "alaska", AR: "arkansas", AZ: "arizona", CA: "california",
  CO: "colorado", CT: "connecticut", DE: "delaware", FL: "florida", GA: "georgia",
  HI: "hawaii", ID: "idaho", IL: "illinois", IN: "indiana", IA: "iowa",
  KS: "kansas", KY: "kentucky", LA: "louisiana", ME: "maine", MD: "maryland",
  MA: "massachusetts", MI: "michigan", MN: "minnesota", MS: "mississippi", MO: "missouri",
  MT: "montana", NE: "nebraska", NV: "nevada", NH: "newhampshire", NJ: "newjersey",
  NM: "newmexico", NY: "newyork", NC: "northcarolina", ND: "northdakota", OH: "ohio",
  OK: "oklahoma", OR: "oregon", PA: "pennsylvania", RI: "rhodeisland", SC: "southcarolina",
  SD: "southdakota", TN: "tennessee", TX: "texas", UT: "utah", VA: "virginia",
  WA: "washington", WI: "wisconsin", WY: "wyoming", WV: "westvirginia", VT: "vermont"
};

// Maximum number of history items to store
const MAX_HISTORY_ITEMS = 10;

class HistoryService {
  private readonly STORAGE_KEY = 'police-accountability-history';
  
  getHistory(): HistoryItem[] {
    try {
      if (typeof window === 'undefined') return [];
      
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to retrieve history:', error);
      return [];
    }
  }
  
  addToHistory(type: 'department' | 'legislation' | 'violence', title: string, path: string, imageURL: string): void {
    try {
      if (typeof window === 'undefined') return;

      console.log("hello");
      console.log("wow" + imageURL);
      
      const history = this.getHistory();
      const id = path.split('/').pop() || '';
      
      // Check if item already exists
      const existingIndex = history.findIndex(item => item.path === path);
      
      // Prepare the new item
      const newItem: HistoryItem = {
        id,
        type,
        title,
        path,
        imageUrl: imageURL,
        timestamp: Date.now()
      };
      
      // If it exists, remove it so we can add it to the beginning
      if (existingIndex !== -1) {
        history.splice(existingIndex, 1);
      }
      
      // Add new item to the beginning
      history.unshift(newItem);
      
      // Limit history size
      const limitedHistory = history.slice(0, MAX_HISTORY_ITEMS);
      
      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Failed to add to history:', error);
    }
  }
  
  clearHistory(): void {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }
}

export const historyService = new HistoryService();