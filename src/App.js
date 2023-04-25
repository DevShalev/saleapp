import React, {useState,useEffect} from 'react';
import { Button , Container , Row ,Col ,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {auth , googleProvider ,db } from './components/firebase-config';
import { signInWithPopup , signOut , createUserWithEmailAndPassword , signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc , getDocs , collection , addDoc , deleteDoc , updateDoc ,doc} from 'firebase/firestore';

import Product from './components/Products';


function App() {

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const [productName , setProductName] = useState("");
  const [productPrice , setProductPrice] = useState("");
  const [productImage , setProductImage] = useState("");
  const [productDescription , setProductDescription] = useState("");

  const productsCollectionRef = collection( db , "products" );

  const [products , setProducts] = useState([]);


  //FIREBASE CRUD FUNCTIONS
  const addProduct = async() =>{
    
    if(productName != "" && productPrice != ""){
      try {
      
        await addDoc(productsCollectionRef ,{ 
          productName : productName,
          productPrice : productPrice,
          productImage : productImage ,
          productDescription : productDescription,
          createdAt: Date.now(),
          uid: auth.currentUser.uid
  
        })
        loadProducts();
        toast("Product Was Added");
      } catch (error) {
        toast(error.message);
      }
    }
  }

  const loadProducts = async() =>{
    try {
      const data = await getDocs(productsCollectionRef);
      const filteredData = data.docs.map((doc)=> (
        {
          ...doc.data(),
          id: doc.id
        }
      )) 
        setProducts(filteredData);
    } catch (error) {
      toast(error.message);
    }
  }

  useEffect(()=>{
    loadProducts();
  },[])

  console.log(products);


  //AUTHENTICATION FIREBASE FUNCTIONS
  const signinWithGoogle = async() =>{

    try {
      await signInWithPopup(auth,googleProvider);
    } catch (error) {
      toast(error.message);
    }

  }

  const logout= async() =>{
    try {
      await signOut(auth);
    } catch (error) {
      toast(error.message);
    }
  }

  const signIn = async() =>{

      if(email != "" && password != ""){
        try {
          //Login =>
          await signInWithEmailAndPassword(auth,email ,password);

        } catch (error) {
          toast(error.message);
        }
      }else{
        toast("All inputs are required");
      }
  }

  const createUser = async() =>{

    if(email != "" && password != ""){
      try {
        //Create New User/ =>
        await createUserWithEmailAndPassword( auth , email ,password );
      
      } catch (error) {
        toast(error.message);
      }

    }else{
      toast("All inputs are required");
    }
}


  //products functions!
  const deleteProduct = async(id) =>{
    const productDoc = doc(db , "products" , id);
    await deleteDoc(productDoc);
    loadProducts();
    toast("Product Was Removed!");
  }

  return (
    <>
      <Container>
        <ToastContainer />
        <Row>
          <Col lg={3}>
          
          <h4>Connect with Google</h4>
          <p>You can use your google account to connect with this site</p>
          <br/>
          <Button onClick={signinWithGoogle} className='btn btn-info' style={{width:'100%'}}>Connect With Google</Button>
          <br/><br/>
          <h4>Connect with Email & Password</h4>
          
          
          <Form>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" onChange={(text)=> setEmail(text.target.value)}/>
            </Form.Group>
          </Form>

          <Form>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password"  onChange={(text)=> setPassword(text.target.value)}/>
            </Form.Group>
          </Form>

          <Button onClick={signIn} className='btn btn-primary' style={{width:'45%' ,margin:5 }} >SignIn</Button>
          <Button onClick={createUser} className='btn btn-success' style={{width:'45%',margin:5 }} >Create User</Button>
          
      
          <br/><br/>
          <Button onClick={logout} className='btn btn-danger' style={{width:'100%'}} >LogOut</Button>
          </Col>
          <Col lg={9}>
            <Container>
              <Row style={{marginTop:10}}>
                <Col lg={4}> <input type="text" placeholder="Product Name" className='form-control' onChange={ (e)=> setProductName(e.target.value)} /> </Col>
                
                <Col lg={4}> <input type="text" placeholder="Product Price" className='form-control' onChange={ (e)=> setProductPrice(e.target.value)} /> </Col>
                <Col lg={4}> <input type="text" placeholder="Product Image" className='form-control' onChange={ (e)=> setProductImage(e.target.value)} /> </Col>
              </Row>
              <Row style={{marginTop:10}}>
                <Col lg={8} > <input type="text" placeholder="Product Description" className='form-control' onChange={(e)=> setProductDescription(e.target.value)} /> </Col>
                <Col lg={4}> <Button variant='outline-success' style={{width:'100%'}} onClick={addProduct} >Add Product</Button></Col>
              </Row>

              
              
              
              
            
              <Row style={{marginTop:40}}>
              {
              products.map((item) => ( 
              <Product product = {item} 
               deleteThisProduct={()=> {deleteProduct(item.id)}}
               reload ={()=>{loadProducts()}}
              />
              ))
            }
              </Row>
            </Container>

            

          </Col>
        </Row>
        
      </Container>
    </>
  );
}

export default App;
