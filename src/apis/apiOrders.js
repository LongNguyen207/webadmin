import axios from "axios";

const HOST = "http://localhost:3000/";
const BASE_URL = "orders/";

const handleAPIsOrders = async function (method, body, action) {
	let uri = `${HOST}${BASE_URL}${action}`;
	return axios({
		method: method,
		url: uri,
		data: body
	})
}

export default handleAPIsOrders;