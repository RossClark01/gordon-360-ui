import http from './http';

/**
 * Missing item report object, representing the model of a report for communication with the
 * backend service.
 */
export type MissingItemReport = {
  recordID: number;
  firstName?: string;
  lastName?: string;
  category: string;
  colors: string[]; // Ensures colors is always an array
  brand?: string;
  description: string;
  locationLost: string;
  stolen: boolean;
  stolenDescription?: string;
  dateLost: string;
  dateCreated: string;
  phone?: string;
  email?: string;
  status: string;
  submitterUsername: string;
  submitterID?: null;
  forGuest: boolean;
  adminActions?: MissingAdminAction[];
};

export type InitMissingItemReport = Omit<MissingItemReport, 'recordID'>;

/**
 * Missing Admin Action object, representing the model of an action taken on a missing item
 * report for communication with the backend.
 */
export type MissingAdminAction = {
  ID: number;
  missingID: number;
  action: string;
  actionDate: string;
  actionNote?: string;
  username: string;
  isPublic?: boolean;
};

export type InitAdminAction = Omit<MissingAdminAction, 'ID'>;

/**
 * Fetch an array containing the full list of all missing item reports.
 * @param reportStatus the status of the report for filtering
 * @param category the category to filter by
 * @param color the color to filter by
 * @param keywords keywords to filter by
 * @returns MissingItemReport[] array of all missing item reports.
 */
const getMissingItemReports = (
  reportStatus?: string,
  category?: string,
  color?: string,
  keywords?: string,
): Promise<MissingItemReport[]> => {
  let query: { status?: string; category?: string; color?: string; keywords?: string } = {};
  if (reportStatus) {
    query['status'] = reportStatus;
  }
  if (category) {
    query['category'] = category;
  }
  if (color) {
    query['color'] = color;
  }
  if (keywords) {
    query['keywords'] = keywords;
  }

  console.log('API REQUEST SENT');
  return http.get<MissingItemReport[]>(`lostandfound/missingitems${http.toQueryString(query)}`);
};

/**
 * Fetch an array containing the full list of all missing item reports for
 * the currently logged in user.
 * @param username The username to get reports of
 * @returns MissingItemReport[] array of all missing item reports.
 */
const getMissingItemReportUser = (username: string): Promise<MissingItemReport[]> =>
  http.get<MissingItemReport[]>(
    `lostandfound/missingitems${http.toQueryString({ user: username })}`,
  );

/**
 * Fetch a single missing item report given an ID.
 * @param id the ID of the missing item report to fetch.
 * @returns MissingItemReport a single missing item report matching the ID.
 */
const getMissingItemReport = (id: number): Promise<MissingItemReport> =>
  http.get<MissingItemReport>(`lostandfound/missingitems/${id}`);

/**
 * Fetch admin actions for a missing item report given the report's ID.
 * @param id the ID of the missing item report to fetch admin actions for.
 * @returns MissingAdminAction[] the array of admin actions for the selected report.
 */
const getAdminActions = (id: number): Promise<MissingAdminAction[]> =>
  http.get<MissingAdminAction[]>(`lostandfound/missingitems/${id}/actionstaken`);

/**
 * Create a new missing item report, assigning it a unique ID.
 * @param data MissingItemReport object without a recordID, representing the report to be created.
 * @returns the unique ID generated by the backend service for the report.
 */
const createMissingItemReport = (data: InitMissingItemReport): Promise<number> => {
  const now = new Date();
  const formattedData = {
    ...data,
    dateLost: data.dateLost || now.toISOString(), // Ensures dateLost is set
    dateCreated: now.toISOString(),
    colors: data.colors || [], // Ensures colors is an array, even if not defined
  };
  return http.post<number>('lostandfound/missingitems', formattedData);
};

/**
 * Create an admin action for a missing item report given the report's ID.
 * @param id the ID of the missing item report to create an admin action on.
 * @param data MissingAdminAction object representing the new admin action to add to the report.
 * @returns the unique id generated by the backend for the admin action.
 */
const createAdminAction = (id: number, data: InitAdminAction): Promise<number> =>
  http.post<number>(`lostandfound/missingitems/${id}/actionstaken`, data);

/**
 * Update an existing missing item report.
 * @param data MissingItemReport object representing the updated report.
 * @param reportID The ID of the report to update.
 * @returns none
 */
const updateMissingItemReport = (data: MissingItemReport, reportID: number) => {
  const formattedData = {
    ...data,
    colors: data.colors || [], // Ensures colors is an array
  };
  return http.put(`lostandfound/missingitems/${reportID}`, formattedData);
};

/**
 * Update the status of an existing lost item report with the given ID.
 * @param id The ID of the missing item report.
 * @param status The new status for the report.
 * @returns none
 */
const updateReportStatus = (id: number, status: string): Promise<void> =>
  http.put<void>(`lostandfound/missingitems/${id}/${status}`);

const lostAndFoundService = {
  getMissingItemReports,
  createMissingItemReport,
  getMissingItemReport,
  getMissingItemReportUser,
  createAdminAction,
  getAdminActions,
  updateMissingItemReport,
  updateReportStatus,
};

export default lostAndFoundService;
