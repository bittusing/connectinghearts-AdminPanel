export const ROLE = {
  CC_ADMIN: "cc-superadmin",
  CC_CALLER: "cc-caller",
};

export const callerHeaderText = "CCMG | Care Co-ordination";

export const users = [
  {
    role: "cc-superadmin",
    routes: ["menu-callexport", "menu-callmember"],
  },
  {
    role: "cc-caller",
    routes: ["menu-callmember"],
  },
];

export const memberPrimaryColumns = {
  MemberID: "Member ID",
  name: "Name",
  gender: "Gender",
  dob: "dob",
  primaryPhone: "Primary Phone",
  pcpName: "PCP Name",
};
export const sideMenuConstants = {
  exportMembers: "Export Members",
  dailer: "Dailer Screen",
  dashboard: "Dashboard",
};

export const routerUrlPathConstants = {
  home: "/home",
  tnc: "/tnc",
  login: "/login",
  anyPath: "*",
  unauthorized: "/unauthorized",
  communication: "/communication",
  memberExport: "/member-export",
  dashboard: "/dashboard",
};

export const visitorPrimaryColumns = {
  consentForCareDuringVisit: "Consent For Care During Visit",
  DOS: "DOS",
  providerName: "Provider Name",
  visitId: "Visit ID",
  visitType: "Visit Type",
};

export const clientDisposition = {
  CALL_BACK_REQUEST_ID: "CCMG-call_disposition_callbackrequest",
  CARE_GIVER_ID: "CCMG-call_disposition_caregiver_request",
};
