const  Items =require('../models/Items')

function Create(data){
    Items.create(data).then((response)=>{
     res.status(200).send(response);
}).catch((error)=>{
    res.status(500).send({error:error.message})
})
}
function Update(id, item){
    Items.update({item_name:item.name},{where:{id:id}}).then(()=>{}).catch((e)=>{

    })
}


module.exports={Update, Create}