import { Grid, Typography, Card, CardHeader, CardContent } from '@material-ui/core/';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { MatchListing } from 'views/RecIM/components/Listing';
import styles from './Activity.module.css';

// CARD - schedule
let scheduleCard = (
  <Card>
    <CardHeader title="Schedule" className={styles.cardHeader} />
    <CardContent>
      {/* if there are games scheduled, map them here */}
      <div className={styles.listing}>
        <MatchListing activityID={123456} matchID={321} />
      </div>
      <div className={styles.listing}>
        <MatchListing activityID={123456} matchID={654} />
      </div>
      {/* else "no schedule yet set" */}
      <Typography variant="body1" paragraph>
        Games have not yet been scheduled.
      </Typography>
    </CardContent>
  </Card>
);

// CARD - teams
let teamsCard = (
  <Card>
    <CardHeader title="Teams" className={styles.cardHeader} />
    <CardContent>
      {/* if I am apart of any active teams, map them here */}
      <div className={styles.listing}>{/* <TeamListing activityID={123456} teamID={789} /> */}</div>
      <div className={styles.listing}>{/* <TeamListing activityID={12345} teamID={987} /> */}</div>
      {/* else "no teams" */}
      <Typography variant="body1" paragraph>
        Be the first to create a team!
      </Typography>
    </CardContent>
  </Card>
);

const Activity = () => {
  const { activityID } = useParams();
  const { profile, loading } = useUser();
  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner
  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    return (
      <>
        <Grid container alignItems="center" className={styles.activityHeader}>
          <Grid item>
            <img src={''} alt="Activity Icon" width="85em"></img>
          </Grid>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item>
            <Typography variant="h5">Activity Name</Typography>
            <Typography variant="body" className={styles.grayText}>
              <i>Description of activity</i>
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            {scheduleCard}
          </Grid>
          <Grid item xs={12} md={6}>
            {teamsCard}
          </Grid>
        </Grid>
        <Typography>Activity ID: {activityID} (testing purposes only)</Typography>
      </>
    );
  }
};

export default Activity;
