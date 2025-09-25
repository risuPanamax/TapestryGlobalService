const { Op } = require("sequelize");

// Utility function to get visibility and status conditions
export const getVisibilityStatusConditions = () => [
  { Visibility: 1 },
  { Status: { [Op.ne]: 2 } }
];