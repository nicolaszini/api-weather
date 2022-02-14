const { returnErrors } = require('../../../utils');
const { getLocationBase } = require('../../baseService');

module.exports = async function getLocation() {
  return await getLocationBase();
};