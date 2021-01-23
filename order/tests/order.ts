import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import { addOrder, getOrderStatus, cancelOrder} from '../src/controllers/order';
import { OrderCreatedPublisher } from '../src/events/publishers/order-created-publisher';
import { Publisher } from '../src/events/base-publisher';
import { Order } from '../src/models/order';
import nats from 'node-nats-streaming';

describe('Order Controller', async () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      json: sinon.spy(),
      status: sinon.stub().returns({
        end: sinon.spy(),
        json: sinon.spy(),
        send: sinon.spy()
      })
    };
  });

  it('should return status code 500 for getOrderStatus if it fails', async () => {
    mockRequest = {
      params: {
        orderId: '1'
      }
    };

    sinon.stub(Order, 'findById').throws();
    await getOrderStatus(mockRequest as Request, mockResponse as Response);
    sinon.assert.calledWith(mockResponse.status as any, 500);
    (Order.findById as any).restore();
  });

  it('should return status code 200 if getOrderStatus success', async () => {
    mockRequest = {
      params: {
        orderId: '1'
      }
    };

    const expectedResult = {
      select() {
        return this;
      }
    };

    sinon.stub(Order, 'findById').returns(expectedResult as any);
    await getOrderStatus(mockRequest as Request, mockResponse as Response);
    sinon.assert.calledWith(mockResponse.status as any, 200);
    (Order.findById as any).restore();
  });

  it('should return status code 500 for cancelOrder if it fails', async () => {
    mockRequest = {
      params: {
        orderId: '1'
      }
    };

    sinon.stub(Order, 'findById').throws();
    await cancelOrder(mockRequest as Request, mockResponse as Response);
    sinon.assert.calledWith(mockResponse.status as any, 500);
    (Order.findById as any).restore();
  });

  it('should return status code 200 for cancelOrder if success', async () => {
    mockRequest = {
      params: {
        orderId: '1'
      }
    };

    const expectedResult = {
      save() {
        return this;
      }
    };

    sinon.stub(Order, 'findById').returns(expectedResult as any);
    await cancelOrder(mockRequest as Request, mockResponse as Response);
    sinon.assert.calledWith(mockResponse.status as any, 200);
    (Order.findById as any).restore();
  });

  it('should return status code 201 for addOrder if success', async () => {
    mockRequest = {
      body: {
        "status": "created",
        "amount": 12.10,
        "customerId": 6
      }
    };

    const orderObj = Order.build({
      "status": "created",
      "amount": 12.10,
      "customerId": 6
    });

    sinon.stub(Order.prototype, 'save' as any).returns({});
    await addOrder(mockRequest as Request, mockResponse as Response);
    sinon.assert.calledWith(mockResponse.status as any, 201);
  });

  it('should return status code 500 for addOrder if it fails', async () => {
    mockRequest = {
      body: {
        "status": "created",
        "amount": 12.10,
        "customerId": 6
      }
    };

    sinon.stub(Order, 'build' as any).throws();
    await addOrder(mockRequest as Request, mockResponse as Response);
    sinon.assert.calledWith(mockResponse.status as any, 500);
  });
});
