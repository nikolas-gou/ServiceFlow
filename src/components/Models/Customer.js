export class Customer {
  constructor(data = {}) {
    this.id = data.id || null;
    this.type = data.type || "individual";
    this.name = data.name || "";
    this.email = data.email || "";
    this.phone = data.phone || "";
    this.createdAt = data.createdAt || new Date();
  }

  isValid() {
    return this.name.trim() !== "" && this.phone.trim() !== "";
  }

  static fromApiFormat() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      type: this.type,
      createdAt: this.created_at,
    }
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

  toApiFormat() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      type: this.type,
      created_at: this.createdAt,
    }
  }
}
