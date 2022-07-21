'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Posts', 'TagId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Tags',
        key: 'id'
      }, onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Posts', 'TagId')
  }
};
