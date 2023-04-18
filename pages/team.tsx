import LegalLayout from "components/LegalLayout";
import Image from "next/image";
import React, { ReactNode } from "react";

const teamData = [
  {
    name: "Dustin Karp",
    image: "/images/avatars/medium/dustin.png",
    description: "Senior, University of Florida (UF)",
    role: "Designer & Frontend Lead.",
  },
  {
    name: "Marc Diaz",
    image: "/images/avatars/medium/marc.png",
    description: "UF Alumni",
    role: "Co-Founder & Infrastructure Lead.",
  },
  {
    name: "Amanpreet Kapoor",
    image: "/images/avatars/medium/aman.png",
    description: "Instructional Assistant Professor, UF",
    role: "Co-Founder & Learning Lead.",
  },
];

const content_contributors = [
  {
    name: "Andrew Penton",
  },
  {
    name: "Ayswarya Nandanan",
  },
  {
    name: "Eugene Li",
  },
  {
    name: "Matthew DeGuzman",
  },
  {
    name: "Meaghan Estrada",
  },
  {
    name: "Robert Casanova",
  },
];

const platform_contributors = [
  {
    name: "Abdullah Yuksel",
  },
  {
    name: "Adrian Salazar",
  },
  {
    name: "Andrew Whigham",
  },
  {
    name: "Benny Cortese",
  },
  {
    name: "Blake Rand",
  },
  {
    name: "Daniel Lai",
  },
  {
    name: "Dominik Andrzejczyn",
  },
  {
    name: "Hamish Pierpont",
  },
  {
    name: "Herman A. Gonzalez",
  },
  {
    name: "Jahdiel Suarez",
  },
  {
    name: "John Dillon",
  },
  {
    name: "Jose A. Cabrera",
  },
  {
    name: "Josh Dargan",
  },
  {
    name: "Kattrina Erillo",
  },
  {
    name: "Maeloni Pompilio",
  },
  {
    name: "Maggie Tieu",
  },
  {
    name: "Matthew Jung",
  },
  {
    name: "Nitin Ramadoss",
  },
  {
    name: "Paul Wei",
  },
  {
    name: "Prayuj Tuli",
  },
  {
    name: "Robert McAdam",
  },
  {
    name: "Tanner Ropp",
  },
  {
    name: "Vida Tonkova",
  },
];

const research_contributors = [
  {
    name: "Joseph Hardin",
  },
  {
    name: "Kunyao Wang",
  },
];

const platform_supporters = [
  {
    name: "Computer & Information Science & Engineering Department, UF",
  },
  {
    name: "Engineering Education Department, UF",
  },
  {
    name: "UF Center for Teaching Excellence",
  },
  {
    name: "George A. Smathers Libraries, UF",
  },
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
      <div className="flex flex-col space-y-8 !mt-16">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold text-nav-darkest font-ambit text-left pl-4">
            Platform Contributors
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {platform_contributors.map((member) => (
              <div key={member.name}>
                <h1 className="text-base p-4 flex flex-col items-start text-nav-darkest font-ambit">
                  <span>{member.name}</span>
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold text-nav-darkest font-ambit text-left pl-4">
            Research Contributors
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {research_contributors.map((member) => (
              <div key={member.name}>
                <h1 className="text-base p-4 flex flex-col items-start text-nav-darkest font-ambit">
                  <span>{member.name}</span>
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold text-nav-darkest font-ambit text-left pl-4">
            Content Contributors
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8">
            {content_contributors.map((member) => (
              <div key={member.name}>
                <h1 className="text-base p-4 flex flex-col items-start text-nav-darkest font-ambit">
                  <span>{member.name}</span>
                </h1>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold text-nav-darkest font-ambit text-left pl-4">
            Supporters
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-8">
            {platform_supporters.map((member) => (
              <div key={member.name}>
                <h1 className="text-base p-4 flex flex-col items-start text-nav-darkest font-ambit">
                  <span>{member.name}</span>
                </h1>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

Team.getLayout = (page: ReactNode) => (
  <LegalLayout title="Our Team">{page}</LegalLayout>
);

export default Team;
