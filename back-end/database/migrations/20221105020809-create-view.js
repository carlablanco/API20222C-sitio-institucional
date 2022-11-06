

const view_name = 'class_average_rating';
const original_query = 'SELECT c.id, avg(cc.stars) as avgStars FROM sitioinstitucional.classes c JOIN sitioinstitucional.class_comments cc ON c.id = cc.id_class GROUP BY c.id';
const new_query = 'SELECT c.id, avg(cc.stars) as avgStars FROM sitioinstitucional.classes c JOIN sitioinstitucional.class_comments cc ON c.id = cc.id_class GROUP BY c.id';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${view_name} AS ${new_query}`);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${view_name} AS ${original_query}`);
  }
}