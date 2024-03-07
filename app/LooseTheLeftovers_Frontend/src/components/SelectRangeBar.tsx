import React, { memo, useState, useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { SelectRangeBarProps } from '../common/Types';
import { styles } from '../styles/rangeBarStyles';

import Icon from '../components/Icon';

const SelectRangeBar: React.FC<SelectRangeBarProps> = ({ setRange }) => {
  const [items, setItems] = useState([
    { key: '10 km', value: 10 },
    { key: '20 km', value: 20 },
    { key: '30 km', value: 30 },
  ]);

  useEffect(() => {
    console.log('rendered');
  }, []);

  const handleRangeChange = (newRange: string) => {
    setRange(newRange);
  };

  return (
    <SelectList
      data={items}
      save={'value'}
      setSelected={setRange}
      search={false}
      placeholder="Select Range"
      boxStyles={styles.boxStyles}
      inputStyles={styles.inputStyles}
      dropdownStyles={styles.dropdownStyles}
      dropdownTextStyles={styles.dropdownTextStyles}
      arrowicon={<Icon source={require('../assets/drop_3.png')} size={13} />}
    />
  );
};

export default memo(SelectRangeBar);

/*const [items, setItems] = useState([
    { key: '10 km', value: '10', testID: 'dropdown-item-10' },
    { key: '20 km', value: '20', testID: 'dropdown-item-20' },
    { key: '30 km', value: '30', testID: 'dropdown-item-30' },
  ]);*/
