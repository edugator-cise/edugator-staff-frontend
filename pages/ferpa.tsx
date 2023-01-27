import VerticalNavigation from "components/shared/VerticalNavigation";
import { styled } from "@mui/styles";
import theme from "constants/theme";
import { Typography } from "@mui/material";
import Footer from "components/shared/Footer";

interface ProblemLocationState {
  moduleName?: string;
}

const TitleHolder = styled("div")({
  height: 400,
  width: "100%",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(transparent, transparent, transparent, transparent, #f1f1f11a, #f1f1f129, #f1f1f1da), url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)",
  backgroundImage:
    "url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)",
  backgroundSize: "35em",
  mozWindowShadow: "inset 0 -10px 10px -10px #0000001a",
  webkitBoxShadow: "inset 0 -10px 10px -10px #0000001a",
  boxShadow: "inset 0 -10px 10px -10px #0000001a",
});

const TextHolder = styled("div")({
  width: "70%",
  maxWidth: "1400px",
  padding: 30,
  textAlign: "left",
  backgroundColor: "white",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
});

function Ferpa() {
  return (
    <>
      <div id="top" />
      <VerticalNavigation light={true} codingPage={false} />
      <TitleHolder>
        <div>
          <Typography variant="h2">FERPA Addendum - Edugator</Typography>
        </div>
      </TitleHolder>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fcfcfc",
        }}
      >
        <TextHolder>
          <Typography variant="body1" sx={{ lineHeight: 2 }}>
            <b>What is FERPA?</b>
            <br />
            <br />
            FERPA, the Family Education Rights and Privacy Act, is an American
            federal law that governs how institutions protect student Education
            Records.
            <br />
            <br />
            <b>FERPA does this by:</b>
            <br />
            <br />
            <ul>
              <li>
                Outlining students' rights concerning their Education Records
              </li>
              <li>
                Establishing conditions for when student Education Records can
                be shared with third parties
              </li>
            </ul>
            <br />
            <b>What does FERPA do?</b>
            <br />
            <br />
            In short, FERPA does three things:
            <ul>
              <li>Defines "Education Records"</li>
              <li>
                Ensures students’ rights to inspect their own Education Records
                and to request amendments to inaccurate information
              </li>
              <li>
                Requires that university officials receive students’ consent
                before disclosing student Education Records to third parties
              </li>
            </ul>
            <br />
            <b>What is an ‘Education Record’, according to FERPA?</b>
            <br />
            <br />
            According to FERPA, Education Records are those academic records,
            files, documents, and other materials which (i) contain information
            directly related to a student and are (ii) maintained by an
            educational institution.
            <br />
            <br />
            <b>Education Records include:</b>
            <ul>
              <li>
                Academic transcripts including official documents related to
                grades
              </li>
              <li>Disciplinary Records</li>
              <li>
                Financial records, including those of a parent which pertain to
                a given student
              </li>
            </ul>
            <br />
            <b>
              What is not considered an ‘Education Record’, according to FERPA?
            </b>
            <br />
            <br />
            FERPA defines "Directory Information" as information contained in an
            education record of a student that would not generally be considered
            harmful or an invasion of privacy if disclosed.
            <br />
            <br />
            <b>
              According to FERPA Directory Information includes a student’s:
            </b>
            <ul>
              <li>Name</li>
              <li>Address</li>
              <li>Telephone listing</li>
              <li>Electronic mail address</li>
              <li>Photograph</li>
              <li>Date of birth</li>
              <li>Major field of study</li>
              <li>Grade level</li>
              <li>Dates of attendance</li>
              <li>Honors and awards received</li>
            </ul>
            Under FERPA, Institutions and School Officials may disclose
            Directory Information to third parties without students' consent.
            <br />
            <br />
            <b>FERPA Compliance: Edugator</b>
            <br />
            <br />
            To ensure FERPA compliance, Edugator, does not collect any Personal
            Identifiable Information (PII) or unique identifier from a student.
            The student submits their code without logging into the application
            ensuring anonymity. You authorize Edugator to access and process
            your coding data solely for the purposes of providing the Service,
            as an outsourced institutional function pursuant to FERPA 34 CFR
            Part 99.31(a)(1). Your submitted code is run on our auto grading
            engine to generate a report so that you can see the output of your
            program on predefined test cases. Unless you provide any PII or
            identification in your code, we have no way to determine which user
            submitted the code. You acknowledge and agree that, as between the
            parties, you are solely responsible for providing any personal
            information. Students can also request for any Education Records
            pertaining to them to be destroyed. We do not share your personal
            information with third parties, except where required by law, to
            protect our own rights, or to provide a service to you. We only
            retain personal information for as long as necessary to provide you
            with a service.
            <br />
            <br />
          </Typography>
        </TextHolder>
      </div>
      <Footer />
    </>
  );
}

export default Ferpa;
