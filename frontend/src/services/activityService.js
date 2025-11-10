import api from './api';

const API_URL = '/activities/';

// Create a new activity
const createActivity = async (activityData) => {
  const response = await api.post(API_URL, activityData);
  return response.data;
};

// Get all activities for a lead
const getActivitiesForLead = async (leadId) => {
  const response = await api.get(`${API_URL}${leadId}`);
  return response.data;
};

const activityService = {
  createActivity,
  getActivitiesForLead,
};

export default activityService;