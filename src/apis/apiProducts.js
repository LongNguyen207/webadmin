import axios from "axios";

const HOST = "http://localhost:3000/";
const BASE_URL = "products/";

const handleAPIsProducts = async function (method, body, action) {
	let uri = `${HOST}${BASE_URL}${action}`;
	return axios({
		method: method,
		url: uri,
		data: body
	})
}

export default handleAPIsProducts;