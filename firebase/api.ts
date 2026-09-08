import { MemberDataType, TeamsDataType } from "@/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const registerTeam = async (teamData: TeamsDataType) => {
  try {
    // Use team name as document ID (converted to lowercase and spaces replaced with dashes for consistency)
    const teamId = teamData.teamName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const teamRef = doc(db, "teams", teamId);

    // Check if team already exists
    const existingTeam = await getDoc(teamRef);

    if (existingTeam.exists()) {
      return {
        success: false,
        message: "Team name already taken. Please choose a different name.",
      };
    }

    // Check if any member (including leader) is already registered in another team
    // Note: membersData should include leader at index 0 when coming from the form
    const memberEmails = teamData.membersData.map((member) => member.email);

    // You might want to add a check here to see if any emails are already used
    // This would require querying all teams and checking member emails

    // Prepare data for Firestore
    const firestoreData = {
      teamName: teamData.teamName,
      teamId: teamId,
      noOfMembers: teamData.NoOfMembers,
      year: teamData.year,
      leader: {
        name: teamData.membersData[0].name,
        email: teamData.membersData[0].email,
        isLeader: true,
      },
      members: teamData.membersData.slice(1).map((member: MemberDataType) => ({
        name: member.name,
        email: member.email,
        isLeader: false,
      })),
      allMembers: teamData.membersData.map(
        (member: MemberDataType, index: number) => ({
          name: member.name,
          email: member.email,
          isLeader: index === 0,
        })
      ),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "registered", // You can add status tracking
      department: teamData.department,
    };

    await setDoc(teamRef, firestoreData);

    console.log("Team registered with ID: ", teamRef.id);

    return {
      success: true,
      message: "Team registered successfully!",
      teamId: teamRef.id,
    };
  } catch (error) {
    console.error("Error registering team: ", error);
    return {
      success: false,
      message: "Failed to register team. Please try again.",
    };
  }
};

// Additional helper function to check if an email is already used
export const checkEmail = async (email: string): Promise<boolean> => {
  try {
    // This is a simplified check - in a real app, you'd want to create an index
    // or use a different collection structure for better performance
    // For now, this is a placeholder for the logic

    // You could create a separate "emails" collection to track used emails
    const emailRef = doc(db, "emails", email.toLowerCase());
    const emailDoc = await getDoc(emailRef);

    return emailDoc.exists();
  } catch (error) {
    console.error("Error checking email: ", error);
    return false;
  }
};

// Function to mark emails as used
export const markEmailsAsUsed = async (emails: string[], teamId: string) => {
  try {
    const promises = emails.map(async (email) => {
      const emailRef = doc(db, "emails", email.toLowerCase());
      await setDoc(emailRef, {
        email,
        teamId,
        usedAt: new Date().toISOString(),
      });
    });

    await Promise.all(promises);
  } catch (error) {
    console.error("Error marking emails as used: ", error);
  }
};

// Enhanced registration function with duplicate check
export const registerTeamWithValidation = async (teamData: TeamsDataType) => {
  try {
    // Check team name availability
    const teamId = teamData.teamName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const teamRef = doc(db, "teams", teamId);
    const existingTeam = await getDoc(teamRef);

    if (existingTeam.exists()) {
      return {
        success: false,
        message: "Team name already taken. Please choose a different name.",
      };
    }

    // Check emails
    // Note: membersData should include leader at index 0 when coming from the form
    const allEmails = teamData.membersData.map(
      (member: MemberDataType) => member.email
    );

    // Check for duplicate emails
    const duplicateChecks = await Promise.all(
      allEmails.map((email) => checkEmail(email))
    );

    const duplicateEmails = allEmails.filter(
      (_, index) => duplicateChecks[index]
    );

    if (duplicateEmails.length > 0) {
      return {
        success: false,
        message: `Email(s) ${duplicateEmails.join(
          ", "
        )} already registered in another team.`,
      };
    }

    // Register the team
    const result = await registerTeam(teamData);

    if (result.success) {
      // Mark emails as used
      await markEmailsAsUsed(allEmails, teamId);
    }

    return result;
  } catch (error) {
    console.error("Error in team registration validation: ", error);
    return {
      success: false,
      message: "Registration failed. Please try again.",
    };
  }
};

export const sendEmail = async (to: string, subject: string, html: string) => {
  const response = await fetch(
    "https://us-central1-codefuse-69919.cloudfunctions.net/api/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        html,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Error sending email:", data);
  } else {
    console.log("Email sent successfully:", data);
  }
};

export const sendBatchEmails = async (
  emails: string[],
  subject: string,
  html: string
) => {
  const response = await fetch(
    `https://us-central1-codefuse-69919.cloudfunctions.net/api/send-batch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emails,
        subject,
        html,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Error sending batch emails:", data);
    throw new Error(data.error || "Failed to send batch emails");
  } else {
    console.log("Batch emails sent successfully:", data);
    return data;
  }
};
