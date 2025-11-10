import api from './api';

const API_URL = '/leads/';

// Create a new lead
const createLead = async (leadData) => {
  const response = await api.post(API_URL, leadData);
  return response.data;
};

// Get all leads
const getLeads = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

// Get a single lead
const getLead = async (leadId) => {
  const response = await api.get(`${API_URL}${leadId}`);
  return response.data;
};

// Update a lead
const updateLead = async (leadId, leadData) => {
  const response = await api.put(`${API_URL}${leadId}`, leadData);
  return response.data;
};

// Delete a lead
const deleteLead = async (leadId) => {
  const response = await api.delete(`${API_URL}${leadId}`);
  return response.data;
};

const leadService = {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
};

export default leadService;