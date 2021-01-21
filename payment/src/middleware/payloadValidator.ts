import { body } from 'express-validator';

export let orderPayloadValidators =  [
  body('email')
  .isEmail()
  .withMessage('Please enter a valid email.')
];
