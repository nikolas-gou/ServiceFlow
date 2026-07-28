import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Module-level (όχι μέσα στο hook) ώστε να επιβιώνει ακόμα και όταν το component
// που καλεί το hook (π.χ. η λίστα επισκευών) unmount-άρει/remount-άρει μεταξύ navigations -
// π.χ. πηγαίνοντας στη λεπτομέρεια μιας επισκευής και πίσω, η λίστα ξαναφτιάχνεται από την αρχή.
const scrollPositions = new Map();

/**
 * Διατηρεί τη θέση scroll ενός scroll container ανά διαδρομή (pathname), ώστε η
 * επιστροφή σε μια σελίδα να ξεκινάει από εκεί που ήταν ο χρήστης, όχι από την κορυφή.
 *
 * Ξαναδοκιμάζει να θέσει το scrollTop όσο αλλάζει το ύψος του περιεχομένου (μέσω
 * ResizeObserver), γιατί τα δεδομένα της νέας σελίδας συχνά φορτώνουν ασύγχρονα
 * και το scrollTop θα είχε ήδη "κολλήσει" στο 0 πριν προλάβουν να φορτώσουν.
 *
 * @param {React.RefObject} containerRef - ref στο scrollable στοιχείο
 * @param {string} [namespace] - διακριτικό όταν υπάρχουν πάνω από ένα scroll container
 *   στην ίδια διαδρομή (π.χ. το scroll ολόκληρης της σελίδας και το scroll ενός πίνακα μέσα σε αυτήν)
 */
export function useScrollRestoration(containerRef, namespace = 'default') {
  const location = useLocation();
  const currentKeyRef = useRef(`${namespace}:${location.pathname}`);

  // Συνεχής καταγραφή θέσης scroll για την τρέχουσα διαδρομή, όσο σκρολάρει ο χρήστης
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const handleScroll = () => {
      scrollPositions.set(currentKeyRef.current, el.scrollTop);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  // Επαναφορά θέσης όταν αλλάζει η διαδρομή (ή όταν το component μόλις έγινε mount)
  useLayoutEffect(() => {
    const el = containerRef.current;
    const key = `${namespace}:${location.pathname}`;
    currentKeyRef.current = key;
    if (!el) return undefined;

    const target = scrollPositions.get(key) || 0;
    el.scrollTop = target;

    if (!target) return undefined;

    // Το περιεχόμενο συχνά φορτώνει ασύγχρονα (π.χ. React Query) -
    // ξαναθέτουμε το scrollTop κάθε φορά που αλλάζει το ύψος, για λίγο μετά.
    let attempts = 0;
    const observer = new ResizeObserver(() => {
      if (attempts >= 20) {
        observer.disconnect();
        return;
      }
      attempts += 1;
      el.scrollTop = target;
    });
    observer.observe(el);

    const stopTimeout = setTimeout(() => observer.disconnect(), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(stopTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, containerRef, namespace]);
}
