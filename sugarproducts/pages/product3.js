import Head from 'next/head';
import { useState } from 'react';
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


export default function Product3({ data }) {
	console.log('product2');
	const router = useRouter()
	const [ cartVariants, setcartVariants ] = useState([]);
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
	const [ varientIndex, setvarientIndex ] = useState(productData && productData.resbody.variants[0].index);
	const [ variantId, setVariantId ] = useState(productData.resbody.variants[0].id);
	const [ offerText, setofferText ] = useState(productData && productData.resbody.variants[0].offers);
	const [ products, setproducts ] = useState(productData && productData.resbody.sugar_options);
	const [ productTitle, setproductTitle ] = useState('');
	const [ sugarOptionsTitle, setsugarOptionsTitle ] = useState(productData && productData.resbody.sugar_options);
	const [ activeVariant, setactiveVariant ] = useState(null);

	const [ show, setShow ] = useState(false);
	const [ active, setactive ] = useState(false);
	const [ pinchange, setpinchange ] = useState('');
	const [ deliveryData, setDeliveryData ] = useState({});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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

	const titleChange = (images, mainId, mainTitle, variantTitle, variantId) => {
		console.log(images, mainId, mainTitle, variantTitle, variantId, 'in title change');
		var img = images[0];
		console.log(img);
		var obj = {
			image_url: img,
			product_id: mainId,
			product_title: mainTitle,
			title: variantTitle,
			variant_id: variantId
		};
		if (cartVariants.length > 0) {
			var cartFlag = false;
			for (var i = 0; i < cartVariants.length; i++) {
				if (cartVariants[i].product_id == mainId) {
					cartVariants[i] = obj;
					cartFlag = true;
					break;
				}
			}

			if (cartFlag == false) {
				cartVariants.push(obj);
			}
		} else {
			cartVariants.push(obj);
		}

		setimgData(images);
		// 		setactiveVariant(ind);
		// 		setVariantId(id);
		// 		setproductTitle(title)
		// console.log(setproductTitle(title))
	};

	const handleChange = (e) => {
		setpinchange(e.target.value);
	};

	const handleCart = () => {
		// console.log(varId,prodId)

		if (cartVariants.length == products.length) {
			console.log(cartVariants);
			var data = {
				is_gwp: 0,
				product_id: productData.resbody.variants[0].product_id,
				product_options_kit: cartVariants,
				variant_id: productData.resbody.variants[0].id,
				sugar_product_type: 2,
				quantity: 1,
				customer_id: 3201015742547
			};
			console.log(data);
			var config = {
				method: 'post',
				url: 'https://qa.api.sugarcosmetics.com/cart/qa/addItemToCartV2',
				headers: {
					Authorization: 'rXPinYygMxB8ze5XaKt1kmLtN5vEcQ7B'
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
		} else {
			alert('Please pick a variant to add this product to your cart');
		}
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
	console.log(cartVariants, 'cart');
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
			{/* <div>
				<Head>
					<title>Create Next App</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
			</div> */}
			<div style={{ overflowX: 'hidden' }}>
				<div className="fixed-top" style={{ backgroundColor: 'white', height:"420px" }}>
					<div className={`container-fluid mt-3 mb-3 ${styles.sticky}`}>
					<div className="mb-5">
                    <ProductNavbar title={productData && productData.resbody.title}/>
                    </div>
                    <div className="mt-5"></div>
						<div className="row mt-5">
							<div className="col-2 col-sm-3 col-md-4 col-lg-5 " />
							<div className="col-8 col-sm-7 col-md-4 col-lg-2">
								<Carousel controls={false} style={{paddingTop:"15px",padding:"15px"}}>
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
							<div className="col-2 col-sm-2 col-md-4 col-lg-5" />
						</div>
					</div>

					<div className="container-fluid">
						<div className="row">
							<div className="col text-center" style={{marginTop:"-15px"}}>
								<p className={styles.productTitle}>{productData && productData.resbody.title}</p>
							</div>
						</div>
						<div className="row" style={{marginTop:"-10px"}}>
							<div className="col-4">
								<h5 className={`text-danger ${styles.linecut}`}>
									{compare_at_price && `Rs. ${compare_at_price}`}
								</h5>
							</div>
							<div className="col-4 text-center">
								<p className={styles.productTitle2}>Rs. {price}</p>
							</div>
							<div className="col-4">
								{compare_at_price && (
									<h5 className="text-danger">
										({Math.floor((compare_at_price - price) / compare_at_price * 100)} % Off)
									</h5>
								)}
							</div>
						</div>
					</div>
				</div>
				<div style={{paddingTop:"417px"}}>
					<div className="container-fluid mx-2 mb-4 mt-4">
						{products &&
							products.map((ele) => {
								return (
									<div>
										<div className="d-flex">
											<div
												className={`col-4  text-center border d-flex justify-content-center align-items-center ${styles.divp2} `}
											>
												{ele.title}
											</div>
											{ele.products.map((ele1) => {
												return (
													<div
														className={`col-8  text-center border d-flex justify-content-center align-items-center ${styles.divp21} `}
													>
														{/* {ele1.title} */}
														{/* {console.log(ele1.title)} */}
														{cartVariants.length > 0 ? cartVariants.filter(
															(item) => item.product_title == ele.title && item
														).length > 0 ? (
															cartVariants
																.filter(
																	(item) => item.product_title == ele.title && item
																)
																.map((titleVar) => titleVar.title)
														) : (
															'- SELECT VARIANT -'
														) : (
															'- SELECT VARIANT -'
														)}
													</div>
												);
											})}
										</div>

										<div className={`d-flex ${styles.wrapperp3}`}>
											{ele.products.map((elem) => (
												<div>
													<div
														className={`${cartVariants.length > 0
															? cartVariants.filter(
																	(item) => item.variant_id === elem.id && item
																).length > 0
																? `${styles.product3Active}`
																: `${styles.product3Normal}`
															: `${styles.product3Normal}`}`}
													>
														<div
															className={`${styles.itemp3}    `}
															style={{
																'background-color': `${elem.hexCode}`,
																height: '45px',
																// width: '25px',
																// margin: '4px',
																marginLeft: '4px',
																marginTop: '5px',
																borderRadius: '50%'
															}}
															onClick={() =>
																titleChange(
																	elem.images,
																	elem.product_id,
																	ele.title,
																	elem.title,
																	elem.id
																)}
														/>
													</div>
												</div>
											))}
										</div>
									</div>
								);
							})}
					</div>

					<div className="container-fluid mx-2">
						<div className="row">
							<div className="col">
								<h6 className={styles.headingMain}>AVAILABLE OFFERS</h6>
							</div>
						</div>
						<div>
							<Truncate
								lines={!expand && 3}
								ellipsis={
									<span className={styles.readmore} onClick={handleToggle}>
										<strong  style={{color: '#DB7093', paddingLeft:"15px"}}>+ more </strong>
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
							<div className={styles.cartButton} onClick={handleCart}>
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
							<h5 className="mt-3">{deliveryData.message}</h5>
						</div>
					</div>

					{/* <div
						className="container-fluid  px-2 mt-4 mb-4"
						style={{
							fontSize: '12px'
						}}
					>
						<div style={{ border: '1px solid black' }} className="py-3 px-1">
							<span className="">
								<img src="/Cruelty_Free.png" width="23" alt="Cruelty Free img" />
							</span>
							<span>
								<span className="mx-1 " style={{ fontWeight: 'bold' }}>
									Cruelty Free
								</span>
							</span>
							<span className="px-1">
								<img src="/Quality_First.png" width="23" alt="Quality First img" />
							</span>
							<span className="mx-1" style={{ fontWeight: 'bold' }}>
								<span>Quality First</span>
							</span>
							<span className="px-1">
								<img className src="/Easy_Returns.png" width="23" alt="Easy Returns img" />
							</span>
							<span>
								<span style={{ fontWeight: 'bold' }}>Easy Return policy</span>
							</span>
						</div>
					</div> */}
					<div className={`container-fluid mx-2 ${styles.description3}`}>
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
				</div>
				{productData &&
				productData.resbody.youtube_id && (
					<div className="container mt-3" style={{ marginBottom: '80px' }}>
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
		// </div>
	);
}
