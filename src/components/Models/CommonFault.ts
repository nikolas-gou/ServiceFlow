export interface CommonFaultInput {
  id?: number | string | null;
  name?: string;
}

export interface CommonFaultJSON {
  id: number | string | null;
  name: string;
}

export interface CommonFaultOption {
  id: number;
  name: string;
}

export class CommonFault {
  id: number | string | null;
  name: string;

  constructor(data: CommonFaultInput = {}) {
    this.id = data.id ?? null;
    this.name = data.name || '';
  }

  //   isValid() {
  //     return this.name.trim() !== "" && this.phone.trim() !== "";
  //   }

  toJSON(): CommonFaultJSON {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export const common_faults: CommonFaultOption[] = [
  { id: 1, name: 'winding' },
  { id: 2, name: 'bearings' },
  { id: 3, name: 'terminal_panel' },
  { id: 4, name: 'terminal_box' },
  { id: 5, name: 'cables' },
  { id: 6, name: 'bracket' },
  { id: 7, name: 'metalwork' },
  { id: 8, name: 'other' },
];
export const common_faults_translated: CommonFaultOption[] = [
  { id: 1, name: 'Περιέλιξη' },
  { id: 2, name: 'Ρουλεμάν' },
  { id: 3, name: 'Κασέτα' },
  { id: 4, name: 'Καπάκι κασέτας' },
  { id: 5, name: 'Καλώδια' },
  { id: 6, name: 'Καπάκια' },
  { id: 7, name: 'Μηχανουργείο' },
  { id: 8, name: 'Άλλο' },
];
