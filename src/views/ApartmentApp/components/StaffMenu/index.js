import React from 'react';
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core/';
import '../../apartmentApp.css';

const StaffMenu = () => {
  // This feature not yet implemented
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader
            title="Apartment Application Staff Interface"
            className="apartment-card-header"
          />
          <CardContent>
            <h1>
              Apartment application is currently available for students only. Support for staff will
              come soon!
            </h1>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StaffMenu;
