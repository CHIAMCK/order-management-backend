import { body } from 'express-validator';
import { STATE } from './constant';

export let orderPayloadValidators =  [
  body('amount')
  .matches(/^\d+(?:\.\d{0,2})$/)
  .withMessage('Please enter a valid amount.'),
  body('status')
  .isIn(STATE)
  .withMessage('Please enter a valid state.'),
  body('customerId')
  .isNumeric()
  .withMessage('Please enter a valid customer id.'),
];
