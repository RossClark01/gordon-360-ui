/**
 * Housing API call functions
 * establishes the functions necessary to make calls to the back end.
 * @module housing
 */

import http from './http';

/**
 * @global
 * @typedef boolean
 * @property {status}
 *
 */

/**
 * @typedef { import('./user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * @global
 * @typedef ApartmentChoice
 * @property {String} hallName  The name of the apartment hall
 * @property {Number} hallRank  The rank assigned to this hall by the user
 */

/**
 * @global
 * @typedef ApplicationDetails
 * @property {Number} AprtAppID  Application ID number of this application
 * @property {String} Username  Username of the primary applicant
 * @property {String[]} Applicants  Array of student usernames
 */

/**
 * Check if the current user is authorized to view the housing staff page for applications
 * @return {Promise.<Boolean>} True if the user is authorized to view the housing application staff page
 */
const checkHousingStaff = async () => {
  try {
    return await http.get(`housing/staff`);
  } catch {
    return false;
  }
};

/**
 * Check if a given student is on an existing application
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<Number>} Application's ID number
 */
const getApplicationID = async (username) => {
  let applicationID;
  if (username) {
    applicationID = await http.get(`housing/apartment/${username}/`);
  } else {
    applicationID = await http.get('housing/apartment');
  }
  return applicationID;
};

/**
 * Save the current state of the application to the database
 * @param {Number} applicationID the application ID number if it is known, else it is -1
 * @param {String} editorUsername the student username of the person filling out the application
 * @param {StudentProfileInfo[]} applicants Array of StudentProfileInfo objects
 * @param {ApartmentChoice[]} preferredHalls Array of ApartmentChoice objects
 * @return {Promise.<Number>} Application's ID number
 */
const saveApartmentApplication = async (
  applicationID,
  editorUsername,
  applicants,
  preferredHalls,
) => {
  let applicationDetails = {
    AprtAppID: applicationID,
    Username: editorUsername,
    Applicants: applicants.map((applicantProfile) => applicantProfile.AD_Username),
    ApartmentChoices: preferredHalls,
  };
  return await http.post(`housing/apartment/save/`, applicationDetails);
};

/**
 * Update the application editor of the application to the database
 * @param {Number} applicationID the application ID number
 * @param {String} newEditorUsername the student username of the person who will be allowed to edit this application
 * @return {Promise.<Boolean>} Status of whether or not the operation was successful
 */
const changeApartmentAppEditor = async (applicationID, newEditorUsername) => {
  let newModifierDetails = {
    AprtAppID: applicationID,
    Username: newEditorUsername,
  };
  return await http.post(`housing/apartment/change-modifier/`, newModifierDetails);
};

/**
 * Get active apartment application for given application ID number
 * @param {String} applicationID the application ID number for the desired application
 * @return {Promise.<ApplicationDetails>} Application details
 */
const getApartmentApplication = async (applicationID) => {
  return await http.get(`housing/apartment/load/${applicationID}/`);
};

export default {
  checkHousingStaff,
  getApplicationID,
  saveApartmentApplication,
  changeApartmentAppEditor,
  getApartmentApplication,
};
