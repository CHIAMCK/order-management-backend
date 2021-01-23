import mongoose from 'mongoose';

interface OrderAttrs {
  status: string;
  amount: number;
  customerId: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

export interface OrderDoc extends mongoose.Document {
  status: string;
  amount: number;
  customerId: number;
  createdDate: string;
  updatedDate: string;
}

const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['created', 'confirmed', 'delivered', 'cancelled'],
    default: 'created',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  customerId: {
    type: Number,
    required: true
  },
  createdDate: {
    type : Date,
    default: Date.now
  },
  updatedDate: {
    type: Date
  }
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
