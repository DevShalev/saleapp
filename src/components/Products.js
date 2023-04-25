import React , {useState} from 'react';

import {Card , Col ,Button ,Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

import {auth , googleProvider ,db } from './firebase-config';
import { signInWithPopup , signOut , createUserWithEmailAndPassword , signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc , getDocs , collection , addDoc , deleteDoc , updateDoc ,doc} from 'firebase/firestore';

const Product = props => {

    const [pName ,setPName] = useState(props.product.productName);
    const [pPrice ,setPPrice] = useState(props.product.productPrice);
    const [pImage ,setPImage] = useState(props.product.productImage);
    const [pDesc ,setPDesc] = useState(props.product.productDescription);
    const [isEditable , setIsEditable] = useState(false);

    const updateProduct = async(pid) => {
        const productDoc = doc(db , "products" , pid);
        await updateDoc(productDoc , {
            productName: pName ,
            productPrice: pPrice ,
            productImage: pImage,
            productDescription: pDesc,
        })
        setIsEditable(false);
        props.reload();
    }

    return(
    <Col lg={4} >
        <Card>
        <Card.Img variant="top" style={{height:220}} src={props.product.productImage} />
        <Card.Body>
            
            {
                isEditable ? (
                    <>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Name" value={pName} onChange={(e)=> setPName(e.target.value)} />
                            <Form.Control type="text" placeholder="Price" value={pPrice} onChange={(e)=> setPPrice(e.target.value)} />
                            <Form.Control type="text" placeholder="Image" value={pImage} onChange={(e)=> setPImage(e.target.value)} />
                            <Form.Control type="text" placeholder="Description" value={pDesc} onChange={(e)=> setPDesc(e.target.value)} />
                        </Form.Group>
                    </Form>
                    <Button style={{marginTop:10}} variant="outline-success" onClick={() => {updateProduct(props.product.id)}}>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button style={{marginTop:10}} onClick={() => setIsEditable(!isEditable)} variant="outline-primary">Back</Button>
                    </>
                ) : (
                    <>
                    <Card.Title>{props.product.productName} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Price: {props.product.productPrice}&#8362;</Card.Title>
                    <Card.Text> {props.product.productDescription} </Card.Text>
                    <Button variant="outline-primary" onClick={() => setIsEditable(!isEditable)}>Edit Product</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={props.deleteThisProduct} variant="outline-danger">Delete Product</Button>
                    </>
                )
            }

            

            
        </Card.Body>
        </Card>

    </Col>
    )
}

export default Product;