import LegalLayout from "components/LegalLayout";
import Image from "next/image";
import React, { ReactNode } from "react";

const teamData = [
  {
    name: "Dustin Karp",
    image: "/images/avatars/dustin.png",
    description: "Senior, University of Florida (UF)",
    role: "Designer & Frontend Lead.",
  },
  {
    name: "Marc Diaz",
    image: "/images/avatars/marc.png",
    description: "UF Alumni",
    role: "Co-Founder & Infrastructure Lead.",
  },
  {
    name: "Amanpreet Kapoor",
    image: "/images/avatars/aman.png",
    description: "Instructional Assistant Professor, UF",
    role: "Co-Founder & Learning Lead.",
  },
];

const contributors = [
  "Matthew Jung",
  "Daniel Lai",
  "Benny Cortese",
  "Blake Rand",
  "Maeloni Pompilio",
];

const Team = () => {
  return (
    <div className="text-center w-full flex flex-col space-y-4 pt-12">
      <div className="w-16 h-16 relative mx-auto">
        <Image src={"/images/chalkboardIcon.png"} layout="fill" />
      </div>
      <h1 className="text-3xl font-semibold text-nav-darkest font-ambit">
        Built by students, for students.
      </h1>
      <p className="text-nav-darkest">
        Edugator is designed by researchers and engineers with excessive
        obsession for student centered learning.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 !mt-16">
        {teamData.map((member) => (
          <div
            className="flex flex-col items-start space-y-4 p-4 rounded-md"
            key={member.name}
          >
            <div className="w-20 h-20 relative bg-gradient-to-br from-emerald-400 to-green-800 rounded-sm overflow-hidden ring ring-slate-50 drop-shadow-xl">
              <Image src={member.image} layout="fill" />
            </div>
            <h1 className="text-2xl flex flex-col items-start font-semibold text-nav-darkest font-ambit">
              <span>{member.name}</span>
              <span className="opacity-60 text-sm">{member.description}</span>
            </h1>
            <p className="text-nav-darkest text-left font-dm !-mt-2">
              <br />
              {member.role}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
        {contributors.map((member) => (
          <div key={member}>
            <h1 className="text-base p-4 flex flex-col items-start font-semibold text-nav-darkest font-ambit">
              <span>{member}</span>
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

Team.getLayout = (page: ReactNode) => (
  <LegalLayout title="Our Team">{page}</LegalLayout>
);

export default Team;
