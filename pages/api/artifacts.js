import { withMongo } from '../../lib/mongowrapper'

async function fetchArtifactsFromDb(locale) {
    const artifacts = await withMongo(async (db) => {
        const collection = db.collection('artifacts')
        return await collection.find({}, { projection: { "_id": 0, "name": 1, "rarities": 1, "twoPiecesBonus": 1, "fourPiecesBonus": 1, "label": 1, "flower": 1, "circlet": 1 } }).toArray()
    });

    var result = [];

    for (var i = 0; i < artifacts.length; i++) {
        var ln = {
            label: artifacts[i]['label'],
            name: artifacts[i]['name'][locale],
            rarities: artifacts[i]['rarities'],
            twoPiecesBonus: artifacts[i]['twoPiecesBonus'][locale],
            fourPiecesBonus: artifacts[i]['fourPiecesBonus'][locale],

        };

        if (ln['fourPiecesBonus'] === '') {
            ln['image'] = artifacts[i]['circlet']['image'];

        } else {
            ln['image'] = artifacts[i]['flower']['image'];
        }

        result.push(
            ln
        );
    }

    return result;

}

export default async function handler(req, res) {
    const { lang, page, recordsPerPage, columnAccessor, direction, search, rarities } = req.query;



    var initList = await fetchArtifactsFromDb(lang);


    let list = initList.sort((a, b) => {
        if (direction === 'desc') {
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

            if (Array.isArray(a[columnAccessor])) {

                return (a[columnAccessor][0] === b[columnAccessor][0]) ? 0 : a[columnAccessor][0] - b[columnAccessor][0];
            }



            return String(b[columnAccessor]).localeCompare(String(a[columnAccessor]));
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

        if (Array.isArray(a[columnAccessor])) {
            return (a[columnAccessor][0] === b[columnAccessor][0]) ? 0 : b[columnAccessor][0] - a[columnAccessor][0];
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

    list = list.filter((item) => {
        var finded = false;

        for (const rar of item.rarities) {
            if (rarityFilter.includes(rar.toString())) {

                finded = true;
            }
        }

        return finded;
    });




    const total = list.length;

    const skip = (parseInt(page) - 1) * parseInt(recordsPerPage);

    list = list.slice(skip, skip + parseInt(recordsPerPage));



    res.status(200).json({ 'total': total, 'list': list })
}