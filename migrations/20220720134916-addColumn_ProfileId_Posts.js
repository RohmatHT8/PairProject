'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Posts', 'ProfileId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Profiles',
        key: 'id'
      }, onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Posts', 'ProfileId')
  }
};
