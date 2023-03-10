module.exports = (sequelize, DataTypes) => {
  const { STRING, INTEGER, DATE } = DataTypes;
  const Items = sequelize.define("Items", {
    item_name: {
      type: STRING,
      allowNull: false
    },
    item_category: {
      type: STRING,
      allowNull: false
    },
    min_qty: {
      type: INTEGER,
      allowNull: false
    },
    qty: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    user: {
      type: STRING,
      allowNull: false,
      defaultValue: 'ADMIN'
    },
    flag: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    deletedAt: {
      type: DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    paranoid: true,
    indexes: [
      {
        name: 'Items_deletedAt_index',
        fields: ['deletedAt']
      }
    ]
  });

  Items.associate = (models) => {
    Items.hasMany(models.Receive, {
      onDelete: 'cascade'
    }),
    Items.belongsTo(models.Users, {
      onDelete: 'cascade'
    })
  }

  return Items;
};
