import { withMongo } from '../../lib/mongowrapper'

async function fetchMaterialsFromDb(locale) {
    const materials = await withMongo(async (db) => {
      const collection = db.collection('materials')
      return await collection.find({}, {projection: { "_id" : 0, "label" : 1, "name" : 1, "rarity" : 1, "sortorder" : 1, "images" : 1, "materialtype" : 1}}).toArray()
    });
        
    var result = [];

    for (var i = 0; i < materials.length; i++){
        var ln = {
            label: materials[i]['label'],
            name: materials[i]['name'][locale],
            rarity: materials[i]['rarity'],
            images: materials[i]['images'],
            sortorder: materials[i]['sortorder'],
            materialtype: materials[i]['materialtype'][locale],
        };

        result.push(
            ln
        );
    }

    return result;
  
}

export default async function handler(req, res) {
    const {lang, page, recordsPerPage, columnAccessor, direction, search, rarities, types} = req.query;

    var initList = await fetchMaterialsFromDb(lang);

    let list = initList.sort((a, b) => {
        
        return (a['sortorder'] == b['sortorder']) ? 0 : b['sortorder'] - a['sortorder']

      });

    
    if (search !== ''){
        const query = search.toLowerCase().trim();

        list =  list.filter((item) =>
            Object.keys(list[0]).some((key) => String(item[key]).toLowerCase().includes(query))
        );
    }

    const rarityFilter = JSON.parse(rarities);

    list =  list.filter((item) => {
        if (isNaN(item.rarity)){
            return rarityFilter.includes('1')
        }

        return rarityFilter.includes((item.rarity + ''))
    }
        
    );

    const typeFilter = JSON.parse(types);

    list =  list.filter((item) =>
        typeFilter.includes((item.materialtype))
    );

    const total = list.length;

    const skip = (parseInt(page) - 1) * parseInt(recordsPerPage);

    list = list.slice(skip, skip + parseInt(recordsPerPage));

    

    res.status(200).json({'total': total, 'list': list})
}