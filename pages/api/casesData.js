const fetch = require('node-fetch');

module.exports= async (req,res)=>{

    const url='https://data.ontario.ca/api/3/action/datastore_search?resource_id=d1bfe1ad-6575-4352-8302-09ca81f7ddfc&limit=500000';
    
    const data = await (await fetch(url)).json()

    res.status(200).send(data.result.records)

}