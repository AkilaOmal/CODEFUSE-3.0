// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import CodingBackground from "../components/CodingBackground";

// export default function RegisterPage() {
//   const router = useRouter();

//   //Redirect to home page immediately since registration is closed
//   // useEffect(() => {
//   //   router.push("/");
//   // }, [router]);

//   return (
   
//      <>
//      <CodingBackground/>
      
//     <div className="relative z-10 min-h-screen flex items-center justify-center">
       
//       <div className="text-center">
        
//         <h1 className="text-2xl font-bold text-white mb-4">
//           Registration is opening soon.
//         </h1>
//         <p className="text-gray-300">Redirecting to home page...</p>
//       </div>
//     </div>
//     </>
//   );
// }
"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import CodingBackground from "../components/CodingBackground";
import { supabase } from "../../lib/supabase";

type Member = {
  name: string;
  registrationNumber: string;
  email: string;
  hackerrankEmail: string;
  whatsappNumber: string;
};

type SupabaseError = {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
};

export default function RegisterPage() {

  // -----------------------------
  // Team state
  // -----------------------------

  const [teamName, setTeamName] = useState("");

  const [memberCount, setMemberCount] = useState(1);

  const [members, setMembers] = useState<Member[]>([
    {
      name: "",
      registrationNumber: "",
      email: "",
      hackerrankEmail: "",
      whatsappNumber: "",
    },
  ]);

  // -----------------------------
  // UI state
  // -----------------------------

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  // =====================================================
  // CHANGE NUMBER OF MEMBERS
  // =====================================================

  const handleMemberCountChange = (count: number) => {

    setMemberCount(count);

    setMembers((oldMembers) => {

      const updatedMembers = [...oldMembers];

      // Add new members
      while (updatedMembers.length < count) {

        updatedMembers.push({
          name: "",
          registrationNumber: "",
          email: "",
          hackerrankEmail: "",
          whatsappNumber: "",
        });

      }

      // Keep only selected number
      return updatedMembers.slice(0, count);

    });

  };


  // =====================================================
  // UPDATE MEMBER
  // =====================================================

  const handleMemberChange = (
    index: number,
    field: keyof Member,
    value: string,
  ) => {

    setMembers((oldMembers) => {

      const updatedMembers = [...oldMembers];

      updatedMembers[index] = {
        ...updatedMembers[index],
        [field]: value,
      };

      return updatedMembers;

    });

  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    setError("");

    setSuccess("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    // -----------------------------
    // Team name validation
    // -----------------------------

    if (!teamName.trim()) {

      setError("Please enter the team name.");

      return;
    }


    // -----------------------------
    // Member validation
    // -----------------------------

    for (let i = 0; i < members.length; i++) {

      const member = members[i];

      if (!member.name.trim()) {

        setError(
          `Please enter Member ${i + 1}'s name.`
        );

        return;
      }


      if (!member.registrationNumber.trim()) {

        setError(
          `Please enter Member ${i + 1}'s registration number.`
        );

        return;
      }


      if (!member.email.trim()) {

        setError(
          `Please enter Member ${i + 1}'s email.`
        );

        return;
      }

      if (!emailPattern.test(member.email.trim())) {
        setError(`Please enter a valid email for Member ${i + 1}.`);
        return;
      }

    }


    // -----------------------------
    // Leader HackerRank email
    // -----------------------------

    if (!members[0].hackerrankEmail.trim()) {

      setError(
        "Please enter the Leader's HackerRank account email."
      );

      return;
    }

    if (!emailPattern.test(members[0].hackerrankEmail.trim())) {
      setError("Please enter a valid HackerRank account email.");
      return;
    }

    const leaderWhatsappNumber = members[0].whatsappNumber.trim();
    if (!leaderWhatsappNumber) {
      setError("Please enter the Leader's WhatsApp number.");
      return;
    }

    if (!/^[+\d][\d\s()-]{6,}$/.test(leaderWhatsappNumber)) {
      setError("Please enter a valid Leader WhatsApp number.");
      return;
    }

    const whatsappNumber = members[0].whatsappNumber.trim();
    if (!whatsappNumber) {
      setError("Please enter the Leader's WhatsApp number.");
      return;
    }

    if (!/^[+\d][\d\s()-]{6,}$/.test(whatsappNumber)) {
      setError("Please enter a valid Leader WhatsApp number.");
      return;
    }


    // -----------------------------
    // Duplicate email check
    // -----------------------------

    const emails = members.map(
      (member) =>
        member.email.trim().toLowerCase()
    );

    const uniqueEmails = new Set(emails);

    if (uniqueEmails.size !== emails.length) {

      setError(
        "Each team member must have a different email."
      );

      return;
    }


    // -----------------------------
    // Duplicate registration number
    // -----------------------------

    const registrationNumbers =
      members.map(
        (member) =>
          member.registrationNumber
            .trim()
            .toLowerCase()
      );

    const uniqueRegistrationNumbers =
      new Set(registrationNumbers);

    if (
      uniqueRegistrationNumbers.size !==
      registrationNumbers.length
    ) {

      setError(
        "Each team member must have a different registration number."
      );

      return;
    }


    try {

      setLoading(true);

      if (!supabase) {
        setError(
          "Registration is temporarily unavailable. Supabase environment variables are missing.",
        );
        return;
      }


      // =================================================
      // PREPARE MEMBERS
      // =================================================

      const memberData = members.map(
        (member, index) => ({

          name: member.name.trim(),

          registration_number:
            member.registrationNumber.trim(),

          email:
            member.email.trim().toLowerCase(),

          role:
            index === 0
              ? "Leader"
              : "Member",

          hackerrank_email:
            index === 0
              ? member.hackerrankEmail
                  .trim()
                  .toLowerCase()
              : null,

          leader_whatsapp_no:
            index === 0 ? member.whatsappNumber.trim() : null,


        })
      );


      // =================================================
      // INSERT TEAM AND MEMBERS ATOMICALLY
      // =================================================

      const {
        data: registration,
        error: registrationError,
      } = await supabase.rpc("register_team", {
        p_team_name: teamName.trim(),
        p_member_count: memberCount,
        p_members: memberData,
      });


      if (registrationError) {

        throw registrationError;

      }

      if (!registration?.team_id) {
        throw new Error("Registration did not return a team ID.");

      }


      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(
        "Team registration completed successfully!"
      );


      // Clear form

      setTeamName("");

      setMemberCount(1);

      setMembers([
        {
          name: "",
          registrationNumber: "",
          email: "",
          hackerrankEmail: "",
          whatsappNumber: "",
        },
      ]);


    } catch (error) {

      const supabaseError = error as SupabaseError;
      if (supabaseError.code === "PGRST202") {
        setError(
          "Registration is not configured in Supabase yet. Run supabase/rls-policies.sql in the Supabase SQL Editor, then try again.",
        );
        return;
      }

      const message =
        error instanceof Error
          ? error.message
          : supabaseError.message || "Something went wrong. Please try again.";
      const details = supabaseError.details ? ` ${supabaseError.details}` : "";
      const hint = supabaseError.hint ? ` ${supabaseError.hint}` : "";

      setError(`${message}${details}${hint}`);

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <main className="relative min-h-screen overflow-hidden">

      {/* Background */}

      <CodingBackground />


      {/* Background overlay */}

      <div className="absolute inset-0 bg-black/60" />


      {/* Main */}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">

        <div className="w-full max-w-3xl">

          <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl">


            {/* ================= HEADER ================= */}

            <div className="text-center mb-8">

              <h1 className="text-3xl md:text-4xl font-bold text-white">

                Team Registration

              </h1>

              <p className="text-gray-400 mt-2">

                Register your team for the hackathon

              </p>

            </div>


            {/* ================= SUCCESS ================= */}

            {success && (

              <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-400">

                {success}

              </div>

            )}


            {/* ================= ERROR ================= */}

            {error && (

              <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">

                {error}

              </div>

            )}


            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >


              {/* ================= TEAM NAME ================= */}

              <div>

                <label className="block text-white font-medium mb-2">

                  Team Name <br/>
                 <span style={{ fontSize: "0.8rem", color: "#e20707" }}>
                  *Please make sure this team name is already registered on HackerRank before continuing.
                </span> 

                </label>

                <input
                  type="text"
                  value={teamName}
                  onChange={(e) =>
                    setTeamName(e.target.value)
                  }
                  //placeholder="Please make sure this team name is already registered on HackerRank before continuing."
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/50"
                />

              </div>


              {/* ================= MEMBER COUNT ================= */}

              <div>

                <label className="block text-white font-medium mb-3">

                  Number of Team Members

                </label>


                <div className="flex gap-3">

                  {[1, 2, 3].map((count) => (

                    <button
                      key={count}
                      type="button"
                      onClick={() =>
                        handleMemberCountChange(count)
                      }
                      className={`w-14 h-12 rounded-lg border transition ${
                        memberCount === count
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white border-white/10 hover:border-white/50"
                      }`}
                    >

                      {count}

                    </button>

                  ))}

                </div>

              </div>


              {/* ================= MEMBERS ================= */}

              {members.map(
                (member, index) => (

                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/5 p-5 md:p-6"
                  >


                    {/* Member title */}

                    <div className="mb-6">

                      <h2 className="text-xl font-semibold text-white">

                        {index === 0
                          ? "Member 1 — Leader"
                          : `Member ${index + 1}`}

                      </h2>

                    </div>


                    <div className="space-y-5">


                      {/* ================= NAME ================= */}

                      <div>

                        <label className="block text-gray-200 text-sm mb-2">

                          Full Name

                        </label>

                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) =>
                            handleMemberChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Enter full name"
                          className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/50"
                        />

                      </div>


                      {/* ================= REGISTRATION NUMBER ================= */}

                      <div>

                        <label className="block text-gray-200 text-sm mb-2">

                          Registration Number

                        </label>

                        <input
                          type="text"
                          value={
                            member.registrationNumber
                          }
                          onChange={(e) =>
                            handleMemberChange(
                              index,
                              "registrationNumber",
                              e.target.value
                            )
                          }
                          placeholder="fc000000"
                          className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/50"
                        />

                      </div>


                      {/* ================= EMAIL ================= */}

                      <div>

                        <label className="block text-gray-200 text-sm mb-2">

                          Email

                        </label>

                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) =>
                            handleMemberChange(
                              index,
                              "email",
                              e.target.value
                            )
                          }
                          placeholder="Enter email address"
                          className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/50"
                        />

                      </div>


                      {/* ================= HACKERRANK ================= */}

                      {index === 0 && (

                        <div>

                          <label className="block text-gray-200 text-sm mb-2">

                            HackerRank Account Email

                          </label>

                          <input
                            type="email"
                            value={
                              member.hackerrankEmail
                            }
                            onChange={(e) =>
                              handleMemberChange(
                                index,
                                "hackerrankEmail",
                                e.target.value
                              )
                            }
                            placeholder="Enter the email address used to create the HackerRank team"
                            className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/50"
                          />

                          <p className="text-xs text-gray-500 mt-2">

                            Only the team leader needs
                            to provide the HackerRank
                            account email.

                          </p>

                          <label className="block text-gray-200 text-sm mb-2 mt-5">
                            Leader WhatsApp Number
                          </label>

                          <input
                            type="tel"
                            value={member.whatsappNumber}
                            onChange={(e) =>
                              handleMemberChange(
                                index,
                                "whatsappNumber",
                                e.target.value,
                              )
                            }
                            placeholder="Enter WhatsApp number"
                            className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/50"
                          />

                        </div>

                      )}

                    </div>

                  </div>

                )
              )}


              {/* ================= SUBMIT ================= */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white text-black py-4 font-bold text-lg transition hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {loading
                  ? "Submitting..."
                  : "Register Team"}

              </button>


            </form>

          </div>

        </div>

      </div>

    </main>

  );

}