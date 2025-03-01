import About from './views/About';
import Admin from './views/Admin';
import ApartmentApp from './views/ApartmentApp';
import BannerSubmission from './views/BannerSubmission';
import CoCurricularTranscript from './views/CoCurricularTranscript';
import EnrollmentCheckIn from './views/EnrollmentCheckIn';
import Events from './views/Events';
import Feedback from './views/Feedback';
import Help from './views/Help';
import Home from './views/Home';
import Housing from './views/ResLife';
import IDUploader from './views/IDUploader';
import InvolvementProfile from './views/InvolvementProfile';
import InvolvementsAll from './views/InvolvementsAll';
import Links from './views/Links';
import MyProfile from './views/MyProfile';
import News from './views/News';
import Page404 from './views/Page404';
import PeopleSearch from './views/PeopleSearch';
import ProfileNotFound from './views/ProfileNotFound';
import PublicProfile from './views/PublicProfile';
import Timesheets from './views/Timesheets';
import RecIM from './views/RecIM';
import RoomRanges from 'views/ResLife/components/RDView/components/RoomRanges';
import CampusSafety from './views/CampusSafety';

// Route order must be from most specific to least specific (i.e. `/user/:username` before `/user`)
const routes = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
  },
  {
    name: 'About',
    path: '/about',
    element: <About />,
  },
  {
    name: 'Apartment Application',
    path: '/ApartApp',
    element: <ApartmentApp />,
  },
  {
    name: 'Involvement Profile',
    path: '/activity/:sessionCode/:involvementCode',
    element: <InvolvementProfile />,
  },
  {
    name: 'Involvements',
    path: '/involvements',
    element: <InvolvementsAll />,
  },
  {
    name: 'Help',
    path: '/help',
    element: <Help />,
  },
  {
    name: 'Experience Transcript',
    path: '/transcript',
    element: <CoCurricularTranscript />,
  },
  {
    name: 'Events',
    path: '/events',
    element: <Events />,
  },
  {
    name: 'Feedback',
    path: '/feedback',
    element: <Feedback />,
  },
  {
    name: 'Not Found',
    path: '/profile/null',
    element: <ProfileNotFound />,
  },
  {
    name: 'Profile',
    path: '/profile/:username',
    element: <PublicProfile />,
  },
  {
    name: 'My Profile',
    path: '/myprofile',
    element: <MyProfile />,
  },
  {
    name: 'Enrollment Check-In',
    path: '/enrollmentcheckin',
    element: <EnrollmentCheckIn />,
  },
  {
    name: 'People',
    path: '/people',
    element: <PeopleSearch />,
  },
  {
    name: 'ID Uploader',
    path: '/id',
    element: <IDUploader />,
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <Admin />,
  },
  {
    name: 'Timesheets',
    path: '/timesheets',
    element: <Timesheets />,
  },
  {
    name: 'Banner',
    path: '/banner',
    element: <BannerSubmission />,
  },
  {
    name: 'News',
    path: '/news',
    element: <News />,
  },
  {
    name: 'Links',
    path: '/links',
    element: <Links />,
  },
  {
    name: 'Res-Life',
    path: '/reslife',
    element: <Housing />,
  },
  {
    name: 'Rec-IM',
    path: '/recim/*',
    element: <RecIM />,
  },
  {
    name: 'LostAndFound',
    path: '/lostandfound/*',
    element: <CampusSafety />,
  },
  {
    name: 'Page Not Found',
    path: '*',
    element: <Page404 />,
  },
  {
    name: 'RoomRanges',
    path: '/RoomRanges',
    element: <RoomRanges />,
  },
];

export default routes;
