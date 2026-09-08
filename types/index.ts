export type MemberDataType = {
  name: string;
  email: string;
};

export type TeamsDataType = {
  teamName: string;
  NoOfMembers: number;
  department: "SE" | "CS" | "IS" | "";
  leaderData: MemberDataType;
  membersData: MemberDataType[];
  year: string;
};
