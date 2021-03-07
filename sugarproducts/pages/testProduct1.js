import Head from 'next/head';
import { useState, useRef } from 'react';
import styles from '../styles/Products.module.css';
import { Button, Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import Truncate from 'react-truncate';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import ProductNavbar from './ProductNavbar'
import { useRouter } from 'next/router'
import Router from "next/router"
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import GradeTwoToneIcon from '@material-ui/icons/GradeTwoTone';
import shadows from '@material-ui/core/styles/shadows';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


export default function Product1({ data }) {
	console.log('product1');
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
	const [ offerText, setofferText ] = useState(productData && productData.resbody.variants[0].offers);
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

	const handleChange = (e) => {
		setpinchange(e.target.value);
	};

	const deliveryUpdate = () => {
		if (pinchange.length<6) {
			console.log("Please enter a valid Pincode")
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

	const handleCart = (varId, prodId) => {
		console.log(varId, prodId);
		var data = {
			product_id: prodId,
			variant_id: varId,
			quantity: 1,
			customer_id: 2168277991507
		};
		var config = {
			method: 'post',
			url: 'https://qa.api.sugarcosmetics.com/cart/qa/addItemToCartV2',
			headers: {
				Authorization: 'XT4ROmmNaPpgEsmmGzcPfvc69YK3RPSP'
			},
			data: data
		};
		axios(config)
			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const createRef = useRef();
	onSwipedLeft: () => {
		createRef.current.next();
	};
	onSwipedRight: () => {
		createRef.current.prev();
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
				<div>
				<div className="fixed-top" style={{ backgroundColor: 'white',height:"420px"}}>
					<div className="container-fluid mt-3 mb-3">
					<div className="mb-5">
                    <ProductNavbar title={productData && productData.resbody.title}/>
                    </div>
					<div className="mt-5"></div>	
					<div style={{marginTop:"70px"}}>
						{/* {
							productData && productData.resbody.tags.split(",").map((elem2)=>{
								return(
									<div>{elem2}</div>
								)
							})
						} */}
					</div>					
					<div className="row" style={{ marginTop:"15px"}}>
							<div className="col-2 col-sm-3 col-md-4 " />
							<div className="col-8 col-sm-7 col-md-4">
								<Carousel
									touch={true}
									slide={true}
									ref={createRef}
									controls={false}
									indicators={true}
									interval={3500}
									style={{paddingTop:"15px",padding:"15px"}}
								>
									{imgData &&
										imgData.map((ele) => (
											<Carousel.Item>
												<img className="d-block w-80" height="280px" src={ele} alt="First slide" />
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
							<div className="col-2 col-sm-2 col-md-4" />
						</div>
					</div>

					<div className="container-fluid">
						<div className="row">
							<div className="col text-center" style={{marginTop:"-20px"}}>
								<p className={styles.productTitle}>{productData && productData.resbody.title}</p>
							</div>
						</div>
						<div className="row">
							<div className="col text-center">
								<h5 className={`text-danger ${styles.linecut}`}>
									{compare_at_price && `Rs. ${compare_at_price}`}
								</h5>
							</div>
							<div className="col text-center" style={{marginTop:"-15px"}}>
								<p className={styles.productTitle}>Rs. {price}</p>
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
				</div>
				<div style={{paddingTop:"435px"}}>
					<div className="container-fluid mx-2">
						<div className="row">
							<div class="col">
								<h6 className={styles.headingMain}>AVAILABLE OFFERS</h6>
							</div>
						</div>
						<div>
							<Truncate
								lines={!expand && 3}
								ellipsis={
									<span className={styles.readmore} onClick={handleToggle}>
										<strong style={{color: '#DB7093', paddingLeft:"15px"}}>+ more </strong>
									</span>
								}
								onTruncate={handletruncate}
							>
								{offerText &&
									offerText.map((ele) => (
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
									<strong style={{color: '#DB7093'}}> - less</strong>
								</span>
							)}
						</div>
					</div>

					<div className="container-fluid">
						<div className="col-1 col-sm-2 col-md-4 col-lg-4 " />
						<div
							className={`container-fluid col-10 col-sm-8 col-md-4 col-lg-4 fixed-bottom ${styles.cartDiv}`}
						>
					{console.log("qqq",productData,productData.resbody.variants[0].isWishlisted)}
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

							{/* <div className={styles.likeIcon}>
								<FavoriteBorderRoundedIcon style={{ fontSize: 45 }} onClick={()=>handleAddWishlist(
									productData && productData.resbody.variants[0].id,
										productData && productData.resbody.id)} />
							</div> */}
							<div
								className={styles.cartButton}
								onClick={handleCart}
								onClick={() =>
									handleCart(
										productData && productData.resbody.variants[0].id,
										productData && productData.resbody.id
									)}
							>
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
						<div className="d-flex ">
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
						{/* {pinchange.length<6?<h6 className="mt-3">{deliveryData.message}</h6>} */}
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
					<div className={`container-fluid mx-2 ${styles.descriptiont1}`}>
						<div className="row">
							<div className="col">
								<h6 className={styles.headingMain}>PRODUCT DESCRIPTION</h6>
							</div>
							
							
						</div>
						<Truncate
							lines={!rmore && 5}
							ellipsis={
								<span className={styles.readmore} onClick={handlermore}>
									<strong style={{color: '#DB7093', paddingLeft:"15px"}}>...Read more</strong>
								</span>
							}
							onTruncate={handlertruncate}
						>
							<div
								dangerouslySetInnerHTML={{ __html: [ productData && productData.resbody.body_html ] }}
							/>
						</Truncate>
						{!rtruncate &&
						rmore && (
							<span className={styles.readmore} onClick={handlermore}>
								<strong style={{color: '#DB7093', paddingLeft:"15px"}}>Show less</strong>
							</span>
						)}
					</div>
					<div className="container-fluid ">
						<div className="d-flex justify-content-between mb-2">
							<div>
								<h6 style={{fontWeight:"bold"}}>RATINGS AND REVIEWS</h6>
							</div>
							<div>
								<AddCircleOutlineIcon style={{height:"32px",marginTop:"-5px",color: '#DB7093'}}/>
							</div>
						</div>
							{/* {
								productData && productData.resbody.rating.reviews.map((elem1)=>{
									{var date = new Date(elem1.createdAt).toString().substring(0,15)}
									return(
										<div className="card shadow-sm">

										<div className="d-flex justify-content-around mx-1 my-4">
												<div style={{height:"65px",width:"65px",border:"1px solid black",borderRadius:"50%"}}></div>
				
												<div>
													<p className="card-text mx-1"><small class="text-success">{elem1.first_name} {elem1.last_name}</small></p>
													<img src="/star_filled.png" style={{height:"30px"}}/>
												</div>
												<div>
													<p class="card-text"><small class="text-muted">{date}</small></p>
												</div>  
											</div>
										</div>
									)
								})
							} */}

<Truncate
							lines={!rmore && 5}
							ellipsis={
								<span className={styles.readmore} onClick={handlermore}>
									<strong style={{color: '#DB7093', paddingLeft:"15px"}}>...Read more</strong>
								</span>
							}
							onTruncate={handlertruncate}
						>
							<div
								dangerouslySetInnerHTML={{ __html: [ productData && productData.resbody.rating.reviews] }}
							/>
						</Truncate>
						{!rtruncate &&
						rmore && (
							<span className={styles.readmore} onClick={handlermore}>
								<strong style={{color: '#DB7093', paddingLeft:"15px"}}>Show less</strong>
							</span>
						)}
						
						{/* <div className="card shadow-sm">

						<div className="d-flex justify-content-around mx-1 my-4">
								<div style={{height:"65px",width:"65px",border:"1px solid black",borderRadius:"50%"}}></div>

								<div>
									<span><p className="card-text mx-1">Puja Saw</p></span>
									<span><img src="/star_filled.png" style={{height:"30px"}}/></span>
								</div>
								<div>
									<p class="card-text">Fri 05 Mar 2021</p>
								</div>  
							</div>
						</div> */}
					</div>
					{productData &&
					productData.resbody.youtube_id && (
						<>
						<div className="container-fluid">
							<h6 style={{fontWeight:"bold"}}>ALSO WATCH</h6>
						</div>
						<div className="container mt-1" style={{ marginBottom: '15px' }}>
							<div className="">
								<iframe
									className="bye"
									width="100%"
									height="200px"
									src={`https://www.youtube.com/embed/${productData.resbody.youtube_id}`}
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>
						</div>
						</>
					)}

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
		</div>
	);
}


export async function getStaticProps() {
	var axios = require('axios');

	var config = {
		method: 'get',
		url: 'https://qa.api.sugarcosmetics.com/products/qa/getProductsv2?handle=aquaholic-hydrating-stick',
		headers: {}
	};

	let data = await axios(config)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.log(error);
		});

	return {
		props: {
			data
		}
	};
}
