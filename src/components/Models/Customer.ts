import { accentColors, type AccentColor } from '../../styles/colors';

export const customerType_types = ['individual', 'factory'];

export const customerType_mapping: Record<string, string> = {
  individual: 'Ιδιώτης',
  factory: 'Εργοστάσιο',
};

// { base, dark } ανά τύπο — βλ. src/styles/colors.js
export const customerType_colors: Record<string, AccentColor> = {
  individual: accentColors.teal,
  factory: accentColors.indigo,
};

export interface CustomerInput {
  id?: number | string | null;
  type?: string;
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: string | null;
}

export interface CustomerJSON {
  id: number | string | null;
  name: string;
  email: string;
  phone: string;
  type: string;
  createdAt: string | null;
}

export class Customer {
  id: number | string | null;
  type: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string | null;

  constructor(data: CustomerInput = {}) {
    this.id = data.id ?? null;
    this.type = data.type || 'individual';
    this.name = data.name || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.createdAt = data.createdAt ?? null;
  }

  isValid(): boolean {
    return this.name.trim() !== '' && this.phone.trim() !== '';
  }

  toJSON(): CustomerJSON {
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
