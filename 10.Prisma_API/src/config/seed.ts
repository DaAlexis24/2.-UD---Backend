import { connectPrisma } from './prisma.ts';

async function seed() {
  const prisma = await connectPrisma();

  // Datos de ejemplo
  const animals = [
    {
      name: 'León',
      english_name: 'Lion',
      sci_name: 'Panthera leo',
      diet: 'Carnívoro',
      lifestyle: 'Savana',
      location: 'África',
      slogan: 'El rey de la selva',
      group_name: 'Félidos',
      image: '/images/lion.jpg',
    },
    {
      name: 'Elefante',
      english_name: 'Elephant',
      sci_name: 'Loxodonta africana',
      diet: 'Herbívoro',
      lifestyle: 'Savana',
      location: 'África',
      slogan: 'El más grande del mundo',
      group_name: 'Proboscídeos',
      image: '/images/elephant.jpg',
    },
  ];

  // Insertar datos en la base de datos
  for (const animal of animals) {
    await prisma.animals.create({ data: animal });
  }

  console.log('Datos de ejemplo insertados correctamente.');

  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error('Error al insertar datos de ejemplo:', error);
  process.exit(1);
});
