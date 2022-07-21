'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Posts', 'CategoryId', {
      type:Sequelize.INTEGER,
      references:{
        model:'Categories',
        key:'id'
      },onDelete:'cascade',
        onUpdate:'cascade'
    })
  },

   down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Posts','CategoryId')
  }
};
