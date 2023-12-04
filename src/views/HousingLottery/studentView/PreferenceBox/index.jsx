import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  Typography,
  FormControl,
  FormControlLabel,
  Input,
  Button,
  RadioGroup,
  Card,
  CardContent,
  CardHeader,
  Radio,
  Grid,
} from '@mui/material';
import housingService from 'services/housing';
import housing from 'services/housing';
import styles from '../../HousingLottery.module.css';

const Preference = ({ setPreferenceResult }) => {
  const [preferences, setPreferences] = useState([]); // Store preferences as an array
  const [morningOrNight, setMorningOrNight] = useState(''); // Store the selected morning or night
  const [loudOrQuiet, setLoudOrQuiet] = useState(''); // Store the selected loud or quiet

  useEffect(() => {
    const storedPreferences = localStorage.getItem('userPreferences');
    if (storedPreferences) {
      const { morningOrNight, loudOrQuiet } = JSON.parse(storedPreferences);
      setMorningOrNight(morningOrNight || '');
      setLoudOrQuiet(loudOrQuiet || '');
    }
  }, []);

  useEffect(() => {
    // Save preferences to local storage
    const storedPreferences = JSON.stringify({ morningOrNight, loudOrQuiet });
    localStorage.setItem('userPreferences', storedPreferences);
  }, [morningOrNight, loudOrQuiet]);

  const handleMorningOrNightChange = (event) => {
    setMorningOrNight(event.target.value);
    updatePreferences('morningOrNight', event.target.value);
  };

  const handleLoudOrQuietChange = (event) => {
    setLoudOrQuiet(event.target.value);
    updatePreferences('loudOrQuiet', event.target.value);
  };

  const updatePreferences = (type, value) => {
    if (preferences.includes(type)) {
      // If the preference type is already in the list, remove it
      setPreferences((prevPreferences) => prevPreferences.filter((pref) => pref !== type));
      setPreferenceResult((prevPreferences) => prevPreferences.filter((pref) => pref !== type));
    } else {
      // If the preference type is not in the list, add it
      setPreferences((prevPreferences) => [...prevPreferences, type]);
      setPreferenceResult((prevPreferences) => [...prevPreferences, type]);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={6} style={{ maxWidth: '500px' }}>
        <Card>
          <CardHeader title="Preferences" className={styles.apartment_card_header} />
          <CardContent>
            <div>
              <label>Are you a night owl or a morning bird?</label>
              <RadioGroup
                aria-label="morning-or-night"
                name="morning-or-night"
                value={morningOrNight}
                onChange={handleMorningOrNightChange}
              >
                <FormControlLabel value="night-owl" control={<Radio />} label="Night Owl" />
                <FormControlLabel value="morning-bird" control={<Radio />} label="Morning Bird" />
              </RadioGroup>
            </div>

            <div>
              <label>Do you consider yourself quiet or loud in the dorm?</label>
              <RadioGroup
                aria-label="loud-or-quiet"
                name="loud-or-quiet"
                value={loudOrQuiet}
                onChange={handleLoudOrQuietChange}
              >
                <FormControlLabel value="quiet" control={<Radio />} label="Quiet" />
                <FormControlLabel value="loud" control={<Radio />} label="Loud" />
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Preference;
