import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from '../styles/Products.module.css';
import { Button, Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Truncate from 'react-truncate';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function product3({ data }) {
	console.log('product3');
	const [ expand, setexpand ] = useState(false);
	const [ rmore, setrmore ] = useState(false);
	const [ truncate, settruncate ] = useState(false);
	const [ rtruncate, setrtruncate ] = useState(false);
	const [ productData, setProductData ] = useState(data);
	const [ imgData, setimgData ] = useState(productData && productData.resbody.variants[0].images);
	const [ price, setprice ] = useState(productData && productData.resbody.variants[0].price);
	const [ stitle, setstitle ] = useState(productData && productData.resbody.variants[0].title);
	const [ readMore, setReadMore ] = useState(false);
	const [ compare_at_price, setcompare_at_price ] = useState(
		productData && productData.resbody.variants[0].compare_at_price
	);
	const [varientIndex, setvarientIndex] = useState(productData && productData.resbody.variants[0])

	const [activeVariant,setactiveVariant] = useState(0)
	const [ products, setproducts ] = useState(productData && productData.resbody.sugar_options);
	const [ offerText, setofferText ] = useState(productData && productData.resbody.variants[0].offers);
	const [ variant, setvariant ] = useState(productData && productData.resbody.variants);
	const [ changeTitle, setchangeTitle ] = useState(productData && productData.resbody.variants[0].title);
	const [ pinchange, setpinchange ] = useState('');
	const [ show, setShow ] = useState(false);
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

	const titleChange = (title, images, offers,ind) => {
		setchangeTitle(title);
		setimgData(images);
		setofferText(offers);
		setactiveVariant(ind)

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

	const handleCart = () => {
		var data =
			'{\r\n    "is_gwp": 0,\r\n    "product_id": 2350278148179,\r\n    "product_options_kit": [\r\n        {\r\n            "image_url": "https://cdn.shopify.com/s/files/1/0906/2558/products/sugar-cosmetics-smudge-me-not-liquid-mini-lipstick-03-tan-fan-mauve-nude-12001852555347.jpg?v=1577158883",\r\n            "product_id": 4160422019155,\r\n            "product_title": "Your mini liquid lipstick #1",\r\n            "title": "03 Tan Fan (Mauve Nude)",\r\n            "variant_id": 30263398334547\r\n        },\r\n        {\r\n            "image_url": "https://cdn.shopify.com/s/files/1/0906/2558/products/sugar-cosmetics-smudge-me-not-liquid-mini-lipstick-04-plum-yum-muted-plum-12001853571155.jpg?v=1577172935",\r\n            "product_id": 4160427786323,\r\n            "product_title": "Your mini liquid lipstick #2",\r\n            "title": "04 Plum Yum (Muted Plum)",\r\n            "variant_id": 30263405445203\r\n        },\r\n        {\r\n            "image_url": "https://cdn.shopify.com/s/files/1/0906/2558/products/sugar-cosmetics-smudge-me-not-liquid-mini-lipstick-05-rust-lust-red-terracotta-12001853964371.jpg?v=1577172921",\r\n            "product_id": 4160432570451,\r\n            "product_title": "Your mini liquid lipstick #3",\r\n            "title": "05 Rust Lust (Red Terracotta)",\r\n            "variant_id": 30263413145683\r\n        },\r\n        {\r\n            "image_url": "https://cdn.shopify.com/s/files/1/0906/2558/products/sugar-cosmetics-smudge-me-not-liquid-mini-lipstick-06-tangerine-queen-orange-coral-12001859043411.jpg?v=1577172833",\r\n            "product_id": 4160436404307,\r\n            "product_title": "Your mini liquid lipstick #4",\r\n            "title": "06 Tangerine Queen (Orange Coral)",\r\n            "variant_id": 30263418650707\r\n        },\r\n        {\r\n            "product_id": 4500284407891,\r\n            "product_title": "Your Coffret box #1",\r\n            "title": "Black Mini Box",\r\n            "variant_id": 31983959933011\r\n        }\r\n    ],\r\n    "quantity": 1,\r\n    "sugar_product_type": 2,\r\n    "variant_id": 21206334177363,\r\n    "customer_id": 2168277991507\r\n}';

		var config = {
			method: 'post',
			url: 'https://qa.api.sugarcosmetics.com/cart/qa/addItemToCartV2',
			headers: {
				'Content-Type': ' application/json',
				Authorization: ' XT4ROmmNaPpgEsmmGzcPfvc69YK3RPSP',
				os_type: ' 1',
				version: ' 51'
			},
			data: data
		};

		axios(config)
			.then(function(response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function(error) {
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

	return (
		<div>
			<div>
				<Head>
					<title>Create Next App</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
			</div>
			<div style={{ overflowX: 'hidden' }}>
				<div className="fixed-top" style={{ backgroundColor: 'white' }}>
					<div className={`container-fluid mt-3 mb-3 ${styles.sticky}`}>
						<div className="row">
							<div className="col-1 col-sm-3 col-md-4  col-lg-5" />
							<div className="col-10 col-sm-7 col-md-4 col-lg-2">
								<Carousel
									touch={true}
									slide={true}
									ref={createRef}
									controls={false}
									indicators={true}
									interval={3500}
								>
									{imgData &&
										imgData.map((ele) => (
											<Carousel.Item>
												<img className="d-block w-100" src={ele} alt="First slide" />
											</Carousel.Item>
										))}
								</Carousel>
							</div>
							<div className="col-1 col-sm-2 col-md-4 col-lg-5" />
						</div>
					</div>

					<div className="container-fluid">
						<div className="row">
							<div className="col text-center">
								<p className={styles.productTitle}>{productData && productData.resbody.title}</p>
							</div>
						</div>
						<div className="row">
							<div className="col text-center">
								<p className={styles.productTitle1}>{changeTitle}</p>
							</div>
						</div>
						<div className="row">
							<div className="col text-center">
								<h5 className={`text-danger ${styles.linecut}`}>
									{compare_at_price && `Rs. ${compare_at_price}`}
								</h5>
							</div>
							<div className="col text-center">
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
				<div className={styles.marginTopFloat2}>
					<div className={styles.wrapper3}>
						{variant &&
							variant.map((ele,index) => {
								return (
									<div className="container-fluid">
										<div className={`row`}>
											{activeVariant===index ? <>
											{ele.inventory_quantity !==0 ?	<div style={{height:"70px", width:"70px",borderRadius:"50%",border:"1px solid black",marginRight:"14px"}}>

<div
	className={` ${styles.item3}`}
	style={{
		'background-color': `${ele.hexCode}`,
		height: '55px',
		width: '55px',
		marginTop:"7px",
		marginLeft:"-7px",
		borderRadius: '50%'
	}}
	onClick={() => titleChange(ele.title, ele.images, ele.offers,index)}
/></div>  : <div style={{height:"70px", width:"70px",borderRadius:"50%",border:"1px solid black",marginRight:"14px"}}>
<div
													className={` ${styles.item3}`}
													style={{
														'background-color': `${ele.hexCode}`,
														height: '55px',
														width: '55px',
														marginTop:"-9px",
														marginLeft:"-7px",
														borderRadius: '50%'
													}}
													onClick={() => titleChange(ele.title, ele.images, ele.offers,index)}
												>
													<div
														style={{
															border: '2px solid white',
															width: '99px',
															marginTop: '15px',
															marginBottom:"3px",
															transform: 'rotate(105deg)'
														}}
													/>
												</div>
	</div>}
											</>:<>
											{ele.inventory_quantity !== 0 ?
											<div
											className={` ${styles.item3}`}
											style={{
												'background-color': `${ele.hexCode}`,
												height: '55px',
												width: '55px',
												marginTop:"7px",
		marginLeft:"-7px",
												borderRadius: '50%'
											}}
											onClick={() => titleChange(ele.title, ele.images, ele.offers,index)}
										/>
											 : 												<div
											 className={` ${styles.item3}`}
											 style={{
												 'background-color': `${ele.hexCode}`,
												 height: '55px',
												 width: '55px',
												 marginTop:"7px",
		marginLeft:"-7px",
												 borderRadius: '50%'
											 }}
											 onClick={() => titleChange(ele.title, ele.images, ele.offers,index)}
										 >
											 <div
												 style={{
													 border: '2px solid white',
													 width: '55px',
													 marginTop: '30px',
													 transform: 'rotate(105deg)'
												 }}
											 />
										 </div>}
											</>}
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
										<strong>+ more </strong>
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
									<strong> - less</strong>
								</span>
							)}
						</div>
					</div>

					<div className="container-fluid">
					<div className="col-1 col-sm-2 col-md-4 col-lg-4 " />
					<div className={`container-fluid col-10 col-sm-8 col-md-4 col-lg-4 fixed-bottom ${styles.cartDiv}`}>
						<div className={styles.likeIcon}>
							<FavoriteBorderIcon style={{ fontSize: 45 }} />
						</div>
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
						<div className="mx-4 mt-2 mb-2">
							<span className="">
								<input
									className="text-center"
									type="text"
									placeholder="Enter Pincode"
									style={{
										outline: 'none',
										border: 'none',
										borderBottom: '1px solid black',
										fontSize: 'medium'
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

					<div
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
					</div>
					<div className="container-fluid mx-2">
						<div className="row">
							<div className="col">
								<h6 className={styles.headingMain}>PRODUCT DESCRIPTION</h6>
							</div>
						</div>
						<Truncate
							lines={!rmore && 5}
							ellipsis={
								<span className={styles.readmore} onClick={handlermore}>
									<strong>...Read more</strong>
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
								<strong>Show less</strong>
							</span>
						)}
					</div>
				</div>
				{productData &&
				productData.resbody.youtube_id && (
					<div className="container mt-3">
						<div className="">
							<iframe
								className="bye"
								width="100%"
								height="250px"
								src={`https://www.youtube.com/embed/${productData.resbody.youtube_id}`}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
