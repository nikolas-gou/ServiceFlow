import { useState, useCallback, useMemo } from 'react';

/**
 * Διαχειρίζεται ορατότητα + πλάτος στηλών ενός πίνακα, με persistence στο localStorage.
 * @param {string} storageKey - Μοναδικό prefix για τα localStorage keys του πίνακα.
 * @param {Array<{id: string, defaultWidth: number, minWidth: number}>} columns - Ορισμός στηλών.
 */
export function useTableColumns(storageKey, columns) {
  const visibleStorageKey = `${storageKey}_visibleColumns`;
  const widthsStorageKey = `${storageKey}_columnWidths`;

  const defaultVisible = useMemo(() => columns.map((c) => c.id), [columns]);
  const defaultWidths = useMemo(
    () =>
      columns.reduce((acc, c) => {
        acc[c.id] = c.defaultWidth;
        return acc;
      }, {}),
    [columns],
  );

  const [visibleColumns, setVisibleColumns] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(visibleStorageKey));
      if (Array.isArray(saved)) {
        const validIds = columns.map((c) => c.id);
        const filtered = saved.filter((id) => validIds.includes(id));
        return filtered.length > 0 ? filtered : defaultVisible;
      }
    } catch (e) {
      // αγνόησε corrupted localStorage και πέσε στα defaults
    }
    return defaultVisible;
  });

  const [columnWidths, setColumnWidths] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(widthsStorageKey));
      if (saved && typeof saved === 'object') {
        return { ...defaultWidths, ...saved };
      }
    } catch (e) {
      // αγνόησε corrupted localStorage και πέσε στα defaults
    }
    return defaultWidths;
  });

  const toggleColumn = useCallback(
    (id) => {
      setVisibleColumns((prev) => {
        const next = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
        localStorage.setItem(visibleStorageKey, JSON.stringify(next));
        return next;
      });
    },
    [visibleStorageKey],
  );

  const setColumnWidth = useCallback(
    (id, width) => {
      setColumnWidths((prev) => {
        const next = { ...prev, [id]: width };
        localStorage.setItem(widthsStorageKey, JSON.stringify(next));
        return next;
      });
    },
    [widthsStorageKey],
  );

  const resetColumns = useCallback(() => {
    setVisibleColumns(defaultVisible);
    setColumnWidths(defaultWidths);
    localStorage.removeItem(visibleStorageKey);
    localStorage.removeItem(widthsStorageKey);
  }, [defaultVisible, defaultWidths, visibleStorageKey, widthsStorageKey]);

  return { visibleColumns, columnWidths, toggleColumn, setColumnWidth, resetColumns };
}
