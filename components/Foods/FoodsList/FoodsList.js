import useStyles from './FoodsList.styles';


import { useTranslation } from 'next-i18next';

import { Box, useMantineTheme } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { DataTable} from 'mantine-datatable';
import { useState, useEffect } from 'react';

import { TextFormat } from '../../TextFormat/TextFormat';

import { FoodsListElement } from '../FoodsListElement/FoodsListElement';

import Link from 'next/link';
import Image from "next/image"
import { useRouter } from 'next/router';

import { Pagination, Group, Loader } from '@mantine/core';

export function FoodsList({categoryFilter, searchFilter, rarityFilter}) {
  const recordsPerPage = 100;

  const {classes} = useStyles();

  const { t } = useTranslation(['common', 'weapons']);

  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState({ columnAccessor: 'name', direction: 'asc' });

  const { locale } = useRouter();

  const handleSortStatusChange = (status) => {
    setPage(1);
    setSortStatus(status);
  };

  useEffect(() => {
    setPage(1);
  }, [searchFilter, rarityFilter, categoryFilter]);

  const fetchFoods = async (page, columnAccessor, direction, search, raritiesFilter, categoryFilter) => {
    const res = await fetch(`/api/foods?lang=${locale}&page=${page}&recordsPerPage=${recordsPerPage}&columnAccessor=${columnAccessor}&direction=${direction}&search=${search}&rarities=${JSON.stringify(raritiesFilter)}&categories=${JSON.stringify(categoryFilter)}`);

    const result = await res.json();

    return {total: result.total, foods: result.list};
  };

  const { data, isFetching } = useQuery(
    ['foods', page, sortStatus, searchFilter, rarityFilter, categoryFilter, locale],
    async () => fetchFoods(page, sortStatus.columnAccessor, sortStatus.direction, searchFilter, rarityFilter, categoryFilter),
    { refetchOnWindowFocus: false }
  );

  const {
    breakpoints: { xs: xsBreakpoint },
  } = useMantineTheme();

  
  const changePage = (id) => {
    setPage(id);

    window.scrollTo(0, 0) 

    
  }

    var foodsTableElements;
    
    if (!isFetching){
        foodsTableElements = <>
            <div className={classes.grid}>
                {data.foods.map ((el, val) => <FoodsListElement key={val} label={el.label} name = {el.name} rarity={(el.rarity == null) ? 1 : el.rarity} image={el.images.icon} category={el.category}/>)}
            </div>

            <Group position='apart' style={{marginTop: '20px'}}>
                <div>
                    {`${(page-1) * recordsPerPage + 1} - ${Math.min((page) * recordsPerPage, data.total)} / ${data.total}`}
                </div>
                <Pagination page={page} onChange={setPage} total={Math.ceil(data.total / recordsPerPage)}  withEdges />
            </Group>
        </>
    }

  return (
    
    
    
    <Box style={{minHeight: '750px'}}>
        {
            
            (isFetching) ? <div className={classes.loaderWrapper}><Loader/></div> : foodsTableElements

        }
        
    </Box>
  );
}
