import useStyles from './ArtifactsListTable.styles';

import { Table } from '@mantine/core';
import { ScrollArea } from '@mantine/core';
import { useState, useEffect } from 'react';

import { useTranslation } from 'next-i18next';


import { TextFormat } from '../../components/TextFormat/TextFormat';

import Image from 'next/image';

import Link from 'next/link';

import { TextInput } from '@mantine/core';

import { UnstyledButton } from '@mantine/core';
import { Group } from '@mantine/core';
import { Center } from '@mantine/core';

import { Text } from '@mantine/core';

import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons';

function Th({ children, reversed, sorted, onSort, minW}) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
      <th style={{minWidth: minW}} className={classes.th}>
        <UnstyledButton onClick={onSort} className={classes.control}>
          <Group position="apart">
            <Text weight={500} size="sm">
              {children}
            </Text>
            <Center className={classes.icon}>
              <Icon size={14} stroke={1.5} />
            </Center>
          </Group>
        </UnstyledButton>
      </th>
    );
  }

const createData = (list) => {
    var resultLines = [];

    for (var i = 0; i < list.length; i++) {
        resultLines.push(
            {
                'label': list[i].label,
                'name': list[i].name,
                'rarities': list[i].rarities,
                'twoPiecesBonus': list[i].twoPiecesBonus,
                'fourPiecesBonus': list[i].fourPiecesBonus,
                'image': list[i].image,
            }
        );
    }

    return resultLines;
}

export function ArtifactsListTable({list}) {
    const {classes} = useStyles();

    var data = createData(list);

    const { t } = useTranslation(['common', 'artifacts']);

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(sortData(data, { sortBy: 'rarities', reversed: false, search: '' }));
    const [sortBy, setSortBy] = useState('rarities');
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    useEffect(() => {
        setSortedData(sortData(data, { sortBy: sortBy, reversed: reverseSortDirection, search: search}));
    }, [list])

    function filterData(data, search) {
        const query = search.toLowerCase().trim();
        return data.filter((item) =>
            Object.keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
        );
      }

    function sortData(
        data,
        payload
      ) {
        const { sortBy } = payload;
      
        if (!sortBy) {
          return filterData(data, payload.search);
        }
      
        return filterData(
          [...data].sort((a, b) => {
            if (payload.reversed) {
                
                if(a[sortBy] === '' || b[sortBy] === ''){
                    if (a[sortBy] === b[sortBy]){
                        return 0;
                    }

                    if(a[sortBy] === ''){
                        return -1;
                    } else {
                        return 1;
                    }
                    
                }

                if(Array.isArray(a[sortBy])) {
                    
                    return (a[sortBy][0] === b[sortBy][0]) ? 0 : a[sortBy][0] - b[sortBy][0]; 
                }

                

              return String(b[sortBy]).localeCompare(String(a[sortBy]));
            }
            
            if(a[sortBy] === '' || b[sortBy] === ''){
                if (a[sortBy] === b[sortBy]){
                    return 0;
                }

                if(a[sortBy] === ''){
                    return 1;
                } else {
                    return -1;
                }
                
            }

            if(Array.isArray(a[sortBy])) {
                return (a[sortBy][0] === b[sortBy][0]) ? 0 : b[sortBy][0] - a[sortBy][0]; 
            }

            

            return String(a[sortBy]).localeCompare(String(b[sortBy]));
          }),
          payload.search
        );
      }

    const setSorting = (field) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
      };

    const handleSearchChange = (event) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
      };

    var headers = 
    <tr>

            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
              minW='140px'
            >
              {t("a_name", { ns: 'artifacts' })}
            </Th>
            <Th
              sorted={sortBy === 'rarities'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('rarities')}
              minW='140px'
              
            >
             {t("a_rarities", { ns: 'artifacts' })}
            </Th>
            <Th
              sorted={sortBy === 'twoPiecesBonus'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('twoPiecesBonus')}
              minW='200px'
            >
              {t("a_twoPiecesBonus", { ns: 'artifacts' })}
            </Th>
            <Th
              sorted={sortBy === 'fourPiecesBonus'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('fourPiecesBonus')}
              minW='200px'
            >
              {t("a_fourPiecesBonus", { ns: 'artifacts' })}
            </Th>
        
                
    </tr>

    var lines = [];

    lines = sortedData.map((row) => (
        <tr key={row.name}>
          
          <td className={classes.td}>
            <Image
                        priority="true"
                        src={"/resources/" + row.image}
                        alt={ row.label + ""}
                         width={50}
                         height={50}
                        intrinsic
                    />

                    <br/>
                    <Link  href={'/artifacts/' + row.label} legacyBehavior>
                        <a  className={classes.link}>
                            {row.name}
                        </a>
                    </Link>
                    </td>
          <td className={classes.td}><ul className={classes.ul}>{
            
            row.rarities.sort().reverse().map((rarity) => (
                <li key={rarity} className={classes.li}>
                {[...Array(rarity)].map((e, i) =>
                <Image
                    key={i}
                    priority="true"
                    src={"/star.svg"}
                    alt={ ""}
                    width={15}
                    height={15}
                    intrinsic
                />
            
                )}
                </li>
                
            ))
            
            }</ul></td>
          <td className={classes.td}><TextFormat>{row.twoPiecesBonus}</TextFormat></td>
          <td className={classes.td}><TextFormat>{row.fourPiecesBonus}</TextFormat></td>
        </tr>
      ));

    return (
    <>
        <ScrollArea>
        
        <TextInput
            placeholder={t("table_search")}
            mb="md"
            icon={<IconSearch size={14} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
        />

        <Table sx={{ '& thead tr th': { textAlign: 'center' } }}>
            <thead className={classes.header}>
              {headers}
            </thead>

            <tbody>
                {lines}
            </tbody>
        </Table>
        
        </ScrollArea>
    </>
  );
}
