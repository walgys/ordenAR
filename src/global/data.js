import { database } from '../config/fb';
import { getDocs, collection, query, where, onSnapshot, updateDoc, doc, addDoc, runTransaction } from 'firebase/firestore';

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
     userAccount = snapshot.docs.length > 0 ? {id: snapshot.docs[0].id, ...snapshot.docs[0].data()} : null;
  })
  if(userAccount){
    const userInfoRef = doc(database,'users', userAccount.id)
    await updateDoc(userInfoRef,accountInfo);
  } else {
    await addDoc(usersRef, accountInfo);
  }
}

export const purchaseCart = async (user,cart) => {

  if(cart.products.length === 0) return {result: 'empty'}
  let outOfStock = []
  let result = 'ok';
  await runTransaction(database, async (transaction)=>{
    const products = await getDocs(collection(database,'products'));  
    cart.products.forEach(cartProduct=>{
       const foundProduct = products.docs.find(product=>product.id === cartProduct.productId);
       console.log('found ',foundProduct);
       if(foundProduct){
        const data = {...foundProduct.data()};
        if(data.available - cartProduct.quantity < 0){
          outOfStock.push({id: foundProduct.id, ...data});
        }
       }else{
        throw {'msg':'invalid product'};
       }
    })
    if(outOfStock.length === 0){
      cart.products.forEach(cartProduct=>{
        const docRef = doc(database, 'products', cartProduct.productId)
        const foundProduct = products.docs.find(product=>product.id === cartProduct.productId);
        const data = {...foundProduct.data()};
        updateDoc(docRef,{available: data.available - cartProduct.quantity});
      })
      await addDoc(collection(database, 'orders'), {...cart, userId: user.uid, timestamp: Date.now()});
    } else {
      throw {'msg':'out of stock'} 
    }
   
  }).catch(err=>{
    result = 'outOfStock';
    console.log(err)});

  return {'result': result, 'outOfStock': outOfStock}

}

export const getOrders = async (user) => {
  const usersRef = collection(database,'orders');
  const q = query(usersRef,where('userId','==', user.uid));
  const docs = await getDocs(q);
  let orders=[];
  docs.docs.forEach((doc)=>{
    orders.push({id: doc.id, ...doc.data()});
  })
  return orders.sort((a,b)=>b.timestamp - a.timestamp);
  
}
