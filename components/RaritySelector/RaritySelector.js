import { forwardRef, useState } from 'react';

import { Group, Avatar, Text, Select } from '@mantine/core';


import { useTranslation } from 'next-i18next';


import Image from 'next/image';

const SelectItem = forwardRef(
  ({ value, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group style={{justifyContent: "flex-end"}} noWrap>
        
        <div>
          {[...Array(Number(value))].map(val =>
            <Image width="15px" height="15px" src={"/star.svg"}/>
          )}
        </div>
      </Group>
    </div>
  )
);



export default function RaritySelector({rars, callback}) {

  
  const { t } = useTranslation(['common', 'artifacts']);

  const [selected, setSelected] = useState(String(rars[rars.length - 1]));

  const onRaritySelected = (rar) => {
    setSelected(rar);
    callback(rar);
  }

  const getData = (rarities) => {
    var arr = [];
  
    for (const rarity of rarities) {
      
      arr.push({value: String(rarity), label: t(`a_${rarity}star`, { ns: 'artifacts' })});
  
    }
  
    return arr;
  }

  return (
    <Select
      label={t("a_rarity", { ns: 'artifacts' })}
      itemComponent={SelectItem}
      data={getData(rars)}
      
      value={selected}
      onChange={onRaritySelected}

      maxDropdownHeight={400}
      size="xs"

      transition="pop-top-left"
      transitionDuration={80}
      transitionTimingFunction="ease"
    />
  );
}