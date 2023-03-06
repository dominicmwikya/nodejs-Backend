module.exports=(sequelize, DataTypes)=>{
const Issued=sequelize.define("issued",{
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    issued_to:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    requested_by:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    date_issued:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:sequelize.fn('now')
    }
})
Issued.associate=(models)=>{
    Issued.belongsTo(models.Users,{
        onDelete:'cascade'
     })
     Issued.belongsTo(models.Items, {
        onDelete:'cascade'
     })
     Issued.belongsTo(models.Receive, {
        onDelete:'cascade'
     })
}
return Issued;

}