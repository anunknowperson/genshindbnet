import { withMongo } from '../../lib/mongowrapper'

async function fetchWeaponsFromDb(locale) {
    const weapons = await withMongo(async (db) => {
        const collection = db.collection('weapons')
        return await collection.find({}, { projection: { "_id": 0, "label": 1, "name": 1, "weapontype": 1, "rarity": 1, "effect": 1, "images": 1, "r1": 1, "r5": 1, "effectname" : 1, "baseatk" : 1, "substat" : 1, "subvalue" : 1 } }).toArray()
    });

    var result = [];

    for (var i = 0; i < weapons.length; i++) {
        var ln = {
            label: weapons[i]['label'],
            name: weapons[i]['name'][locale],
            rarity: weapons[i]['rarity'],
            effect: weapons[i]['effect'][locale],
            r1: weapons[i]['r1'][locale],
            r5: weapons[i]['r5'][locale],
            images: weapons[i]['images'],

            effectname: weapons[i]['effectname'][locale],
            baseatk: weapons[i]['baseatk'][weapons[i]['baseatk'].length - 1],
            substat: weapons[i]['substat'][locale],
            subvalue: weapons[i]['subvalue'][weapons[i]['subvalue'].length - 1],

            type: weapons[i]['weapontype']['en'],
        };

        result.push(
            ln
        );
    }

    return result;

}

export default async function handler(req, res) {
    const { lang, page, recordsPerPage, columnAccessor, direction, search, rarities, types } = req.query;

    var initList = await fetchWeaponsFromDb(lang);

    let list = initList.sort((a, b) => {
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

    const total = list.length;

    const skip = (parseInt(page) - 1) * parseInt(recordsPerPage);

    list = list.slice(skip, skip + parseInt(recordsPerPage));



    res.status(200).json({ 'total': total, 'list': list })
}