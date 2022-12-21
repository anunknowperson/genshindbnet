import { withMongo } from '../../lib/mongowrapper'

async function fetchFoodsFromDb(locale) {
    const foods = await withMongo(async (db) => {
      const collection = db.collection('foods')
      return await collection.find({}, {projection: { "_id" : 0, "label" : 1, "name" : 1, "rarity" : 1, "images" : 1, "foodcategory" : 1}}).toArray()
    });
        
    var result = [];

    for (var i = 0; i < foods.length; i++){
        var ln = {
            label: foods[i]['label'],
            name: foods[i]['name'][locale],
            rarity: foods[i]['rarity'],
            images: foods[i]['images'],
            category : foods[i]['foodcategory'],
        };

        result.push(
            ln
        );
    }

    return result;
  
}

export default async function handler(req, res) {
    const {lang, page, recordsPerPage, columnAccessor, direction, search, rarities, categories} = req.query;

    var initList = await fetchFoodsFromDb(lang);

    let list = initList.sort((a, b) => {
        
        
        if (a['rarity'] === b['rarity']) {
            var cmp = String(b['category']).localeCompare(String(a['category']))
            
            if (cmp == 0){
                return String(a['name']).localeCompare(String(b['name']));
            }
            
            return cmp;
        }

        return  a['rarity'] - b['rarity'];

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

    
    const categoryFilter = JSON.parse(categories);

    list =  list.filter((item) =>
        categoryFilter.includes((item.category))
    );

    const total = list.length;

    const skip = (parseInt(page) - 1) * parseInt(recordsPerPage);

    list = list.slice(skip, skip + parseInt(recordsPerPage));

    

    res.status(200).json({'total': total, 'list': list})
}