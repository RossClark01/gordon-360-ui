import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import 'add-to-calendar-button';
import { format, setDay } from 'date-fns';

const dayArr = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

const ScheduleDialog = (props) => {
  return (
    <Dialog open={props.scheduleDialogOpen} keepMounted fullWidth={true} maxWidth="xs">
      <div>
        <DialogTitle sx={{ fontWeight: 'bold' }} align="center">
          Add Course Schedule to Calendar
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 'large' }} align="left">
            Course Title: {props.selectedCourseInfo?.title.split('in')[0]}
          </Typography>
          <Typography sx={{ fontSize: 'large' }} align="left">
            Room: {props.selectedCourseInfo?.title.split('in')[1]}
          </Typography>
          <Typography sx={{ fontSize: 'large' }} align="left">
            Time Range:
            {format(
              new Date(props.selectedCourseInfo ? props.selectedCourseInfo.start : null),
              " hh:mm aaaaa'm' ",
            )}
            {format(
              new Date(props.selectedCourseInfo ? props.selectedCourseInfo.end : null),
              " - hh:mm aaaaa'm' ",
            )}
          </Typography>
          <Typography sx={{ fontSize: 'large' }} align="left">
            Meeting Days: {props.recurringDays}
          </Typography>
          <Typography sx={{ fontSize: 'large' }} align="left">
            Term:{' '}
            {format(
              setDay(
                new Date(props.firstDay),
                dayArr.indexOf(props.selectedCourseInfo?.resourceId) + 1,
              ),
              'yyyy-MM-dd',
            )}
            {'--'}
            {format(
              setDay(
                new Date(props.lastDay),
                dayArr.indexOf(props.selectedCourseInfo?.resourceId) + 1,
              ),
              'yyyy-MM-dd',
            )}
          </Typography>
        </DialogContent>
        <DialogActions style={{ overflow: 'hidden', flexDirection: 'column' }}>
          {/* There are two separate add-to-calendar buttons because Google calendar is the only
          calendar that supports recurring events, the other add-to-calendar button is for the other
          options that users can choose and manually set the course as recurring */}
          <Grid container lg={12} alignContent="center">
            {props.selectedCourseInfo && (
              <>
                <Grid item lg={2}></Grid>
                <Grid item lg={2} align="right">
                  <add-to-calendar-button
                    name={props.selectedCourseInfo.title}
                    startDate={format(
                      setDay(
                        new Date(props.firstDay),
                        dayArr.indexOf(props.selectedCourseInfo?.resourceId) + 1,
                      ),
                      'yyyy-MM-dd',
                    )}
                    startTime={
                      props.selectedCourseInfo.allDay
                        ? null
                        : format(new Date(props.selectedCourseInfo?.start), 'HH:mm')
                    }
                    endTime={
                      props.selectedCourseInfo.allDay
                        ? null
                        : format(new Date(props.selectedCourseInfo?.end), 'HH:mm')
                    }
                    description={
                      props.selectedCourseInfo.allDay ? 'Asynchronous Course' : 'Synchronous Course'
                    }
                    Location={props.selectedCourseInfo.title.split('in')[1]}
                    options="'Google'"
                    buttonsList
                    hideTextLabelButton
                    buttonStyle="round"
                    recurrence={
                      'RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=' +
                      props.recurringDays +
                      ';UNTIL=' +
                      format(new Date(props.lastDay), 'yyyyMMdd')
                    }
                    lightMode="bodyScheme"
                    Timezone="currentBrowser"
                  ></add-to-calendar-button>
                </Grid>
                <Grid item lg={6} align="left">
                  <add-to-calendar-button
                    name={props.selectedCourseInfo.title}
                    startDate={format(
                      setDay(
                        new Date(props.firstDay),
                        dayArr.indexOf(props.selectedCourseInfo.resourceId) + 1,
                      ),
                      'yyyy-MM-dd',
                    )}
                    startTime={
                      props.selectedCourseInfo.allDay
                        ? null
                        : format(new Date(props.selectedCourseInfo.start), 'HH:mm')
                    }
                    endTime={
                      props.selectedCourseInfo.allDay
                        ? null
                        : format(new Date(props.selectedCourseInfo.end), 'HH:mm')
                    }
                    description={
                      props.selectedCourseInfo.allDay ? 'Asynchronous Course' : 'Synchronous Course'
                    }
                    Location={props.selectedCourseInfo.title.split('in')[1]}
                    options="'Outlook.com','MicrosoftTeams','Apple'"
                    buttonsList
                    hideTextLabelButton
                    buttonStyle="round"
                    lightMode="bodyScheme"
                    Timezone="currentBrowser"
                  ></add-to-calendar-button>
                </Grid>
              </>
            )}
          </Grid>
          <Grid style={{ marginTop: '20px' }}>
            <Button onClick={props.handleScheduleDialogClose} variant="contained" size="medium">
              Cancel
            </Button>
          </Grid>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ScheduleDialog;
