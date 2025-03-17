export class Customer {
  constructor(data = {}) {
    this.id = data.id || null;
    this.type = data.type || "individual";
    this.name = data.name || "";
    this.email = data.email || "";
    this.phone = data.phone || "";
    this.created_at = data.created_at || new Date().toISOString().split("T")[0];
  }

  isValid() {
    return this.name.trim() !== "" && this.phone.trim() !== "";
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      type: this.type,
      created_at: this.created_at,
    };
  }
}
