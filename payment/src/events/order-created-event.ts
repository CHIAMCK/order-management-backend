import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status'

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: OrderStatus;
    amount: number;
    customerId: number;
    createdDate: string;
    updatedDate: string;
  }
}
