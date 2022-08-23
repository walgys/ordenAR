import { database } from '../config/fb';
import { getDocs, collection, query, where, onSnapshot, updateDoc, doc, addDoc } from 'firebase/firestore';

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

export const updateCreateAccount = async (user,accountInfo) =>{
  const usersRef = collection(database,'users');
  const q = query(usersRef,where('userId','==', user.uid));
  let userAccount;
  onSnapshot(q,(snapshot)=>{
    console.log(JSON.stringify({id: snapshot.docs[0].id, ...snapshot.docs[0].data()}))
     userAccount = snapshot.docs.length > 0 ? {id: snapshot.docs[0].id, ...snapshot.docs[0].data()} : null;
  })
  if(userAccount){
    const userInfoRef = doc(database,'users', userAccount.id)
    await updateDoc(userInfoRef,accountInfo);
  } else {
    await addDoc(usersRef, accountInfo);
  }
}
