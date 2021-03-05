import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Products.module.css';
import { Button, Modal, Form } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import Truncate from 'react-truncate';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import ProductNavbar from './ProductNavbar'
import { useRouter } from 'next/router'
import Router from "next/router"


export default function Product4({ data }) {
    console.log('product4');
    const router = useRouter()
    const [ expand, setexpand ] = useState(false);
    const [ rmore, setrmore ] = useState(false);
    const [ truncate, settruncate ] = useState(false);
    const [ rtruncate, setrtruncate ] = useState(false);
    const [ productData, setProductData ] = useState(data);
    const [ imgData, setimgData ] = useState(productData && productData.resbody.variants[0].images);
    const [ price, setprice ] = useState(productData && productData.resbody.variants[0].price);
    const [ compare_at_price, setcompare_at_price ] = useState(
        productData && productData.resbody.variants[0].compare_at_price
    );
    const [varientIndex, setvarientIndex] = useState(productData && productData.resbody.variants[0])
    const [activeVariant,setactiveVariant] = useState(0)
    const [variantId, setVariantId] = useState(productData.resbody.variants[0].id)
    const [ offerText, setofferText ] = useState(productData && productData.resbody.variants[0].offers);
    const [ selectPrice, setselectPrice ] = useState(productData && productData.resbody.variants);
    const [ changeTitle, setchangeTitle ] = useState(productData && productData.resbody.variants[0].title);
    const [ pinchange, setpinchange ] = useState('');
    const [ deliveryData, setDeliveryData ] = useState({});
    const [ show, setShow ] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const tnc = offerText.map((ele) => ele.tnc);
    const handleToggle = () => {
        setexpand(!expand);
    };
    const handletruncate = (truncated) => {
        if (truncate !== truncated) {
            settruncate(truncated);
        }
    };
    const handlermore = () => {
        setrmore(!rmore);
    };
    const handlertruncate = (truncated) => {
        if (rtruncate !== truncated) {
            setrtruncate(truncated);
        }
    };
    const titleChange = (images, price,id) => {
        setimgData(images);
        setprice(price);
        // setactiveVariant(ind)
        setVariantId(id)
    };
    const handleChange = (e) => {
        setpinchange(e.target.value);
    };
    const deliveryUpdate = () => {
        if (pinchange.length === 0) {
            return;
        }
        var data = JSON.stringify({ pincode: pinchange });
        var config = {
            method: 'post',
            url: 'https://qa.api.sugarcosmetics.com/pincode/qa/pincodeDateOfDelivery',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function(response) {
                setDeliveryData(response.data);
                console.log(JSON.stringify(response.data));
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    };
    const handleCart = (varId,prodId) => {
        console.log(varId,prodId)
        var data = {
          product_id: prodId,
          variant_id: varId,
          quantity: 1,
          customer_id: 2168277991507
        };
        var config = {
            method: "post",
            url: "https://qa.api.sugarcosmetics.com/cart/qa/addItemToCartV2",
            headers: {
              Authorization: "XT4ROmmNaPpgEsmmGzcPfvc69YK3RPSP"
            },
            data: data,
          };
          axios(config)
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
    };

    const handleAddWishlist = (varId, prodId) =>{
		// alert("Added to wishlist !")
		console.log(varId, prodId);
		var data = {
			moveToWishlist:0,
			product_id:prodId,
			variant_id:varId,
			customer_id:3449846562899
		};
		
		var config = {
		  method: 'post',
		  url: 'https://prod.api.sugarcosmetics.com/wishlist/prod/addWishlist',
		  headers: { 
			'Authorization': ' aCsf4laORaLOw3J1lBPVUjQn6EqfNcYg', 
			'Content-Type': 'application/json'
		  },
		  data : data
		};
		
		axios(config)
		.then(function (response) {
			console.log("wishresponse",response)
		  console.log(response.data);
		  if(response.data.statusId==1){
			  router.reload()
		  }
		  return response.data
		})
		.catch(function (error) {
		  console.log(error);
		});
		
	}

	const handleRemoveWishlist = (varId, prodId) =>{
		console.log(varId, prodId);
		var data = {
			moveToWishlist:0,
			product_id:prodId,
			variant_id:varId,
			customer_id:3449846562899
		};

var config = {
  method: 'post',
  url: 'https://prod.api.sugarcosmetics.com/wishlist/prod/removeWishlist',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
		router.reload();
	
  return response.data;
})
.catch(function (error) {
  console.log(error);
});

	}
    return (
        <div>
        
            <div style={{ overflowX: 'hidden' }}>
                <div className="fixed-top mt-5" style={{ backgroundColor: 'white', height:"260px" }}>
                    <div className={`container-fluid mb-5`}>
                    <ProductNavbar title={productData && productData.resbody.title}/>
                    </div>
                    <div className="mt-5"></div> 
                        <div className="row" style={{paddingBottom:"10px",paddingTop:"15px",marginTop:"-36px"}}>
                            <div className="col-1 col-sm-3 col-md-4  " />
                            <div className="col-10 col-sm-7 col-md-4 col-lg-4">
                                <Carousel controls={false}>
                                    {imgData &&
                                        imgData.map((ele) => (
                                            <Carousel.Item>
                                                <img className="d-block" width="360" height="210px" src={ele} alt="First slide" />
                                            </Carousel.Item>
                                        ))}
                                </Carousel>
                                {
                                   productData && productData.resbody.rating!=null? <div className="fixedBottom d-flex align-items-center shadow-sm" style={{height:"40px",width:"auto",borderRadius:"20px 20px 20px 20px",marginTop:"-85px",marginLeft:"-35px",zIndex:"2",backgroundColor:"white",position:"absolute"}}>
                                   <span><img src="../star_filled.png" alt="Rating star" style={{height:"25px",marginRight:"15px",marginLeft:"15px"}}/></span>
                                   <span><small className="text-muted" style={{fontSize:"15px",marginRight:"15px"}}>{`${(productData && productData.resbody.rating.average).toFixed(1)}`} ({productData && productData.resbody.rating.count})</small></span>
                               </div>:<div></div>
                                }
                                
                                </div>  
                            <div className="col-1 col-sm-2 col-md-4" />
                        </div>
                    </div>
                    <div style={{paddingTop:"315px"}}>
                    <div className={styles.wrapper}>
                        {selectPrice && selectPrice.map((ele,index) => {
                            return (
                                <div className="container-fluid">
                                    <div className={`row`}>
                                        <>
                                        {variantId===ele.id?(<div className="" style={{height:"65px",width:"90px", border:"2px solid black"}}>
                                        <div
                                            className={`col p-2  my-2  ${styles.item}`}
                                            style={{ width: '20px', height: '45px',display:"flex",justifyContent:"center",alignItems:"center" }}
                                            onClick={() => titleChange(ele.images, ele.price, ele.id)}
                                        >
 
                                        <span className=" p-2 " style={{width:"20", height:"40"}}>{ele.title}</span>
                                        </div>
                                        </div>):(<div>
                                            <div
                                            className={`col m-2  ${styles.item}`}
                                            style={{ width: '20px', height: '45px', border: '1px solid black',display:"flex",justifyContent:"center",alignItems:"center", textAlign:"center" }}
                                            onClick={() => titleChange(ele.images, ele.price, ele.id)}
                                        >
                                            
                                            <span>{ele.title}</span>
                                        </div>
                                        </div>)}
                                        </>
                                        {/* <div style={{height:"48px",width:"90px", border:"1px solid black"}}> */}
                                        {/* <div
                                            className={`col m-2  ${styles.item}`}
                                            style={{ width: '20px', height: '40px', border: '1px solid black',display:"flex",justifyContent:"center",alignItems:"center" }}
                                            onClick={() => titleChange(ele.images, ele.price)}
                                        >
                                            {ele.title}
                                        </div> */}
                                        </div>
                                    </div>
                            );
                        })}
                    </div>
                    
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col text-center">
                                <p className={styles.productTitle} style={{marginTop:"-12px"}}>{productData && productData.resbody.title}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <h5 className={`text-danger ${styles.linecut}`}>
                                    {compare_at_price && `Rs. ${compare_at_price}`}
                                </h5>
                            </div>
                            <div className="col text-center">
                                <p className={styles.productTitle} style={{marginTop:"-10px"}}>Rs. {price}</p>
                            </div>
                            <div className="col">
                                {compare_at_price && (
                                    <h5 className="text-danger">
                                        ({Math.floor((compare_at_price - price) / compare_at_price * 100)} % Off)
                                    </h5>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                    <div className="container-fluid mx-2">
                        <div className="row mt-2 mb-2">
                            <div className="col">
                                <h5 className={styles.headingMain2}>RECIPIENT'S DETAILS</h5>
                            </div>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col">
                                <Form>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control type="email" placeholder="Recipient's Name" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control type="email" placeholder="Recipient's Email ID" />
                                    </Form.Group>
                                </Form>
                                <p className="h6 mt-3 fst-italic">Gift will be sent on recipient's mail</p>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid mx-2">
                        <div className="row">
                            <div className="col">
                                <h6 className={styles.headingMain}>AVAILABLE OFFERS</h6>
                            </div>
                        </div>
                        <div>
                            <Truncate
                                lines={!expand && 2}
                                ellipsis={
                                    <span className={styles.readmore} onClick={handleToggle}>
                                        <strong  style={{color: '#DB7093', paddingLeft:"15px"}}>+ more </strong>
                                    </span>
                                }
                                onTruncate={handletruncate}
                            >
                                {offerText && offerText.map((ele) => (
                                    <div>
                                        {ele.productOfferText}
                                        <br />
                                        <Button variant="primary" onClick={handleShow}>
                                            Know More
                                        </Button>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title> Terms & Conditions</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p>{ele.tnc}</p>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                ))}
                            </Truncate>
                            {!truncate &&
                            expand && (
                                <span className={styles.readmore} onClick={handleToggle}>
                                    <strong  style={{color: '#DB7093'}}> - less</strong>
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="col-1 col-sm-2 col-md-4 col-lg-4 " />
                        <div
                            className={`container-fluid col-10 col-sm-8 col-md-4 col-lg-4 fixed-bottom ${styles.cartDiv}`}
                        >
                            {/* <div className={styles.likeIcon}>
                                <FavoriteBorderRoundedIcon style={{ fontSize: 45 }} onClick={()=>handleAddWishlist(variantId, productData && productData.resbody.id)}/>
                            </div> */}
                            {
								productData && productData.resbody.variants[0].isWishlisted==false?
								
									<div className={styles.likeIcon}>
										<FavoriteBorderRoundedIcon style={{ fontSize: 45 }} onClick={()=>handleAddWishlist(
									productData && productData.resbody.variants[0].id,
										productData && productData.resbody.id)} />
									</div>
								:
								
								<div className={styles.likeIcon}>
									<FavoriteRoundedIcon style={{ fontSize: 45 }} onClick={()=>handleRemoveWishlist(
										productData && productData.resbody.variants[0].id,
									productData && productData.resbody.id)} />
								</div>
							
							}
                            <div className={styles.cartButton} onClick={()=>handleCart(variantId, productData && productData.resbody.id)}>
                                ADD TO CART
                            </div>
                        </div>
                        <div className="col-1 col-sm-2 col-md-4 col-lg-4 " />
                    </div>
                    <div className="container-fluid mx-1 mt-4 mb-4">
                        <div className="my-2">
                            <span className="px-1" style={{ fontWeight: 'bold' }}>
                                Delivery Details
                            </span>
                        </div>
                        <div className="d-flex">
                            <span className="">
                                <input
                                    className="text-center"
                                    type="text"
                                    maxlength="6"
                                    placeholder="Enter Pincode"
                                    style={{
                                        outline: 'none',
                                        border: 'none',
                                        borderBottom: '1px solid black',
                                        fontSize: 'medium',
                                        width:"110px",
                                    }}
                                    onChange={handleChange}
                                />
                            </span>
                            <span
                                className="px-4"
                                style={{ fontWeight: 'bold', color: '#DB7093' }}
                                onClick={deliveryUpdate}
                            >
                                CHECK
                            </span>
                            
                        </div>
                        <h6 className="mt-3">{deliveryData.message}</h6>
                    </div>
                    {/* <div
                        className="my-2 mx-1"
                        style={{
                            fontSize: '12px'
                        }}
                    >
                        <div style={{ border: '1px solid black' }} className="d-flex justify-content-between py-3 px-1">
                            <div>
 
                            <span className="px-1">
                                <img src="/Cruelty_Free.png" width="23" alt="Cruelty Free img" />
                            </span>
                            <span>
                                <span className="" style={{ fontWeight: 'bold' }}>
                                    Cruelty Free
                                </span>
                            </span>
                            </div>
                            <div>
 
                            <span className="px-1">
                                <img src="/Quality_First.png" width="23" alt="Quality First img" />
                            </span>
                            <span className="" style={{ fontWeight: 'bold' }}>
                                <span>Quality First</span>
                            </span>
                            </div>
                            <div>
 
                            <span className="px-1">
                                <img className src="/Easy_Returns.png" width="23" alt="Easy Returns img" />
                            </span>
                            <span>
                                <span style={{ fontWeight: 'bold' }}>Easy Return policy</span>
                            </span>
                            </div>
                        </div>
                    </div> */}
                    <div className={`container-fluid mx-2  ${styles.description4}`}>
                        <div className="row">
                            <div className="col">
                                <h6 className={styles.headingMain}>PRODUCT DESCRIPTION</h6>
                            </div>
                        </div>
                        <Truncate
                            lines={!rmore && 5}
                            ellipsis={
                                <span className={styles.readmore} onClick={handlermore}>
                                    <strong  style={{color: '#DB7093', paddingLeft:"15px"}}>...Read more</strong>
                                </span>
                            }
                            onTruncate={handlertruncate}
                        >
                            <div dangerouslySetInnerHTML={{ __html: [productData && productData.resbody.body_html ] }} />
                        </Truncate>
                        {!rtruncate &&
                        rmore && (
                            <span className={styles.readmore} onClick={handlermore}>
                                <strong style={{color: '#DB7093', paddingLeft:"15px"}}>Show less</strong>
                            </span>
                        )}
                    </div>
                    <div
						className="my-2 mx-1"
						style={{
							fontSize: '12px'
						}}
					>
						<div style={{ border: '1px solid black',marginBottom: '10px' }} className="d-flex justify-content-between py-3 px-1">
							<div>
								<span className="px-1">
									<img src="/Cruelty_Free.png" width="23" alt="Cruelty Free img" />
								</span>
								<span>
									<span className="" style={{ fontWeight: 'bold' }}>
										Cruelty Free
									</span>
								</span>
							</div>
							<div>
								<span className="px-1">
									<img src="/Quality_First.png" width="23" alt="Quality First img" />
								</span>
								<span className="" style={{ fontWeight: 'bold' }}>
									<span>Quality First</span>
								</span>
							</div>
							<div>
								<span className="px-1">
									<img className src="/Easy_Returns.png" width="23" alt="Easy Returns img" />
								</span>
								<span>
									<span style={{ fontWeight: 'bold' }}>Easy Return policy</span>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom: '110px'}}>
					<small style={{fontWeight:"bold", color:'#DB7093'}}>~Rule the world, one look at a time~</small>
				</div>
            </div>
    );
}
 

