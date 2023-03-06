module.exports=(sequelize, DataTypes)=>{
    const Receive=sequelize.define("Receive", {
        date_received:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:sequelize.fn('now')
         },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull:false,
          },
        user:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:"admin"
        }
    });
    Receive.associate=(models)=>{
        Receive.belongsTo(models.Items, {
           onDelete:'cascade'
        })
        Receive.belongsTo(models.Users, {
            onDelete:'cascade'
         })
        //  Receive.hasMany(models.Issued, {
        //     onDelete:'cascade'
        //  })
        //  Receive.hasMany(models.Issued, {
        //     onDelete:'cascade'
        //  })
       }
    return Receive;
}