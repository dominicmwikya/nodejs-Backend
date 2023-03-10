module.exports=(sequelize, DataTypes)=>{
    const { INTEGER, DATE } = DataTypes;
const Issued=sequelize.define("issued",{
    quantity:{
        type:INTEGER,
        allowNull:false,
    },
    issued_to:{
        type:INTEGER,
        allowNull:false,
    },
    requested_by:{
        type:INTEGER,
        allowNull:false,
    },
    date_issued:{
        type:DATE,
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