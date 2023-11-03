import { FormControl, Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import housingService from 'services/housing';
import styles from '../../../HousingLottery.module.css';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

/**
 *
 * @param {number} rank
 * @returns
 */
const HallSlot = ({ rank, hallList, func }) => {
  console.log('rank ' + rank);
  const [hall, setHall] = useState('');
  //const [hallList, setHallList] = useState([]);

  // useEffect(() => {
  //   housingService.getTraditionalHalls().then(setHallList);
  // }, []);

  // const handleClick = async () => {
  //   await housingService.addHall(rank, hall);
  // };

  const selectPreferredHall = (event) => {
    setHall(event.target.value);
    func(rank, event.target.value);
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={3}>
        {rank}
      </Grid>

      <Grid item xs={3}>
        <SearchField
          name="building"
          value={hall}
          updateValue={(event) => selectPreferredHall(event)}
          options={hallList}
          select
          size={200}
        />
      </Grid>
      {/* <Button variant="contained" className={styles.submit_button} onClick={handleClick}>
        Submit
      </Button> */}
    </Grid>
  );
};

export default HallSlot;
