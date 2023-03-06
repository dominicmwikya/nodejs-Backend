module.exports=(sequelize, DataTypes)=>{
    const Users=sequelize.define("Users", {
       username:{
        type:DataTypes.STRING(20),
        allowNull:false
       },
       email:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:[true, "email already exists in database!"],
        trim:true,
        lowercase:true,
        required:[true, 'Email Not Provided']
       },
       password:{
        type:DataTypes.STRING,
        allowNull:false,
       },
       role:{
        type:DataTypes.ENUM('Admin', 'Normal', 'guest'),
        allowNull:false,
        defaultValue:'Normal'
       },
       flag:{
        type:DataTypes.INTEGER(5),
        allowNull:false,
        defaultValue:1
       }, 
    })
    Users.associate=(models)=>{
        Users.hasMany(models.Items, {
           onDelete:'cascade'
        })
        Users.hasMany(models.Receive, {
            onDelete:'cascade'
         })
       }
    return Users;
}