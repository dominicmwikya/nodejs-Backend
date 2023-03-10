module.exports=(sequelize, DataTypes)=>{
    const { STRING, INTEGER, DATE } = DataTypes;
    const Receive=sequelize.define("Receive", {
        date_received:{
            type:DATE,
            allowNull:false,
            defaultValue:sequelize.fn('now')
         },
        quantity:{
            type:INTEGER,
            allowNull:false,
          },
        user:{
            type:STRING,
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