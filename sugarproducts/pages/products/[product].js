import axios from 'axios';
import Product1 from '../product1';
import Product2 from '../product2';
import Product3 from '../product3';
import Product4 from '../product4';

export default function Handleproduct({ data }) {
	console.log(data);
	if (data && data.resbody.sugar_type == 0) {
		return <Product1 data={data} />;
	} else if (data && data.resbody.sugar_type == 1) {
		return <Product2 data={data} />;
	} else if (data && data.resbody.sugar_type == 2) {
		return <Product3 data={data} />;
	} else if (data && data.resbody.sugar_type == 3) {
		return <Product4 data={data} />;
	}
	return <h1>Page not found!</h1>;
}
Handleproduct.getInitialProps = async (req) => {
	var config = {
		method: 'get',
		url: `https://qa.api.sugarcosmetics.com/products/qa/getProductsv2?handle=${req.query.product}`,
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
		data: data
	};
};
