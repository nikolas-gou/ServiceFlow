import { accentColors } from '../../styles/colors';

export const customerType_types = ['individual', 'factory'];

export const customerType_mapping = {
  individual: 'Ιδιώτης',
  factory: 'Εργοστάσιο',
};

// { base, dark } ανά τύπο — βλ. src/styles/colors.js
export const customerType_colors = {
  individual: accentColors.teal,
  factory: accentColors.indigo,
};

export class Customer {
  constructor(data = {}) {
    this.id = data.id || null;
    this.type = data.type || 'individual';
    this.name = data.name || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.createdAt = data.createdAt || null;
  }

  isValid() {
    return this.name.trim() !== '' && this.phone.trim() !== '';
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      type: this.type,
      createdAt: this.createdAt,
    };
  }
}
