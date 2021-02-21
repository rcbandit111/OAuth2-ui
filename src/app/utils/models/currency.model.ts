import { ICurrency } from '@utils/interfaces';

export class Currency implements ICurrency {
  id = null;
  contractId = null;
  code = null;

  constructor(c?: ICurrency) {
    if (c) {
      this.id = c.id ? c.id : null;
      this.contractId = c.contractId ? c.contractId : null;
      this.code = c.code ? c.code : null;
    }
  }
}
