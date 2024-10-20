import { Card, CardContent, CardHeader, Grid, Typography, IconButton, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import styles from './LostAndFound.module.css';
import { useTheme } from '@mui/material/styles'; // Import theme

// Define the type for Missing Item
type MissingItem = {
  id: string;
  dateLost: string;
  location: string;
  category: string;
  description: string;
  status: string;
};

const LostAndFound = () => {
  const [activeReports, setActiveReports] = useState<MissingItem[]>([]);
  const [pastReports, setPastReports] = useState<MissingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme(); // Access theme

  // Mock Data for demonstration
  const mockActiveReports: MissingItem[] = [
    {
      id: '1',
      dateLost: '9/9/24',
      location: 'Probably Bennett',
      category: 'Electronics',
      description: 'iPhone 15 pro max, with black case',
      status: 'lost',
    },
    {
      id: '2',
      dateLost: '5/4/24',
      location: 'Barrington',
      category: 'Books',
      description: 'Klara and the Sun',
      status: 'lost',
    },
  ];

  const mockPastReports: MissingItem[] = [
    {
      id: '3',
      dateLost: '10/5/24',
      location: 'KOSC',
      category: 'Electronics',
      description: 'MacBook Pro, gray',
      status: 'found',
    },
    {
      id: '4',
      dateLost: '4/5/24',
      location: 'Jenks',
      category: 'Bottles/Mugs',
      description: 'Blue hydroflask, with a sticker',
      status: 'deleted',
    },
    {
      id: '5',
      dateLost: '11/13/23',
      location: 'AJ Chapel',
      category: 'Clothing/Shoes',
      description: 'Purple vikings hoodie',
      status: 'expired',
    },
  ];

  useEffect(() => {
    setLoading(true);

    // Simulate loading the mock data
    setTimeout(() => {
      setActiveReports(mockActiveReports);
      setPastReports(mockPastReports);
      setLoading(false);
    }, 1000); // Simulate a loading delay of 1 second
  }, []);

  const handleEdit = (reportId: string) => {
    console.log(`Editing report: ${reportId}`);
  };

  const handleDelete = (reportId: string) => {
    console.log(`Deleting report: ${reportId}`);
  };

  return (
    <>
      <Header />

      <Grid container justifyContent="center" marginTop={3}>
        <Grid item sm={10}>
          <Card className={styles.card}>
            <CardHeader
              className={styles.title}
              title={
                <Typography variant="h4" align="center">
                  <span style={{ color: theme.palette.warning.main }}>Gordon</span> Lost and Found
                </Typography>
              }
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                padding: '20px',
              }}
            />
            <CardContent>
              <Grid container>
                <Grid item sm={0.5}>
                  <InfoOutlinedIcon />
                </Grid>
                <Grid item sm={10}>
                  <Typography variant="h5" align="center">
                    Gordon Police manages campus lost & found
                  </Typography>
                  <br />
                  <Typography variant="body1" align="center">
                    Police staff will view reports, and you will be notified if your item is found.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Button to Report a Missing Item */}
      <Grid container justifyContent="center" marginTop={3}>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.info.main, // Correct theme color
              '&:hover': {
                backgroundColor: theme.palette.info.dark,
              },
              color: theme.palette.primary.contrastText,
              padding: '10px 30px',
              fontSize: '1rem',
              textTransform: 'uppercase',
            }}
            onClick={() => {
              console.log('Report a Missing Item');
            }}
          >
            Report a Missing Item
          </Button>
        </Grid>
      </Grid>

      {/* My Active Missing Item Reports Section */}
      <Grid container justifyContent="center" spacing={3} marginTop={3}>
        <Grid item xs={12} sm={10}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h5" align="center">
                My Active <span style={{ color: theme.palette.warning.main }}>Missing</span> Item
                Reports
              </Typography>

              {/* Table Header */}
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: '10px',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  padding: '10px 0',
                }}
              >
                <Grid item xs={2.5}>
                  <Typography align="center">Date Lost</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Location</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Category</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Description</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography align="center">Actions</Typography>
                </Grid>
              </Grid>

              {/* Data Rows */}
              <Grid container spacing={2} marginTop={2}>
                {activeReports.map((report) => (
                  <Grid item xs={12} key={report.id}>
                    <Card
                      sx={{
                        backgroundColor: theme.palette.neutral.light, // Set a proper light background
                        marginBottom: '10px',
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.dateLost}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.location}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.category}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.description}</Typography>
                          </Grid>

                          {/* Icons */}
                          <Grid
                            item
                            xs={0.5}
                            sx={{ display: 'flex', justifyContent: 'flex-start' }}
                          >
                            <IconButton onClick={() => handleEdit(report.id)} size="small">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Grid>
                          <Grid item xs={0.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={() => handleDelete(report.id)} size="small">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* My Past Reports Section */}
      <Grid container justifyContent="center" spacing={3} marginTop={3}>
        <Grid item xs={12} sm={10}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h5" align="center">
                My Past Reports
              </Typography>

              {/* Table Header */}
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: '10px',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  padding: '10px 0',
                }}
              >
                <Grid item xs={2.5}>
                  <Typography align="center">Date Lost</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Location</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Category</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Description</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center">Status</Typography>
                </Grid>
              </Grid>

              {/* Data Rows */}
              <Grid container spacing={2} marginTop={2}>
                {pastReports.map((report) => (
                  <Grid item xs={12} key={report.id}>
                    <Card
                      sx={{
                        backgroundColor: theme.palette.neutral.light, // Set a proper light background
                        marginBottom: '10px',
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.dateLost}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.location}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.category}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.description}</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography align="center">{report.status}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFound;
