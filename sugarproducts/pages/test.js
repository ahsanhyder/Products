import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Products.module.css';
import { Button, Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import Truncate from 'react-truncate';

export default function product1({ data }) {
	const [ expand, setexpand ] = useState(false);
	const [ rmore, setrmore ] = useState(false);
	const [ truncate, settruncate ] = useState(false);
	const [ rtruncate, setrtruncate ] = useState(false);
	const [ productData, setProductData ] = useState(data);
	const [ imgData, setimgData ] = useState(productData.resbody.variants[0].images);
	const [ price, setprice ] = useState(productData.resbody.variants[0].price);
	const [ compare_at_price, setcompare_at_price ] = useState(productData.resbody.variants[0].compare_at_price);
	const [ offerText, setofferText ] = useState(productData.resbody.variants[0].offers);

	const [ show, setShow ] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const tnc = offerText.map((ele) => ele.tnc);

	console.log(tnc);

	//   console.log((imgData))
	console.log('offertext', offerText);
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

	return (
		<div>
			<div>
				<Head>
					<title>Create Next App</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
			</div>
			<div style={{ overflowX: 'hidden' }}>
				

				
				
				<div class="container-fluid mx-1 mt-4 mb-4">
					<div class="my-2">
						<span class="px-1" style={{ fontWeight: 'bold' }}>
							Delivery Details
						</span>
					</div>
                    <div className={styles.wrapper}>
                        <h2 className="item">Box 1</h2>
                        <h2 className="item">Box 2</h2>
                        <h2 className="item">Box 3</h2>
                        <h2 className="item">Box 1</h2>
                        <h2 className="item">Box 2</h2>
                        <h2 className="item">Box 3</h2>
                        <h2 className="item">Box 1</h2>
                        <h2 className="item">Box 2</h2>
                        <h2 className="item">Box 3</h2>
                        <h2 className="item">Box 2</h2>
                        <h2 className="item">Box 3</h2>
                        <h2 className="item">Box 1</h2>
                        <h2 className="item">Box 2</h2>
                        </div>
					
				</div>

				</div>
		</div>
	);
}

export async function getStaticProps() {
	var axios = require('axios');

	var config = {
		method: 'get',
		url: 'https://qa.api.sugarcosmetics.com/products/qa/getProductsv2?handle=aquaholic-priming-moisturizer',
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
