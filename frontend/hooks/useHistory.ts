import { useState, useEffect } from 'react';
import { historyService, HistoryItem } from '../services/historyService';

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false); // ✅ new flag

  useEffect(() => {
    const data = historyService.getHistory();
    setHistory(data);
    setHistoryLoaded(true); // ✅ mark loading complete
  }, []);

  const addToHistory = (
    type: 'department' | 'legislation' | 'violence',
    title: string,
    path: string,
    imageURL: string
  ) => {
    historyService.addToHistory(type, title, path, imageURL);
    setHistory(historyService.getHistory());
  };

  const clearHistory = () => {
    historyService.clearHistory();
    setHistory([]);
  };

  return { history, historyLoaded, addToHistory, clearHistory };
}
