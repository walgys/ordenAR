import { database } from '../config/fb';
import { getDocs, collection } from 'firebase/firestore';

export const filterData = [
  { name: 'Café', image: require('../assets/coffe_200.png'), id: '0' },
  {
    name: 'Sandwichs',
    image: require('../assets/sandwich_200.png'),
    id: '1',
  },
  {
    name: 'Confitería',
    image: require('../assets/chocolate_cones_200.png'),
    id: '2',
  },
  {
    name: 'Cápsulas',
    image: require('../assets/coffe_capsules_200.png'),
    id: '3',
  },
  {
    name: 'Accesorios',
    image: require('../assets/expresso_200.png'),
    id: '4',
  },
];

export const getProducts = async () => {
  const productsSnapshot = await getDocs(collection(database, 'products'));
  let products = [];
  productsSnapshot.forEach((product) =>
    products.push({ id: product.id, ...product.data() })
  );
  return products;
};

export const products = [
  {
    name: 'Tostado de jamón y queso',
    image: require('../assets/sandwichs/jamon_queso_500x350.png'),
    categoryId: '1',
    id: '0',
    price: 1.25,
  },
  {
    name: 'Braseado éxquisito',
    image: require('../assets/sandwichs/braseado_500x350.png'),
    categoryId: '1',
    id: '1',
    price: 1.25,
  },
  {
    name: 'Cubano rico',
    image: require('../assets/sandwichs/cubano_500x350.png'),
    categoryId: '1',
    id: '2',
    price: 1.25,
  },
  {
    name: 'Único con milanesa',
    image: require('../assets/sandwichs/milanesa_500x350.png'),
    categoryId: '1',
    id: '3',
    price: 1.25,
  },
  {
    name: 'Supremo con pernil',
    image: require('../assets/sandwichs/pernil_500x350.png'),
    categoryId: '1',
    id: '4',
    price: 1.25,
  },
  {
    name: 'Fresco con pepino y apio',
    image: require('../assets/sandwichs/pepino_apio_500x350.png'),
    categoryId: '1',
    id: '5',
    price: 1.25,
  },
  {
    name: 'Ligero Veggie',
    image: require('../assets/sandwichs/veggie_500x350.png'),
    categoryId: '1',
    id: '6',
    price: 1.25,
  },
];
