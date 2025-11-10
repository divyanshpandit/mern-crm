const { Lead, User, Activity } = require('../models');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
exports.createLead = asyncHandler(async (req, res) => {
  const { name, email, phone, status } = req.body;
  const owner_id = req.user.userId; // Assuming user ID is stored in req.user

  const lead = await Lead.create({
    name,
    email,
    phone,
    status,
    owner_id,
  });

  // Create an activity for lead creation
  await Activity.create({
    type: 'creation',
    content: `Lead created with status: ${status}`,
    lead_id: lead.id,
    user_id: owner_id,
  });

  req.io.emit('lead_created', lead);
  res.status(201).json(lead);
});

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
exports.getLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.findAll({ include: { model: User, as: 'owner', attributes: ['name', 'email'] } });
  res.status(200).json(leads);
});

// @desc    Get a single lead by ID
// @route   GET /api/leads/:id
// @access  Private
exports.getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findByPk(req.params.id, { include: { model: User, as: 'owner', attributes: ['name', 'email'] } });
  if (!lead) {
    res.status(404);
    throw new Error('Lead not found');
  }
  res.status(200).json(lead);
});

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Private
exports.updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByPk(req.params.id);
  if (!lead) {
    res.status(404);
    throw new Error('Lead not found');
  }

  const user = req.user;
  if (
    user.role !== 'Admin' &&
    user.role !== 'Manager' &&
    (user.role === 'Sales Executive' && lead.owner_id !== user.userId)
  ) {
    res.status(403);
    throw new Error('You do not have permission to edit this lead');
  }

  const oldStatus = lead.status;
  const [updated] = await Lead.update(req.body, { where: { id: req.params.id } });

  if (updated) {
    const updatedLead = await Lead.findByPk(req.params.id);
    const newStatus = updatedLead.status;

    if (oldStatus !== newStatus) {
      await Activity.create({
        type: 'status_change',
        content: `Status changed from ${oldStatus} to ${newStatus}`,
        lead_id: updatedLead.id,
        user_id: req.user.userId,
      });
    }

    req.io.emit('lead_updated', updatedLead);
    res.status(200).json(updatedLead);
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private
exports.deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByPk(req.params.id);
  if (!lead) {
    res.status(404);
    throw new Error('Lead not found');
  }

  const user = req.user;
  if (user.role !== 'Admin') {
    res.status(403);
    throw new Error('You do not have permission to delete this lead');
  }

  const deleted = await Lead.destroy({ where: { id: req.params.id } });
  if (deleted) {
    req.io.emit('lead_deleted', req.params.id);
    res.status(204).send(); // No Content
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});