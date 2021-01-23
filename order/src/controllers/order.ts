import { Request, Response } from 'express';
import { Order } from '../models/order';
import { validationResult } from 'express-validator';
import { STATUS } from '../middleware/constant';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { OrderStatus } from '../events/types/order-status'
import { stan } from '../nats-client';

export const addOrder = async (req: Request, res: Response) => {
  const { state, amount, customerId } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  try {
    const order = Order.build({state, amount, customerId});
    await order.save();

    const publisher = new OrderCreatedPublisher(stan);
    publisher.publish({
      id: order._id,
      state: OrderStatus.Created,
      amount: order.amount,
      customerId: order.customerId,
      createdDate: order.createdDate,
      updatedDate: order.updatedDate
    });

    res.status(201).send(order);

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export const getOrderStatus = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  try {
    const orderStatus = await Order.findById(orderId)
    .select('-_id state');
    res.status(200).send({
      data: orderStatus
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    order!.state = STATUS.cancelled;
    order!.updatedDate = new Date().toLocaleString();
    const updatedOrder = await order!.save();
    res.status(200).send({
      data: updatedOrder
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};
