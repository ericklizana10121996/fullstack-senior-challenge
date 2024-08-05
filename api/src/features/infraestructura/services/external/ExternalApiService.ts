import { ExternalApiConstants } from "../../constants/ExternalApiConstants";
import axios from "axios";
// const axios = require('axios');

export class ExternalApiService {
    private apiUrl:string;

    constructor() {
        this.apiUrl = ExternalApiConstants.API_EXTERNAL;
    }

    async fetchExchangeRate() {
        const response = await axios.get(`${this.apiUrl}`, {});
        return response.data;
    }
}
