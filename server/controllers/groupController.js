const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
  try {
    const { name, monthlyAmount, totalMonths } = req.body;
    const newGroup = await Group.create({
      name,
      monthlyAmount,
      totalMonths,
      creator: req.user.id,
      members: [req.user.id],
    });
    res.status(201).json({ success: true, group: newGroup });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.joinGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    if (group.members.includes(req.user.id))
      return res.status(400).json({ message: 'Already a member' });

    group.members.push(req.user.id);
    await group.save();

    res.status(200).json({ message: 'Joined group', group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllGroups = async (req, res) => {
  const groups = await Group.find().populate('creator', 'name email');
  res.status(200).json(groups);
};
