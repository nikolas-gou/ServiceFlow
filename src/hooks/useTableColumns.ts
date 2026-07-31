import { useState, useCallback, useMemo } from 'react';
import type { TableColumnDef } from '../types/table';
import { ListItem } from '@mui/material';

/**
 * Διαχειρίζεται ορατότητα + πλάτος στηλών ενός πίνακα, με persistence στο localStorage.
 * @param storageKey - Μοναδικό prefix για τα localStorage keys του πίνακα.
 * @param columns - Ορισμός στηλών.
 */
export function useTableColumns(storageKey: string, columns: TableColumnDef[]) {
  const visibleStorageKey = `${storageKey}_visibleColumns`;
  const widthsStorageKey = `${storageKey}_columnWidths`;

  const defaultVisible = useMemo(
    () => columns.filter((c) => c.defaultColumn).map((c) => c.id),
    [columns],
  );
  const defaultWidths = useMemo(
    () =>
      columns.reduce<Record<string, number>>((acc, c) => {
        acc[c.id] = c.defaultWidth;
        return acc;
      }, {}),
    [columns],
  );

  const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(visibleStorageKey) || 'null');
      if (Array.isArray(saved)) {
        const validIds = columns.map((c) => c.id);
        const filtered = (saved as string[]).filter((id) => validIds.includes(id));
        return filtered.length > 0 ? filtered : defaultVisible;
      }
    } catch (e) {
      // αγνόησε corrupted localStorage και πέσε στα defaults
    }
    return defaultVisible;
  });

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(widthsStorageKey) || 'null');
      if (saved && typeof saved === 'object') {
        return { ...defaultWidths, ...(saved as Record<string, number>) };
      }
    } catch (e) {
      // αγνόησε corrupted localStorage και πέσε στα defaults
    }
    return defaultWidths;
  });

  const toggleColumn = useCallback(
    (id: string) => {
      setVisibleColumns((prev) => {
        const next = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
        localStorage.setItem(visibleStorageKey, JSON.stringify(next));
        return next;
      });
    },
    [visibleStorageKey],
  );

  const setColumnWidth = useCallback(
    (id: string, width: number) => {
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
