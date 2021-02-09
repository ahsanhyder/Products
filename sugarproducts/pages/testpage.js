import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Products.module.css';
import { Button, Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import Truncate from 'react-truncate';

export default function Product1({ data }) {
	const [ expand, setexpand ] = useState(false);
	const [ rmore, setrmore ] = useState(false);
	const [ truncate, settruncate ] = useState(false);
	const [ rtruncate, setrtruncate ] = useState(false);
	const [ productData, setProductData ] = useState(data);
	const [ imgData, setimgData ] = useState(productData.resbody.variants[0].images);
	const [ price, setprice ] = useState(productData.resbody.variants[0].price);
	const [ compare_at_price, setcompare_at_price ] = useState(productData.resbody.variants[0].compare_at_price);
	const [ offerText, setofferText ] = useState(productData.resbody.variants[0].offers);
	const [ pinchange, setpinchange ] = useState('');
	const [ deliveryData, setDeliveryData ] = useState({});

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

	return (<div>
            <div>
				<Head>
					<title>Create Next App</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
			</div>
            <div>
            <div class="fixed-top bg-primary" style={{height:"90px",marginBottom:"50px"}}>
                <div>Hello</div>
            </div>
            
            </div>
            
            <div style={{marginTop:"15%"}}>
            <main>
                <div class="container-fluid">
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>
                <h1>vsvjvxjh</h1>

                </div>
            </main>
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
