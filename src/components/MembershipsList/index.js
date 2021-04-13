import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Grid, List, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import activity from '../../services/activity';
import membershipService from '../../services/membership';
import userService from '../../services/user';
import GordonSnackbar from '../Snackbar';
import GordonLoader from '../Loader';
import MembershipInfoCard from './components/MembershipInfoCard';
import './index.css';

/**
 * A List of memberships for display on the Profile and MyProfile views.
 * @param {string} user Either the user's ID number for MyProfile or the username for Profile
 * @param {boolean} myProf Whether this is shown in MyProfile or not
 * @returns {JSX} A list of the user's memberships
 */
const MembershipsList = ({ user, myProf }) => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });

  useEffect(() => {
    async function loadMemberships() {
      setLoading(true);
      if (myProf) {
        const myMemberships = await membershipService.groupByActivityCode(user);
        console.log(myMemberships);
        await Promise.all(
          myMemberships.map(async (membership) => {
            const involvement = await activity.get(membership.ActivityCode);
            membership.IsInvolvementPrivate = involvement.Privacy;
          }),
        );
        setMemberships(myMemberships);
      } else {
        const publicMemberships = await userService.getPublicMemberships(user);
        setMemberships(publicMemberships);
      }
      setLoading(false);
    }
    loadMemberships();
  }, [myProf, user]);

  const MembershipsList = () => {
    if (memberships.length === 0) {
      return (
        <Link to={`/involvements`}>
          <Typography variant="body2" className="noMemberships">
            No Involvements to display. Click here to see Involvements around campus!
          </Typography>
        </Link>
      );
    } else {
      return memberships.map((membership) => (
        <MembershipInfoCard
          myProf={myProf}
          membership={membership}
          key={membership.MembershipID}
          onTogglePrivacy={toggleMembershipPrivacy}
        />
      ));
    }
  };

  const toggleMembershipPrivacy = async (membership) => {
    try {
      await membershipService.toggleMembershipPrivacy(membership);
      createSnackbar(membership.Privacy ? 'Membership Shown' : 'Membership Hidden', 'success');
      setMemberships(
        memberships.map((m) => {
          if (m.MembershipID === membership.MembershipID) {
            m.Privacy = !m.Privacy;
          }
          return m;
        }),
      );
    } catch {
      createSnackbar('Privacy Change Failed', 'error');
    }
  };

  const createSnackbar = (message, severity) => {
    setSnackbar({ message, severity, open: true });
  };

  if (loading) {
    return <GordonLoader />;
  }

  return (
    <>
      <Grid item xs={12} className="memberships">
        <Grid container className="memberships-header">
          <CardHeader title="Involvements" />
        </Grid>
        <Card className="memberships-card">
          <CardContent className="memberships-card-content">
            {myProf && (
              <Grid container justify="center">
                <Link className="gc360-link" to="/transcript">
                  <Button variant="contained" className="memberships-card-content-button">
                    Experience Transcript
                  </Button>
                </Link>
              </Grid>
            )}
            <List>
              <MembershipsList />
            </List>
          </CardContent>
        </Card>
      </Grid>
      {myProf && (
        <GordonSnackbar
          open={snackbar.open}
          text={snackbar.message}
          severity={snackbar.severity}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        />
      )}
    </>
  );
};

export default MembershipsList;
