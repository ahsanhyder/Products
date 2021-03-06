import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Products.module.css';
import { Button, Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import Truncate from 'react-truncate';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function Product2({ data }) {
	console.log("product2")
	const [ expand, setexpand ] = useState(false);
	const [ rmore, setrmore ] = useState(false);
	const [ truncate, settruncate ] = useState(false);
	const [ rtruncate, setrtruncate ] = useState(false);
	const [ productData, setProductData ] = useState(data);
	const [ imgData, setimgData ] = useState(productData && productData.resbody.variants[0].images);
	const [ price, setprice ] = useState(productData && productData.resbody.variants[0].price);
	const [ compare_at_price, setcompare_at_price ] = useState(productData && productData.resbody.variants[0].compare_at_price);
	const [ offerText, setofferText ] = useState(productData && productData.resbody.variants[0].offers);
	const [ products, setproducts ] = useState(productData && productData.resbody.sugar_options);
	const [ productTitle, setproductTitle ] = useState(productData && productData.resbody.sugar_options[0].products.title);
	const [ sugarOptionsTitle, setsugarOptionsTitle ] = useState(productData && productData.resbody.sugar_options);
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

	const titleChange = (images) => {
		// alert("hello")
		setimgData(images);
	};

	const handleChange = (e) => {
		setpinchange(e.target.value);
    };
    
    const handleCart = () =>{
var data = '{\r\n    "is_gwp": 0,\r\n    "product_id": 9448894348,\r\n    "quantity": 1,\r\n    "sugar_product_type": 1,\r\n    "variant_id": 12102682837060,\r\n    "customer_id": 2168277991507\r\n}';

var config = {
  method: 'post',
  url: 'https://qa.api.sugarcosmetics.com/cart/qa/addItemToCartV2',
  headers: { 
    'Authorization': ' XT4ROmmNaPpgEsmmGzcPfvc69YK3RPSP', 
    'Content-Type': ' application/json', 
    'version': ' 51'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

    }

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
					<div class={`container-fluid mt-3 mb-3 ${styles.sticky}`}>
						<div class="row">
							<div class="col-1 col-sm-3 col-md-4 col-lg-5 " />
							<div class="col-10 col-sm-7 col-md-4 col-lg-2">
								<Carousel>
									{imgData && imgData.map((ele) => (
										<Carousel.Item>
											<img className="d-block w-100" src={ele} alt="First slide" />
										</Carousel.Item>
									))}
								</Carousel>
							</div>
							<div class="col-1 col-sm-2 col-md-4 col-lg-5" />
						</div>
					</div>

					<div class="container-fluid">
						<div class="row">
							<div class="col text-center">
								<p className={styles.productTitle}>{productData && productData.resbody.title}</p>
							</div>
						</div>
						<div class="row">
							<div class="col-4">
								<h5 class={`text-danger ${styles.linecut}`}>
									{compare_at_price && `Rs. ${compare_at_price}`}
								</h5>
							</div>
							<div class="col-4 text-center">
								<p className={styles.productTitle2}>Rs. {price}</p>
							</div>
							<div class="col-4">
								{compare_at_price && (
									<h5 class="text-danger">
										({Math.floor((compare_at_price - price) / compare_at_price * 100)} % Off)
									</h5>
								)}
							</div>
						</div>
					</div>
				</div>
				<div style={{ marginTop: '140%' }}>
					<div class="container-fluid mx-2 mb-4 mt-4">
						{products && products.map((ele) => {
							return (
								<div>
									<div class="d-flex">
										<div
											class={`col-4  text-center border d-flex justify-content-center align-items-center ${styles.divp2} `}
										>
											{ele.title}
										</div>
										{ele.products.map((ele1) => {
											return (
												<div
													class={`col-8  text-center border d-flex justify-content-center align-items-center ${styles.divp21} `}
												>
													{ele1.title}
												</div>
											);
										})}
									</div>

									<div class="d-flex nowrap">
										{ele.products.map((elem) => (
											// <div class="rounded-circle" style={{
											//     height: '60px',
											//     width: '60px',
											//     margin: '4px',
											//     border: '1px solid black'
											// }}>
											<div
												class=""
												style={{
													'background-color': `${elem.hexCode}`,
													height: '55px',
													width: '55px',
													margin: '9px',
													borderRadius: '50%'
												}}
												onClick={() => titleChange(elem.images)}
											/>
											// </div>
										))}
									</div>
								</div>
							);
						})}
					</div>

					<div class="container-fluid mx-2">
						<div class="row">
							<div class="col">
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
									<strong> - less</strong>
								</span>
							)}
						</div>
					</div>
					<div className={`container-fluid mx-5 my-3 fixed-bottom ${styles.cartDiv}`}>
						<div className={styles.likeIcon}>
							<FavoriteBorderIcon style={{ fontSize: 45 }} />
						</div>
						<div className={styles.cartButton} onClick={handleCart}>ADD TO CART</div>
					</div>

					<div class="container-fluid mx-1 mt-4 mb-4">
						<div class="my-2">
							<span class="px-1" style={{ fontWeight: 'bold' }}>
								Delivery Details
							</span>
						</div>
						<div class="mx-4 mt-2 mb-2">
							<span class="">
								<input
									class="text-center"
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
								class="px-4"
								style={{ fontWeight: 'bold', color: '#DB7093' }}
								onClick={deliveryUpdate}
							>
								CHECK
							</span>
							<h5 class="mt-3">{deliveryData.message}</h5>
						</div>
					</div>
                    <div>
                    <button type="button" class="btn btn-primary" onClick={handleCart}>Primary</button>
                    </div>

					<div
						className="container-fluid  px-2 mt-4 mb-4"
						style={{
							fontSize: '12px'
						}}
					>
						<div style={{ border: '1px solid black' }} className="py-3 px-1">
							<span class="">
								<img src="/Cruelty_Free.png" width="23" alt="Cruelty Free img" />
							</span>
							<span>
								<span class="mx-1 " style={{ fontWeight: 'bold' }}>
									Cruelty Free
								</span>
							</span>
							<span class="px-1">
								<img src="/Quality_First.png" width="23" alt="Quality First img" />
							</span>
							<span class="mx-1" style={{ fontWeight: 'bold' }}>
								<span>Quality First</span>
							</span>
							<span class="px-1">
								<img class src="/Easy_Returns.png" width="23" alt="Easy Returns img" />
							</span>
							<span>
								<span style={{ fontWeight: 'bold' }}>Easy Return policy</span>
							</span>
						</div>
					</div>
					<div class="container-fluid mx-2">
						<div class="row">
							<div class="col">
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
							<div dangerouslySetInnerHTML={{ __html: [productData && productData.resbody.body_html ] }} />
						</Truncate>
						{!rtruncate &&
						rmore && (
							<span className={styles.readmore} onClick={handlermore}>
								<strong>Show less</strong>
							</span>
						)}
					</div>
				</div>
				{productData && productData.resbody.youtube_id && (
					<div class="container mt-3">
						<div class="">
							<iframe
								class="bye"
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

export async function getStaticProps() {
	var axios = require('axios');

	var config = {
		method: 'get',
		url: 'https://qa.api.sugarcosmetics.com/products/qa/getProductsv2?handle=boss-babe-kit',
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
