import { Company } from './company.ts';
import { Invoice } from './invoice.ts';
import { Product } from './products.ts';

const client1 = new Company('5656565843D', 'Acme');
const apples = new Product('123', 'apples', 4);
const invoice1 = new Invoice(client1, apples, 20, 1.04);

const invoice2 = new Invoice(
  new Company('6567565843D', 'CAS'),
  new Product('145', 'mobile', 400),
  1,
);

invoice2.addProduct(apples, 1000);

const invoice3 = new Invoice(invoice2.client, apples, 25, 1.04);

console.log(invoice1, invoice2);
invoice1.printInvoice();
invoice2.printInvoice();
invoice3.printInvoice();
