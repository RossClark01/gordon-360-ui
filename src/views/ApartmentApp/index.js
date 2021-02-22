//Main apartment application page
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Button } from '@material-ui/core/';
import GordonLoader from '../../components/Loader';
import StudentApplication from './components/StudentApplication';
import StaffMenu from './components/StaffMenu';
import user from '../../services/user';
import housing from '../../services/housing';
import storage from '../../services/storage';
import './apartmentApp.scss';

/**
 * @typedef { import('../../services/user').StudentProfileInfo } StudentProfileInfo
 */

const ApartApp = ({ authentication }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authentication);
  const [networkStatus, setNetworkStatus] = useState('online');

  /**
   * @type {[StudentProfileInfo, Function]} UserProfile
   */
  const [userProfile, setUserProfile] = useState({});
  const [isUserStudent, setIsUserStudent] = useState(false);
  const [canUseStaff, setCanUseStaff] = useState(false);

  useEffect(() => {
    // Retrieve network status from local storage or default to online
    try {
      setNetworkStatus(storage.get('network-status'));
    } catch (error) {
      setNetworkStatus('online');
    }

    /* Used to re-render the page when the network connection changes.
     * The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      setNetworkStatus((prevStatus) => {
        if (
          event.origin === window.location.origin &&
          (event.data === 'online' || event.data === 'offline')
        ) {
          return event.data;
        }
        return prevStatus;
      });
    });

    return () => window.removeEventListener('message', () => {});
  }, []);

  useEffect(() => {
    if (authentication) {
      loadPage();
      setIsAuthenticated(true);
    } else {
      // Clear out component's person-specific state when authentication becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      setCanUseStaff(false);
      setIsUserStudent(false);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [authentication]);

  const loadPage = async () => {
    setLoading(true);
    const [profileInfo, isHousingStaff] = await Promise.all([
      user.getProfileInfo(),
      housing.checkHousingStaff(),
    ]);
    setUserProfile(profileInfo);
    profileInfo.PersonType.includes('stu') ? setIsUserStudent(true) : setIsUserStudent(false);
    isHousingStaff ? setCanUseStaff(true) : setCanUseStaff(false);
    setLoading(false);
  };

  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) {
    // The user is not logged in
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent
              style={{
                margin: 'auto',
                textAlign: 'center',
              }}
            >
              <h1>You are not logged in.</h1>
              <br />
              <h4>You must be logged in to use the Apartment Applications page.</h4>
              <br />
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  window.location.pathname = '';
                }}
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  } else if (networkStatus === 'online') {
    if (isUserStudent) {
      return (
        <div className="student-apartment-application">
          <StudentApplication userProfile={userProfile} authentication={authentication} />
        </div>
      );
    } else if (canUseStaff) {
      return (
        <div className="staff-apartment-application">
          <StaffMenu />
        </div>
      );
    } else {
      return (
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent
                style={{
                  margin: 'auto',
                  textAlign: 'center',
                }}
              >
                <br />
                <h1>Apartment application Unavailable</h1>
                <h4>Apartment application is available for students or housing staff only.</h4>
                <br />
                <br />
                <Button
                  className="back-home-button"
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    window.location.pathname = '';
                  }}
                >
                  Back To Home
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }
  } else {
    // If the network is offline
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent
              style={{
                margin: 'auto',
                textAlign: 'center',
              }}
            >
              <Grid
                item
                xs={2}
                alignItems="center"
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <img src={require(`${'../../NoConnection.svg'}`)} alt="Internet Connection Lost" />
              </Grid>
              <br />
              <h1>Please Re-establish Connection</h1>
              <h4>Viewing Apartment Applications has been deactivated due to loss of network.</h4>
              <br />
              <br />
              <Button
                className="back-home-button"
                color="primary"
                variant="outlined"
                onClick={() => {
                  window.location.pathname = '';
                }}
              >
                Back To Home
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default ApartApp;
