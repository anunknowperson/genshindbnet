import { withMongo } from '../../lib/mongowrapper'

async function fetchCharactersFromDb(locale) {
    const characters = await withMongo(async (db) => {
        const collection = db.collection('characters')
        return await collection.find({}, { projection: { "_id": 0, "label": 1, "name": 1, "rarity": 1, "images": 1, "weapontype" : 1, "element" : 1  } }).toArray()
    });

    var result = [];

    for (var i = 0; i < characters.length; i++) {
        var ln = {
            label: characters[i]['label'],
            name: characters[i]['name'][locale],
            rarity: characters[i]['rarity'],
            images: characters[i]['images'],
            weapontype: characters[i]['weapontype']['en'],
            element: characters[i]['element']['en'],

        };

        result.push(
            ln
        );
    }

    return result;

}

export default async function handler(req, res) {
    const { lang, search } = req.query;

    var initList = await fetchCharactersFromDb(lang);

    let list = initList;
    
    if (search !== '') {
        const query = search.toLowerCase().trim();

        list = list.filter((item) =>
            Object.keys(list[0]).some((key) => String(item[key]).toLowerCase().includes(query))
        );
    }
    
    /*.sort((a, b) => {
        if (direction === 'desc') {

            if (columnAccessor === 'rarity') {
                return (a[columnAccessor] === b[columnAccessor]) ? 0 : a[columnAccessor] - b[columnAccessor]
            }

            if (a[columnAccessor] === '' || b[columnAccessor] === '') {
                if (a[columnAccessor] === b[columnAccessor]) {
                    return 0;
                }

                if (a[columnAccessor] === '') {
                    return -1;
                } else {
                    return 1;
                }

            }


            return String(b[columnAccessor]).localeCompare(String(a[columnAccessor]));
        }

        if (columnAccessor === 'rarity') {
            return (a[columnAccessor] === b[columnAccessor]) ? 0 : b[columnAccessor] - a[columnAccessor]
        }

        if (a[columnAccessor] === '' || b[columnAccessor] === '') {
            if (a[columnAccessor] === b[columnAccessor]) {
                return 0;
            }

            if (a[columnAccessor] === '') {
                return 1;
            } else {
                return -1;
            }

        }



        return String(a[columnAccessor]).localeCompare(String(b[columnAccessor]));
    });


    if (search !== '') {
        const query = search.toLowerCase().trim();

        list = list.filter((item) =>
            Object.keys(list[0]).some((key) => String(item[key]).toLowerCase().includes(query))
        );
    }

    const rarityFilter = JSON.parse(rarities);

    list = list.filter((item) =>
        rarityFilter.includes((item.rarity + ''))
    );

    const typeFilter = JSON.parse(types);

    list = list.filter((item) =>
        typeFilter.includes((item.type.toLowerCase()))
    );

    

    const skip = (parseInt(page) - 1) * parseInt(recordsPerPage);

    list = list.slice(skip, skip + parseInt(recordsPerPage));


*/
    const total = list.length;
    res.status(200).json({ 'total': total, 'list': list })
}