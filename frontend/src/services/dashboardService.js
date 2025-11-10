import api from './api';

const API_URL = '/dashboard/';

// Get dashboard data
const getDashboardData = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

const dashboardService = {
  getDashboardData,
};

export default dashboardService;