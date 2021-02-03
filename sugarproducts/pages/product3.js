import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Products.module.css';
import { Button, Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Truncate from 'react-truncate';

export default function product3({ data }) {
	const [ expand, setexpand ] = useState(false);
	const [ rmore, setrmore ] = useState(false);
	const [ truncate, settruncate ] = useState(false);
	const [ rtruncate, setrtruncate ] = useState(false);
	const [ productData, setProductData ] = useState(data);
	const [ imgData, setimgData ] = useState(productData.resbody.variants[0].images);
	const [ price, setprice ] = useState(productData.resbody.variants[0].price);
	const [ stitle, setstitle ] = useState(productData.resbody.variants[0].title);
	const [ readMore, setReadMore ] = useState(false);
	const [ compare_at_price, setcompare_at_price ] = useState(productData.resbody.variants[0].compare_at_price);
	const [ products, setproducts ] = useState(productData.resbody.sugar_options);
	const [ offerText, setofferText ] = useState(productData.resbody.variants[0].offers);
	const [ variant, setvariant ] = useState(productData.resbody.variants);
	const [ changeTitle, setchangeTitle ] = useState(productData.resbody.variants[0].title);
	const [ show, setShow ] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const tnc = offerText.map((ele) => ele.tnc);

	console.log(productData.resbody.variants[0].title);
	// console.log(productData.resbody.sugar_options[0].title)
	// console.log(productData.resbody.title)
	// console.log(productData.resbody.variants[0].images)
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

	const titleChange = (title, images, offers) => {
		// alert("hello")
		setchangeTitle(title);
		setimgData(images);
		{
			console.log(offers);
		}
		setofferText(offers);
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
				<div class={`container-fluid mt-3 mb-3 ${styles.sticky}`}>
					<div class="row">
						<div class="col-1 col-sm-3 col-md-4  " />
						<div class="col-10 col-sm-7 col-md-4 col-lg-4">
							<Carousel>
								{imgData.map((ele) => (
									<Carousel.Item>
										<img className="d-block w-100" src={ele} alt="First slide" />
									</Carousel.Item>
								))}
							</Carousel>
						</div>
						<div class="col-1 col-sm-2 col-md-4" />
					</div>
				</div>

				<div class="container-fluid">
					<div class="row">
						<div class="col text-center">
							<p className={styles.productTitle}>{productData.resbody.title}</p>
						</div>
					</div>
					<div class="row">
						<div class="col text-center">
							<p className={styles.productTitle1}>{changeTitle}</p>
						</div>
					</div>
					<div class="row">
						<div class="col text-center">
							<h5 class={`text-danger ${styles.linecut}`}>
								{compare_at_price && `Rs. ${compare_at_price}`}
							</h5>
						</div>
						<div class="col text-center">
							<p className={styles.productTitle}>Rs. {price}</p>
						</div>
						<div class="col">
							{compare_at_price && (
								<h5 class="text-danger">
									({Math.floor((compare_at_price - price) / compare_at_price * 100)} % Off)
								</h5>
							)}
						</div>
					</div>
				</div>

				<div className={styles.wrapper3}>
					{variant.map((ele) => {
						return (
							<div class="container-fluid">
								<div className={`row`}>
									<div
										className={` ${styles.item3}`}
										style={{
											'background-color': `${ele.hexCode}`,
											height: '55px',
											width: '55px',
											borderRadius: '50%'
										}}
										onClick={() => titleChange(ele.title, ele.images, ele.offers)}
									/>
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
							{offerText.map((ele) => (
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
							/>
						</span>
						<span class="px-4" style={{ fontWeight: 'bold', color: '#DB7093' }}>
							CHECK
						</span>
					</div>
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
						<div dangerouslySetInnerHTML={{ __html: [ productData.resbody.body_html ] }} />
					</Truncate>
					{!rtruncate &&
					rmore && (
						<span className={styles.readmore} onClick={handlermore}>
							<strong>Show less</strong>
						</span>
					)}
				</div>
			</div>
			{productData.resbody.youtube_id && (
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
	);
}

export async function getStaticProps() {
	var axios = require('axios');

	var config = {
		method: 'get',
		url:
			'https://qa.api.sugarcosmetics.com/products/qa/getProductsv2?handle=kohl-of-honour-intense-kajal-01-black-out-black',
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
