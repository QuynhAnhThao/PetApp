class TreatmentEntity {
  // encapsulation
  #id; #petId; #userId;
  // constructor
  constructor({
    _id = null,
    petId,
    userId,
    date,
    description,
    treatmentCost,
    medicineCost = 0,
    totalCost = null,
    paymentMethod = null
  }) {
    // validate required fields
    if (!petId || !userId || !date || !description) {
      throw new Error("Treatment: petId, userId, date, description are required");
    }
    if (typeof treatmentCost !== 'number' || treatmentCost < 0)
      throw new Error('treatmentCost must be >= 0');
    if (typeof medicineCost !== 'number' || medicineCost < 0)
      throw new Error('medicineCost must be >= 0');

    // encapsulated state with private fields id, name, owner
    this.#id = _id;
    this.#petId = petId;
    this.#userId = userId;
    this.date = new Date(date);
    this.description = description;
    this.treatmentCost = treatmentCost;
    this.medicineCost = medicineCost;
    this.totalCost = 0;
    this.paymentMethod = null;    // Cash | Credit Card | Apple Pay
    this.paymentFee = 0;       // surcharge

    // calculate totalCost & paymentFee
    this.#recalcTotal();
    if (paymentMethod) this.setPaymentMethod(paymentMethod);
    else this.#recalcFee();
  }

  // Strategy pattern for payment methods
  // Each payment method has it own surcharge
  static #PAYMENT = {
    'Cash': {
      fee() {
        return 0.00;
      }
    },
    'Credit Card': {
      fee() {
        return 0.20;
      }
    },
    'Apple Pay': {
      fee() {
        return 0.10;
      }
    },
  };

  // Methods
  // set payment method and recalculate fee
  setPaymentMethod(method) {
    this.paymentMethod = method;
    this.#recalcFee();
  }

  // set costs and recalculate total & fee
  setCosts({ treatmentCost, medicineCost } = {}) {
    if (treatmentCost != null) {
      this.treatmentCost = treatmentCost;
    }
    if (medicineCost != null) {
      this.medicineCost = medicineCost;
    }
    this.#recalcTotal();
    this.#recalcFee();

  }

  // total cost with surcharge
  totalWithSurcharge() {
    return this.totalCost + this.paymentFee;
  }

  // private methods to calculate total & fee
  #recalcTotal() {
    this.totalCost = this.treatmentCost + this.medicineCost;
  }

  #recalcFee() {
    if (!this.paymentMethod) { this.paymentFee = 0; return; }
    const paymentStrategy = TreatmentEntity.#PAYMENT[this.paymentMethod];
    // console.log('strategy pattern: ', paymentStrategy);
    // console.log('payment Method: ', this.paymentMethod);
    this.paymentFee = paymentStrategy.fee();
  }

  // mapping
  toObject() {
    const total = this.totalCost + this.paymentFee;
    return {
      _id: this.#id,
      petId: this.#petId,
      userId: this.#userId,
      date: new Date(this.date),
      description: this.description,
      treatmentCost: this.treatmentCost,
      medicineCost: this.medicineCost,
      totalCost: total,
      paymentMethod: this.paymentMethod,
      paymentFee: this.paymentFee
    };
  }
  toJSON() { return this.toObject(); }


}

module.exports = TreatmentEntity;
