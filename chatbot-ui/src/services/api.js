import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001/api/prompt';

export const getResponse = async (prompt) => {
    try {
        const response = await axios.post(API_URL, { prompt });
        return response.data;
    } catch (error) {
        console.error("Error fetching response:", error);
        throw error;
    }
};
