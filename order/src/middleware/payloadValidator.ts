import { body } from 'express-validator';
import { STATE } from './constant';

export let orderPayloadValidators =  [
  body('amount')
  .isDecimal({
    decimal_digits: '2'
  })
  .withMessage('Please enter a valid amount.'),
  body('state')
  .isIn(STATE)
  .withMessage('Please enter a valid state.'),
  body('customerId')
  .isNumeric()
  .withMessage('Please enter a valid customer id.'),
];
