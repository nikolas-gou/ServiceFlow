import { uploadSize } from '../Image';

describe('uploadSize', () => {
  describe('Edge Cases', () => {
    test('returns 0 when files is undefined', () => {
      expect(uploadSize()).toBe(0);
    });

    test('returns 0 when files is null', () => {
      expect(uploadSize(null)).toBe(0);
    });

    test('returns 0 when files is empty array', () => {
      expect(uploadSize([])).toBe(0);
    });
  });

  describe('Array of Files', () => {
    test('returns 0 for existing files (with id)', () => {
      const files = [
        { id: 1, file: { size: 1000 } },
        { id: 2, file: { size: 2000 } },
      ];
      expect(uploadSize(files)).toBe(0);
    });

    test('returns total size for new files (without id)', () => {
      const files = [
        { id: null, file: { size: 1000 } },
        { id: null, file: { size: 2000 } },
      ];
      expect(uploadSize(files)).toBe(3000);
    });

    test('returns size only for new files in mixed array', () => {
      const files = [
        { id: 1, file: { size: 1000 } }, // Existing - ignore
        { id: null, file: { size: 2000 } }, // New - count
        { id: 2, file: { size: 1500 } }, // Existing - ignore
        { id: null, file: { size: 3000 } }, // New - count
      ];
      expect(uploadSize(files)).toBe(5000); // 2000 + 3000
    });

    test('handles large file sizes correctly', () => {
      const files = [
        { id: null, file: { size: 5242880 } }, // 5MB
        { id: null, file: { size: 2097152 } }, // 2MB
      ];
      expect(uploadSize(files)).toBe(7340032); // 7MB
    });
  });

  describe('Real-world Scenarios', () => {
    test('calculates size for typical photo upload scenario', () => {
      const files = [
        { id: null, file: { size: 1048576, name: 'photo1.jpg' } }, // 1MB
        { id: null, file: { size: 2097152, name: 'photo2.jpg' } }, // 2MB
        { id: null, file: { size: 1572864, name: 'photo3.jpg' } }, // 1.5MB
      ];
      expect(uploadSize(files)).toBe(4718592); // 4.5MB total
    });

    test('handles edit scenario with existing and new images', () => {
      const files = [
        { id: 10, path: '/uploads/existing1.jpg', size: 1000000 }, // Existing from server
        { id: 11, path: '/uploads/existing2.jpg', size: 2000000 }, // Existing from server
        { id: null, file: { size: 500000 } }, // New file to upload
        { id: null, file: { size: 750000 } }, // New file to upload
      ];
      expect(uploadSize(files)).toBe(1250000); // Only new files: 500000 + 750000
    });
  });
});
