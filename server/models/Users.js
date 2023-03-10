module.exports=(sequelize, DataTypes)=>{
  const { STRING, INTEGER, DATE,ENUM } = DataTypes;
    const Users=sequelize.define("Users", {
       username:{
        type:STRING(20),
        allowNull:false
       },
       email:{
        type:STRING(100),
        allowNull:false,
        unique:[true, "email already exists in database!"],
        trim:true,
        lowercase:true,
        required:[true, 'Email Not Provided']
       },
       password:{
        type:STRING,
        allowNull:false,
       },
       role:{
        type:ENUM('Admin', 'Normal', 'guest'),
        allowNull:false,
        defaultValue:'Normal'
       },
       flag:{
        type:INTEGER(5),
        allowNull:false,
        defaultValue:1
       },
       deletedAt: {
         type:DATE,
         allowNull: true,
         defaultValue: null
       }
    },
    {
      paranoid: true,
      indexes: [
        {
          name: 'Users_deletedAt_index',
          fields: ['deletedAt']
        }
      ]
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