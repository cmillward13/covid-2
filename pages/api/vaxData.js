const fetch = require('node-fetch');

module.exports= async (req,res)=>{

    const url='https://data.ontario.ca/api/3/action/datastore_search?resource_id=775ca815-5028-4e9b-9dd4-6975ff1be021&limit=5000';
    
    const data = await (await fetch(url)).json()

    res.status(200).send(data.result.records)

}