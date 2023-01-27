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

const Link = styled("a")({
  color: "black",
  textDecoration: "none",
});

function PrivacyNotice() {
  return (
    <>
      <div id="top" />
      <VerticalNavigation light={true} codingPage={false} />
      <TitleHolder>
        <div>
          <Typography variant="h2">PRIVACY NOTICE</Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 400, color: "#999999" }}
          >
            Last Updated January 31, 2021
          </Typography>
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
            <b>INTRODUCTION</b>
            <br />
            <br />
            Thank you for choosing to be part of our community at Edugator ("
            <b>Company</b>", "<b>we</b>", "<b>us</b>", "<b>our</b>"). We are
            committed to protecting your personal information and your right to
            privacy. If you have any questions or concerns about this privacy
            notice, or our practices with regards to your personal information,
            please contact us at{" "}
            <Link href="mailto:csinfraweb@gmail.com">csinfraweb@gmail.com</Link>
            <br />
            <br />
            When you visit our website https://cise-dev.herokuapp.com (the "
            <b>Website</b>"), and more generally, use any of our services (the "
            <b>Services</b>", which include the Website), we appreciate that you
            are trusting us with your personal information. We take your privacy
            very seriously. In this privacy notice, we seek to explain to you in
            the clearest way possible what information we collect, how we use it
            and what rights you have in relation to it. We hope you take some
            time to read through it carefully, as it is important. If there are
            any terms in this privacy notice that you do not agree with, please
            discontinue use of our Services immediately.
            <br />
            <br />
            This privacy notice applies to all information collected through our
            Services (which, as described above, includes our Website), as well
            as, any related services, sales, marketing or events.
            <br />
            <br />
            <b>
              Please read this privacy notice carefully as it will help you
              understand what we do with the information that we collect.
            </b>
            <br />
            <br />
            <b>TABLE OF CONTENTS</b> <br />
            <br />
            <Link href="#1">1. WHAT INFORMATION DO WE COLLECT?</Link> <br />
            <Link href="#2">2. HOW DO WE USE YOUR INFORMATION?</Link> <br />
            <Link href="#3">
              3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
            </Link>{" "}
            <br />
            <Link href="#4">4. HOW LONG DO WE KEEP YOUR INFORMATION?</Link>{" "}
            <br />
            <Link href="#5">5. HOW DO WE KEEP YOUR INFORMATION SAFE?</Link>{" "}
            <br />
            <Link href="#6">
              6. DO WE COLLECT INFORMATION FROM MINORS?
            </Link>{" "}
            <br />
            <Link href="#7">7. WHAT ARE YOUR PRIVACY RIGHTS?</Link> <br />
            <Link href="#8">8. CONTROLS FOR DO-NOT-TRACK FEATURES</Link> <br />
            <Link href="#9">
              9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            </Link>{" "}
            <br />
            <Link href="#10">10. DO WE MAKE UPDATES TO THIS NOTICE?</Link>{" "}
            <br />
            <Link href="#11">
              11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            </Link>{" "}
            <br />
            <Link href="#12">
              12. HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </Link>{" "}
            <br />
            <br />
          </Typography>
          <div id="1">
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
              <b>1. WHAT INFORMATION DO WE COLLECT?</b>
              <br />
              <br />
              Personal information you disclose to us
              <br />
              <br />
              <b>In Short: </b>
              <i>We collect personal information that you provide to us.</i>
              <br />
              <br />
              We collect personal information that you voluntarily provide to us
              when you express an interest in obtaining information about us or
              our products and Services, when you participate in activities on
              the Website or otherwise when you contact us.
              <br />
              <br />
              The personal information that we collect depends on the context of
              your interactions with us and the Website, the choices you make
              and the products and features you use. The personal information we
              collect may include the following:
              <br />
              <br />
              <ul>
                <li>Personal Information Provided by You.</li>
                <li>Code submissions.</li>
                <li>And other similar information.</li>
              </ul>
              All personal information that you provide to us must be true,
              complete, and accurate, and you must notify us of any changes to
              such personal information. Our website may link to external sites
              that are not operated by us. Please be aware that we have no
              control over the content and practices of these sites, and cannot
              accept responsibility or liability for their respective privacy
              policies.
              <br />
              <br />
            </Typography>
          </div>
          <div id="2">
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
              <b>2. HOW DO WE USE YOUR INFORMATION?</b>
              <br />
              <br />
              <b>Personal information you disclose to us.</b>
              <br />
              <br />
              <b>In Short: </b>
              <i>
                We process your information for purposes based on legitimate
                business interests, the fulfillment of our contract with you,
                compliance with our legal obligations, and/or your consent.
              </i>
              <br />
              <br />
              We use personal information collected via our Website for a
              variety of business purposes described below. We process your
              personal information for these purposes in reliance on our
              legitimate business interests, in order to enter into or perform a
              contract with you, with your consent, and/or for compliance with
              our legal obligations. We indicate the specific processing grounds
              we rely on next to each purpose listed below.
              <br />
              <br />
              We use the information we collect or receive to:
              <ul>
                <li>
                  <b>Fulfill and manage your orders.</b> We may use your
                  information to fulfill and manage your orders, payments,
                  returns, and exchanges made through the Website.
                </li>
                <li>
                  <b>Administer prize draws and competitions.</b> We may use
                  your information to administer prize draws and competitions
                  when you elect to participate in our competition.
                </li>
                <li>
                  <b>
                    To deliver and facilitate delivery of services to the user.
                  </b>{" "}
                  We may use your information to provide you with the requested
                  service.
                </li>
                <li>
                  <b>To respond to user inquiries/offer support to users.</b> We
                  may use your information to respond to your inquiries and
                  solve any potential issues you might have with the use of our
                  Services
                </li>
              </ul>
            </Typography>
          </div>
          <div id="3">
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
              <b>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</b>
              <br />
              <br />
              Edugator is not in the business of selling your information.
              Edugator does not provide, sell, rent or lease your information to
              any third parties. In compliance with FERPA, we do not share any
              personally identifying information or education records publicly
              or with third-parties, except when required to by law or with the
              consent of the student or university.
              <br />
              <br />
            </Typography>
          </div>
          <div id="4">
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
              <b>4. HOW LONG DO WE KEEP YOUR INFORMATION?</b>
              <br />
              <br />
              <b>In Short: </b>
              <i>
                We keep your information for as long as necessary to fulfill the
                purposes outlined in this privacy notice unless otherwise
                required by law.
              </i>
              <br />
              <br />
              We will only keep your personal information for as long as it is
              necessary for the purposes set out in this privacy notice, unless
              a longer retention period is required or permitted by law (such as
              tax, accounting or other legal requirements). No purpose in this
              notice will require us keeping your code submissions for longer
              than 7 days.
              <br />
              <br />
              When we have no ongoing legitimate business need to process your
              personal information, we will either delete or anonymize such
              information, or, if this is not possible (for example, because
              your personal information has been stored in backup archives),
              then we will securely store your personal information and isolate
              it from any further processing until deletion is possible.
              <br />
              <br />
            </Typography>
          </div>
          <div id="5">
            <Typography variant="body1" sx={{ lineHeight: 2 }}>
              <b>5. HOW DO WE KEEP YOUR INFORMATION SAFE?</b>
              <br />
              <br />
              <b>In Short: </b>
              <i>
                We aim to protect your personal information through a system of
                organizational and technical security measures.
              </i>
              <br />
              <br />
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, despite our safeguards and
              efforts to secure your information, no electronic transmission
              over the Internet or information storage technology can be
              guaranteed to be 100% secure, so we cannot promise or guarantee
              that hackers, cybercriminals, or other unauthorized third parties
              will not be able to defeat our security, and improperly collect,
              access, steal, or modify your information. Although we will do our
              best to protect your personal information, transmission of
              personal information to and from our Website is at your own risk.
              You should only access the Website within a secure environment.
              <br />
              <br />
            </Typography>
            <div id="6">
              <Typography variant="body1" sx={{ lineHeight: 2 }}>
                <b>6. DO WE COLLECT INFORMATION FROM MINORS?</b>
                <br />
                <br />
                <b>In Short: </b>
                <i>
                  We do not knowingly collect data from or market to children
                  under 18 years of age.
                </i>
                <br />
                <br />
                We do not knowingly solicit data from or market to children
                under 18 years of age. By using the Website, you represent that
                you are at least 18 or that you are the parent or guardian of
                such a minor and consent to such minor dependent’s use of the
                Website. If you become aware of any data we may have collected
                from children under age 18, please contact us at{" "}
                <Link href="mailto:csinfraweb@gmail.com">
                  csinfraweb@gmail.com
                </Link>
                .
                <br />
                <br />
              </Typography>
            </div>
            <div id="7">
              <Typography variant="body1" sx={{ lineHeight: 2 }}>
                <b>7. WHAT ARE YOUR PRIVACY RIGHTS?</b>
                <br />
                <br />
                <b>In Short: </b>
                <i>
                  You may review, change, or terminate your account at any time.
                </i>
                <br />
                <br />
                If you are a resident in the European Economic Area and you
                believe we are unlawfully processing your personal information,
                you also have the right to complain to your local data
                protection supervisory authority. You can find their contact
                details here:{" "}
                <Link href="https://ec.europa.eu/newsroom/article29/items/612080">
                  https://ec.europa.eu/newsroom/article29/items/612080
                </Link>
                .
                <br />
                <br />
                If you are a resident in Switzerland, the contact details for
                the data protection authorities are available here:{" "}
                <Link href="https://www.edoeb.admin.ch/edoeb/en/home.html">
                  https://www.edoeb.admin.ch/edoeb/en/home.html
                </Link>
                .
                <br />
                <br />
              </Typography>
            </div>
            <div id="8">
              <Typography variant="body1" sx={{ lineHeight: 2 }}>
                <b>8. CONTROLS FOR DO-NOT-TRACK FEATURES</b>
                <br />
                <br />
                Most web browsers and some mobile operating systems and mobile
                applications include a Do-Not-Track ("DNT") feature or setting
                you can activate to signal your privacy preference not to have
                data about your online browsing activities monitored and
                collected. At this stage no uniform technology standard for
                recognizing and implementing DNT signals has been finalized. As
                such, we do not currently respond to DNT browser signals or any
                other mechanism that automatically communicates your choice not
                to be tracked online. If a standard for online tracking is
                adopted that we must follow in the future, we will inform you
                about that practice in a revised version of this privacy notice.
                <br />
                <br />
              </Typography>
            </div>
            <div id="9">
              <Typography variant="body1" sx={{ lineHeight: 2 }}>
                <b>9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</b>
                <br />
                <br />
                <b>In Short: </b>
                <i>
                  Yes, if you are a resident of California, you are granted
                  specific rights regarding access to your personal information.
                </i>
                <br />
                <br />
                California Civil Code Section 1798.83, also known as the "Shine
                The Light" law, permits our users who are California residents
                to request and obtain from us, once a year and free of charge,
                information about categories of personal information (if any) we
                disclosed to third parties for direct marketing purposes and the
                names and addresses of all third parties with which we shared
                personal information in the immediately preceding calendar year.
                If you are a California resident and would like to make such a
                request, please submit your request in writing to us using the
                contact information provided below.
                <br />
                <br />
              </Typography>
            </div>
            <div id="10">
              <Typography variant="body1" sx={{ lineHeight: 2 }}>
                <b>10. DO WE MAKE UPDATES TO THIS NOTICE?</b>
                <br />
                <br />
                <b>In Short: </b>
                <i>
                  Yes, we will update this notice as necessary to stay compliant
                  with relevant laws.
                </i>
                <br />
                <br />
                We may update this privacy notice from time to time. The updated
                version will be indicated by an updated "Revised" date and the
                updated version will be effective as soon as it is accessible.
                If we make material changes to this privacy notice, we may
                notify you either by prominently posting a notice of such
                changes or by directly sending you a notification. We encourage
                you to review this privacy notice frequently to be informed of
                how we are protecting your information.
                <br />
                <br />
              </Typography>
            </div>
            <div id="11">
              <Typography variant="body1" sx={{ lineHeight: 2 }}>
                <b>11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</b>
                <br />
                <br />
                If you have questions or comments about this notice, you may
                email us at{" "}
                <Link href="mailto:csinfraweb@gmail.com">
                  csinfraweb@gmail.com
                </Link>
                .
                <br />
                <br />
              </Typography>
            </div>
            <div id="12">
              <Typography variant="body1" sx={{ lineHeight: 2 }}>
                <b>
                  12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                  FROM YOU?{" "}
                </b>
                <br />
                <br />
                Based on the applicable laws of your country, you may have the
                right to request access to the personal information we collect
                from you, change that information, or delete it in some
                circumstances. To request to review, update, or delete your
                personal information, please submit a request on the above
                contact email. We will respond to your request within 30 days.
                <br />
                <br />
              </Typography>
            </div>
          </div>
        </TextHolder>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyNotice;
