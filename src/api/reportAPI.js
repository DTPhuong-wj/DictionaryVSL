import axios from "axios";
const BASE_URL = "http://localhost:8080/api/reports";

export const createReport = (data) => axios.post(BASE_URL, data);
export const getReportsByUser = (userID) => axios.get(`${BASE_URL}/user/${userID}`);
export const fetchReports = () => axios.get(BASE_URL);
export const resolveReport = (id, status = "resolved") => axios.put(`${BASE_URL}/${id}`, { status });
