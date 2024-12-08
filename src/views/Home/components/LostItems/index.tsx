import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lostAndFoundService from 'services/lostAndFound';
import { MissingItemReport } from 'services/lostAndFound'; // Import the type from the service
import { format } from 'date-fns';
import { Launch, NotListedLocation, WhereToVote } from '@mui/icons-material';
import GordonLoader from 'components/Loader';
import Badge from '@mui/material/Badge';
import GordonSnackbar from 'components/Snackbar';
import styles from '../../../../views/CampusSafety/views/LostAndFound/LostAndFound.module.css'; // Import the external CSS

const formatDate = (date: string) => {
  return format(Date.parse(date), 'MM/dd/yy');
};

const noReports = (
  <Grid item alignItems="center">
    <br />
    <Typography variant="body1" align="center">
      No active lost item reports.{' '}
      <Link to="/lostandfound/missingitemreport" className="gc360_text_link">
        Report a lost item <Launch />
      </Link>
    </Typography>
    <br />
  </Grid>
);

const LostItems = () => {
  const [loading, setLoading] = useState(true);
  const [activeReports, setActiveReports] = useState<MissingItemReport[] | null>(null);
  const [countNotIncluded, setCountNotIncluded] = useState<number>(0);
  const isMobile = useMediaQuery('(max-width:375px)');
  const navigate = useNavigate();

  // The row labelling the column names for the report grid
  const reportHeader = () => (
    <Card>
      <CardHeader
        className={`gc360_header ${styles.headerPadding}`}
        title={
          <Grid container className={styles.headerText}>
            <Grid item xs={5} sm={4}>
              <Typography>Date Lost</Typography>
            </Grid>
            {!isMobile ? (
              <Grid item xs={4}>
                <Typography>Location</Typography>
              </Grid>
            ) : null}
            <Grid item xs={3} sm={4}>
              <Typography>Category</Typography>
            </Grid>
          </Grid>
        }
      />
    </Card>
  );

  // Component defining each row of the report grid
  const reportRow = (report: MissingItemReport, isFoundSection: boolean = false) => (
    <Card
      className={`${isFoundSection && report.status.toLowerCase() === 'found' ? styles.dataFoundRow : styles.dataRow} ${
        styles.clickableRow
      }`}
      onClick={() => {
        // Navigate to the edit page for found items
        if (isFoundSection && report.status.toLowerCase() === 'found') {
          navigate(`/lostandfound/${report.recordID}`);
        }
      }}
    >
      <CardContent
        className={styles.dataContent}
        sx={{
          '&:last-child': {
            paddingBottom: '0px', // Remove the bottom padding on the row card
          },
        }}
        onClick={() => {
          navigate('/lostandfound');
        }}
      >
        <Grid container>
          <Grid item xs={5} sm={4} className={styles.alignData}>
            <div className={styles.dataCell}>{formatDate(report.dateLost)}</div>
          </Grid>
          {!isMobile ? (
            <Grid item xs={4} className={styles.alignData}>
              <div className={styles.dataCell}>{report.locationLost}</div>
            </Grid>
          ) : null}
          <Grid item xs={3} sm={4} className={styles.alignData}>
            <div>{report.category}</div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  {
    loading || activeReports === null ? (
      <GordonLoader />
    ) : (
      <>
        {activeReports?.length < 1 ? noReports : reportHeader()}
        {activeReports.map((report) => reportRow(report))}
        {countNotIncluded > 0 ? (
          <>
            <Card>
              <CardContent>
                <Typography>
                  {countNotIncluded} more report{countNotIncluded > 1 ? 's' : null} not shown{' '}
                  <Link to="/lostandfound" className="gc360_text_link">
                    View All <Launch />
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </>
        ) : null}
      </>
    );
  }
};
