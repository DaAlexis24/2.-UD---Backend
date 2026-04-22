import { connectDB } from '../../config/db-config.ts';
import { env } from '../../config/env.ts';
import debug from 'debug';

const log = debug(`${env.PROJECT_NAME}:seed`);
log('Loading seed...');

export const seedAnimalsDB = async () => {
  const prisma = await connectDB();
  prisma.animal.deleteMany();
  await prisma.animal.createMany({
    data: [
      {
        name: 'Guepardo',
        englishName: 'Cheetah',
        sciName: 'Acinonyx jubatus',
        diet: 'Carnívoro',
        lifestyle: 'Diurno',
        location: 'África',
        slogan: 'El mamífero terrestre más rápido del mundo',
        group: 'Felinos',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Cheetah_%28Acinonyx_jubatus%29_female_2.jpg/640px-Cheetah_%28Acinonyx_jubatus%29_female_2.jpg',
      },
      {
        name: 'Elefante',
        englishName: 'Elephant',
        sciName: 'Loxodonta africana',
        diet: 'Herbívoro',
        lifestyle: 'Diurno',
        location: 'África',
        slogan: 'El gigante gentil de la sabana',
        group: 'Proboscídeos',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/African_elephant_%28Loxodonta_africana%29_2.jpg/640px-African_elephant_%28Loxodonta_africana%29_2.jpg',
      },
      {
        name: 'Jirafa',
        englishName: 'Giraffe',
        sciName: 'Giraffa camelopardalis',
        diet: 'Herbívoro',
        lifestyle: 'Diurno',
        location: 'África',
        slogan: 'El mamífero terrestre más alto del mundo',
        group: 'Rumiantes',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/640px-Giraffe_Mikumi_National_Park.jpg',
      },
      {
        name: 'Tigre',
        englishName: 'Tiger',
        sciName: 'Panthera tigris',
        diet: 'Carnívoro',
        lifestyle: 'Nocturno',
        location: 'Asia',
        slogan: 'La especie de gato más grande del mundo',
        group: 'Felinos',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Bengal_tiger_%28Panthera_tigris_tigris%29_female_3.jpg/640px-Bengal_tiger_%28Panthera_tigris_tigris%29_female_3.jpg',
      },
      {
        name: 'Canguro',
        englishName: 'Kangaroo',
        sciName: 'Macropus rufus',
        diet: 'Herbívoro',
        lifestyle: 'Diurno',
        location: 'Australia',
        slogan: 'El saltarín del outback australiano',
        group: 'Marsupiales',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Kangaroo_Australia_01.jpg/640px-Kangaroo_Australia_01.jpg',
      },
      {
        name: 'Panda',
        englishName: 'Panda',
        sciName: 'Ailuropoda melanoleuca',
        diet: 'Herbívoro',
        lifestyle: 'Diurno',
        location: 'China',
        slogan: 'El oso de bambú',
        group: 'Ursidae',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/640px-Grosser_Panda.JPG',
      },
      {
        name: 'Águila',
        englishName: 'Eagle',
        sciName: 'Aquila chrysaetos',
        diet: 'Carnívoro',
        lifestyle: 'Diurno',
        location: 'Global',
        slogan: 'El rey de los cielos',
        group: 'Accipitridae',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Aquila_chrysaetos_-_01.jpg/640px-Aquila_chrysaetos_-_01.jpg',
      },
      {
        name: 'León',
        englishName: 'Lion',
        sciName: 'Panthera leo',
        diet: 'Carnívoro',
        lifestyle: 'Diurno',
        location: 'Africa',
        slogan: 'El rey de la selva',
        group: 'Mamíferos',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/800px-Lion_waiting_in_Namibia.jpg',
      },
      {
        name: 'Pingüino',
        englishName: 'Penguin',
        sciName: 'Spheniscidae',
        diet: 'Carnívoro',
        lifestyle: 'Diurno',
        location: 'Antártida',
        slogan: 'El ave mejor vestida del mundo',
        group: 'Aves',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Emperor_Penguin_Manchot_empereur.jpg/640px-Emperor_Penguin_Manchot_empereur.jpg',
      },
      {
        name: 'Oso Polar',
        englishName: 'Polar Bear',
        sciName: 'Ursus maritimus',
        diet: 'Carnívoro',
        lifestyle: 'Diurno',
        location: 'Ártico',
        slogan: 'El carnívoro terrestre más grande del mundo',
        group: 'Mamíferos',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg/800px-Polar_Bear_-_Alaska_%28cropped%29.jpg',
      },
      {
        name: 'Cebra',
        englishName: 'Zebra',
        sciName: 'Equus quagga',
        diet: 'Herbívoro',
        lifestyle: 'Diurno',
        location: 'Africa',
        slogan: 'El animal más rayado del mundo',
        group: 'Mamíferos',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Equus_quagga_burchellii_-_Etosha%2C_2014.jpg/640px-Equus_quagga_burchellii_-_Etosha%2C_2014.jpg',
      },
      {
        name: 'Gallito de las Rocas',
        englishName: 'Andean Cock-of-the-rock',
        sciName: 'Rupicola peruvianus',
        diet: 'Omnvíoro',
        lifestyle: 'Diurno',
        location: 'América',
        slogan: 'Ave nacional del Perú',
        group: 'Aves',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Andean_Cock_of_the_Rock%2C_Rupicola_peruviana_2.jpg/330px-Andean_Cock_of_the_Rock%2C_Rupicola_peruviana_2.jpg',
      },
    ],
  });
  log('Seeding to database was successfully!');
  await prisma.$disconnect;
};

seedAnimalsDB().catch((error) => {
  console.error('Error al insertar datos de ejemplo:', error);
  process.exit(1);
});
