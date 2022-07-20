'use strict';
const fs = require('fs');

module.exports = {
   up (queryInterface, Sequelize) {
    
    const data= JSON.parse(fs.readFileSync('./data/tags.json','utf8'));
    data.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    return queryInterface.bulkInsert('Tags',data)
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Tags')
  }
};
