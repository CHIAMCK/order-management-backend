import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status'

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    state: OrderStatus;
    amount: number;
    customerId: number;
    createdDate: string;
    updatedDate: string;
  }
}