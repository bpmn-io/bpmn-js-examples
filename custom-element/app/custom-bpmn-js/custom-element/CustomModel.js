'use strict';

function CustomModel() {}

module.exports = CustomModel;

CustomModel.prototype.getBusinessObject = function(type) {
  return this.businessInfo[type] || {};
};

CustomModel.prototype.setBusinessModel = function(businessInfo) {
  this.businessInfo = businessInfo;
};
