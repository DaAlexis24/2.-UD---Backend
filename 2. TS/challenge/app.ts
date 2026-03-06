import { Company } from "./company.js";
import { Invoice } from "./invoice.js";

const myCompany = new Company(
  "La Palmerita de Morata",
  "C/ Abtao 8, Madrid",
  "667788991",
  "Y8906521M",
);

const i1 = new Invoice(
  myCompany,
  new Company("Acme", "C/ Geronimo Macabeo 78", "654321098", "Z4569955B"),
);

i1.printInvoice()