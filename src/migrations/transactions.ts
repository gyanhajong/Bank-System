import * as Sequelize from 'sequelize';

const tableName = 'Transactions';

export async function up(i: any) {
  const queryInterface = i.getQueryInterface() as Sequelize.QueryInterface;
  queryInterface.createTable(tableName, {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    AccId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Accounts',
          key: 'id',
        },
    },
    Amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};

export async function down(i: any) {
  const queryInterface = i.getQueryInterface() as Sequelize.QueryInterface;
  queryInterface.dropTable(tableName);
}