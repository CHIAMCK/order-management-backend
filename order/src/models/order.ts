import mongoose from 'mongoose';

interface OrderAttrs {
  state: string;
  amount: number;
  customerId: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
  state: string;
  amount: number;
  customerId: number;
  createdDate: string;
  updatedDate: string;
}

const orderSchema = new mongoose.Schema({
  state: {
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

// const order = Order.build({
//   state: State.created,
//   amount: 19.00,
//   createdDate: "2020-01-01",
//   updatedDate: "2020-01-01",
//   customerId: 3
// });

// const date = order.updatedDate;

export { Order };
