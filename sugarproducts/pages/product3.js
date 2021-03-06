import React from "react"
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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import StarRatingComponent from 'react-star-rating-component';
import Drawer from "react-bottom-drawer"
import RemoveIcon from '@material-ui/icons/Remove';
import CancelIcon from '@material-ui/icons/Cancel';
import TruncComponent from './truncate'


export default function Product3({ data }) {
	console.log('product2');
	const router = useRouter()
	const [notification, setNotification] = useState(false)

	const [numOffers, setNumOffers] = useState(1)
	const [ismore, setIsMore] = useState(false)
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
	const [tags, setTags] = useState(productData && productData.resbody.tags.split(","))

	const [ show, setShow ] = useState(false);
	const [ active, setactive ] = useState(false);
	const [ pinchange, setpinchange ] = useState('');
	const [ deliveryData, setDeliveryData ] = useState({});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [isVisible, setIsVisible] = React.useState(false);
  const openDrawer = React.useCallback(() => setIsVisible(true), []);
  const closeDrawer = React.useCallback(() => setIsVisible(false), []);

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
				customer_id: 3449846562899
			};
			console.log(data);
			var config = {
				method: 'post',
				url: 'https://qa.api.sugarcosmetics.com/cart/qa/addItemToCartV2',
				headers: {
					Authorization: 'aCsf4laORaLOw3J1lBPVUjQn6EqfNcYg'
				},
				data: data
			};
			axios(config)
				.then((res) => {
					if(res.data.statusId == 1) {
						setNotification(true)
						setTimeout(()=>{
							setNotification(false)
						},3000)
		
					}
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

	const handleNotify = (varId, prodId) => {
        var data = JSON.stringify({"email":"ahsan@sugarcosmetics.com","handle":"matte-as-hell-crayon-lipstick-minis-set","product_id":4674486206547,"product_title":"Matte As Hell Crayon Lipstick Minis Set","customer_id":3449846562899});
        
        var config = {
          method: 'post',
          url: 'https://prod.api.sugarcosmetics.com/notify-product/prod/notifyProduct',
          headers: { 
            'authorization': 'aCsf4laORaLOw3J1lBPVUjQn6EqfNcYg', 
            'cache-control': 'no-cache', 
            'content-type': 'application/json', 
            'os_type': '1', 
            'postman-token': 'd63ef29a-7c1f-6fa6-4d40-ae7b0e1e6892', 
            'version': '55'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
            console.log("hellooooooo")
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
        
            }


	var arr=["bestseller", "new", "offer", "trending", "featured", "only few left","sold out", "viewer's choice", "selling like hot cakes"]
	var imgtags= tags.filter((tag)=>arr.includes(tag.trim().toLowerCase()))
	imgtags=imgtags.map((ele2)=>ele2.trim())
	const handleOffers = (test) =>{
		if(test == 'more'){
			setNumOffers(offerText.length-1)
			setIsMore(!ismore)
		}
		else{
			setNumOffers(1)
			setIsMore(!ismore)
	
		}
	}
	return (
		<div  style={{backgroundColor:"#E5E5E5"}}>
			<div style={{ overflowX: 'hidden' }}>
				<div className="fixed-top" style={{ backgroundColor: 'white', height:"365px" }}>
					<div className={`container-fluid mt-3 mb-3 ${styles.sticky}`}>
					<div className="mb-5">
                    <ProductNavbar title={productData && productData.resbody.title}/>
                    </div>
                    <div className="mt-5"></div>
						<div className="row mt-5">
						<div className="fixed-top" style={{marginTop:"70px"}}>
                                {
                                    imgtags.map((elem2)=>{
                                        return(
                                            <div className="img-fluid d-block">
                                                <div className="pb-1">
                                                    {/* <img src="/Bestseller.png"  /> */}
                                                    <img src={`/${elem2[0].toUpperCase()}${elem2.slice(1)}.png`}  style={{height:"19px"}} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
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

					{/* <div className="container-fluid">
						<div className="row">
							<div className="col text-center" style={{marginTop:"-15px"}}>
								<p className={styles.productTitle}>{productData && productData.resbody.title}</p>
							</div>
						</div>
						<div className="row" style={{marginTop:"-8px"}}>
							<div className="col-4" style={{marginTop:"10px"}}>
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
					</div> */}
				</div>
				<div style={{paddingTop:"384px"}}>
				<div className="container-fluid">
						<div className="row">
							<div className="col text-center" style={{marginTop:"-15px",paddingTop:"20px",paddingBottom:"70px",backgroundColor:"white"}}>
								<p className={styles.productTitle}>{productData && productData.resbody.title}</p>
							</div>
						</div>
						<div className="row" style={{marginTop:"-47px"}}>
							<div className="col-4" style={{marginTop:"10px"}}>
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
					<div className="container-fluid mt-2 mb-1 p-3 shadow" style={{backgroundColor:"white"}}>
						{products &&
							products.map((ele) => {
								return (
									<div className=''>
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

					<>
					<div className="container-fluid p-3 shadow" style={{backgroundColor:"white"}}>
						<div className="row">
							<div class="col">
								<h6 className={styles.headingMain}>AVAILABLE OFFERS</h6>
							</div>
						</div>
						<div>
{
	offerText &&
	offerText.map((ele,ind)=>{
		return(
			<>
			{
ind<=numOffers &&<>
<div>&#8211; {ele.productOfferText}

<strong style={{textDecoration:"underline",color:"black",cursor:"pointer"}} onClick={openDrawer}> Know More&gt;</strong>

</div>
</>
			}
			<Drawer
        duration={250}
        hideScrollbars={true}
        onClose={closeDrawer}
        isVisible={isVisible}
		style={{opacity:"0.5"}}
      >
		  <>
		  <div className="d-flex justify-content-between">
		  	<div>
			  <h4>Terms & Conditions</h4>
			</div>
			<div>
				<CancelIcon style={{height:"35px"}} onClick={closeDrawer}/>
			</div>
		  </div>
		  <div style={{paddingBottom:"270px"}}>
		  {ele.tnc}
		  </div>
		  </>
      </Drawer>
			</>
		)
	})
}
<div className="d-flex justify-content-end" >
	{
		ismore? <span onClick={()=>handleOffers('less')}>- less </span>: <span onClick={()=>handleOffers('more')}>+ more</span>
	}
</div>

						</div>
					</div>
 </>
					{/* <div className="container-fluid">
						<div className="col-1 col-sm-2 col-md-4 col-lg-4 " />
						<div
							className={`container-fluid col-10 col-sm-8 col-md-4 col-lg-4 fixed-bottom ${styles.cartDiv}`}
						>
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
							{
								productData && productData.resbody.variants[0].inventory_quantity==0?<div
								className={styles.cartButton2}
								onClick={() =>
									handleNotify(
										productData && productData.resbody.variants[0].id,
										productData && productData.resbody.id
									)}
							>
								NOTIFY ME
							</div>:<div
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
							}
						</div>
						<div className="col-1 col-sm-2 col-md-4 col-lg-4 " />
					</div> */}

<div className={`fixed-bottom d-flex`}>
						<div className="col-2"></div>
						
<div >
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
</div>
<div>
{
								productData && productData.resbody.variants[0].inventory_quantity==0?<div
								className={styles.cartButton2}
								onClick={() =>
									handleNotify(
										productData && productData.resbody.variants[0].id,
										productData && productData.resbody.id
									)}
							>
								NOTIFY ME
							</div>:
							<>
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
							
							
							
							
							
							</>
							}
						<div className={`${notification ? 'd-block' : 'd-none'}`}>
							<div className="d-flex justify-content-between" style={{backgroundColor:"black",color:"white",padding:"10px",paddingRight:"10px",paddingLeft:"40px",marginLeft:"-85px",marginTop:"10px"}}>
								<div className="flex-grow-1">
									Items added to Cart
								</div>
								<div>
									viewCart
								</div>
							</div>
							</div>
						</div>
					</div>

					<div className="container-fluid mt-1 mb-1 p-3 shadow" style={{backgroundColor:"white"}}>
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
				{
                            
                            productData && productData.resbody.html_body_v2.map((ele)=>{
                                return( 
						<TruncComponent data={ele} />

                                )
                            })
                            
                        }
				{productData &&
				productData.resbody.youtube_id && (
					<div className="p-2  mt-1 shadow" style={{backgroundColor:"white"}}>
					<div className="container-fluid">
							<h6 className="mt-2" style={{fontWeight:"bold"}}>ALSO WATCH</h6>
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
					</div>
				)}
				<div
						className="my-2 mx-1"
						style={{
							fontSize: '12px'
						}}
					>
						<div style={{ border: '',marginBottom: '10px' ,backgroundColor:"white"}} className="d-flex justify-content-between py-4 px-1 shadow">
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
				<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
					<small className="mt-2" style={{fontWeight:"bold", color:'#DB7093',marginBottom: '110px'}}>~Rule the world, one look at a time~</small>
				</div>
			</div>
		// </div>
	);
}
