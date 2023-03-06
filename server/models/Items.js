module.exports=(sequelize, DataTypes)=>{
    const Items=sequelize.define("Items", {
       item_name:{
        type:DataTypes.STRING,
        allowNull:false
       },
       item_category:{
        type:DataTypes.STRING,
        allowNull:false,
       },
       min_qty:{
        type:DataTypes.INTEGER,
        allowNull:false
       },
       qty:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
       },
       user:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"ADMIN"
       },
       flag:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
       },
       
    });
    Items.associate=(models)=>{
        Items.hasMany(models.Receive, {
           onDelete:'cascade'
        }),
        Items.belongsTo(models.Users, {
            onDelete:'cascade'
         })
       }
    return Items
}