import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VerticalNavigation from "../../shared/VerticalNavigation";
import { RootState } from "../../app/common/store";
import { requestModulesAndProblems } from "../CodeEditor/CodeEditorSlice";
import { useParams, useLocation } from "react-router-dom";
import { adminPathRegex, colors } from "../../shared/constants";
import { styled } from '@mui/styles'
import theme from "../../shared/theme";
import { Typography } from '@mui/material';
import Footer from '../../shared/Footer';

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
  background: 'linear-gradient(transparent, transparent, transparent, transparent, #f1f1f11a, #f1f1f129, #f1f1f1da), url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)',
  backgroundImage: 'url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)',
  backgroundSize: "35em",
  mozWindowShadow: 'inset 0 -10px 10px -10px #0000001a',
  webkitBoxShadow: 'inset 0 -10px 10px -10px #0000001a',
  boxShadow: 'inset 0 -10px 10px -10px #0000001a',
});

const TextHolder = styled('div')({
    width: '70%',
    maxWidth: "1400px",
    padding: 30,
    textAlign: 'left',
    backgroundColor: 'white',
    [theme.breakpoints.down("md")]: {
        width: '100%'
      },
})

const Link = styled('a')({
    color: 'black',
    textDecoration: 'none'
})

function PrivacyNotice() {
    const modules = useSelector((state: RootState) => {
        const sortedModules = state.codeEditor.navStructure;
        return sortedModules.map((value) => value.name);
    });
    const dispatch = useDispatch();
    const locationState = useLocation<ProblemLocationState>();

    useEffect(() => {
        dispatch(
          requestModulesAndProblems({
            isAdmin: adminPathRegex.test(locationState.pathname),
          })
        );
        //disable exhaustive dependencies
        //eslint-disable-next-line
    }, [dispatch]);

  return (
    <>
    <div id="top"/>
    <VerticalNavigation
        light={true}
        modules={modules}
        codingPage={false}
    />
    <TitleHolder>
        <div>
            <Typography variant="h2">
              PRIVACY NOTICE
            </Typography>
            <Typography variant="body1" sx={{fontWeight: 400, color: '#999999'}}>
              Last Updated January 31, 2021
            </Typography>
        </div>
    </TitleHolder>
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    }}>
        <TextHolder>
            <Typography variant="body1" sx={{lineHeight: 2}}>
                <b>INTRODUCTION</b>
                <br/>
                <br/>
                Thank you for choosing to be part of our community at Edugator ("<b>Company</b>", "<b>we</b>", "<b>us</b>", "<b>our</b>"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at csinfraweb@gmail.com
                <br/>
                <br/>
                When you visit our website https://edugator.app/ (the "<b>Website</b>"), and more generally, use any of our services (the "<b>Services</b>", which include the Website), we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.
                <br/>
                <br/>
                This privacy notice applies to all information collected through our Services (which, as described above, includes our Website), as well as, any related services, sales, marketing or events.
                <br/>
                <br/>
                Please read this privacy notice carefully as it will help you understand what we do with the information that we collect.
                <br/>
                <br/>
                <b>TABLE OF CONTENTS</b> <br/><br/>
                <Link href='#1'>1. WHAT INFORMATION DO WE COLLECT?</Link> <br/>
                <Link href='#2'>2. HOW DO WE USE YOUR INFORMATION?</Link> <br/>
                <Link href='#3'>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</Link> <br/>
                <Link href='#4'>4. HOW LONG DO WE KEEP YOUR INFORMATION?</Link> <br/>
                <Link href='#5'>5. HOW DO WE KEEP YOUR INFORMATION SAFE?</Link> <br/>
                <Link href='#6'>6. DO WE COLLECT INFORMATION FROM MINORS?</Link> <br/>
                <Link href='#7'>7. WHAT ARE YOUR PRIVACY RIGHTS?</Link> <br/>
                <Link href='#8'>8. CONTROLS FOR DO-NOT-TRACK FEATURES</Link> <br/>
                <Link href='#9'>9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</Link> <br/>
                <Link href='#10'>10. DO WE MAKE UPDATES TO THIS NOTICE?</Link> <br/>
                <Link href='#11'>11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Link> <br/>
                <Link href='#12'>12. HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?</Link> <br/><br/>
            </Typography>
            <div id="1">
                <Typography variant="body1" sx={{lineHeight: 2}}>
                    <b>1. WHAT INFORMATION DO WE COLLECT?</b>
                    <br/>
                    <br/>
                    Personal information you disclose to us
                    <br/>
                    <br/>
                    <b><span style={{color: '#707070'}}>In Short: </span></b><i>We collect personal information that you provide to us.</i>
                    <br/>
                    <br/>
                    We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.
                    <br/>
                    <br/>
                    The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect may include the following:
                    <br/>
                    <br/>
                    <b><span style={{color: '#707070'}}>Personal information provided by you.</span></b> We collect code submissions; and other similar information.
                    <br/>
                    <br/>
                    All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.
                    <br/><br/>
                </Typography>
            </div>
            <div id="2">
                <Typography variant="body1" sx={{lineHeight: 2}}>
                    <b>2. HOW DO WE USE YOUR INFORMATION?</b>
                    <br/>
                    <br/>
                    Personal information you disclose to us
                    <br/>
                    <br/>
                    <b><span style={{color: '#707070'}}>In Short: </span></b><i>We process your information for purposes based on legitimate business interests, thefulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</i>
                    <br/>
                    <br/>
                    We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
                    <br/>
                    <br/>
                    We use the information we collect or receive to:
                    <ul>
                        <li>
                            <b><span style={{color: '#707070'}}>Fulfill and manage your orders.</span></b> We may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the Website.
                        </li>
                        <li>
                            <b><span style={{color: '#707070'}}>Administer prize draws and competitions.</span></b> We may use your information to administer prize draws and competitions when you elect to participate in our competition.
                        </li>
                        <li>
                            <b><span style={{color: '#707070'}}>To deliver and facilitate delivery of services to the user.</span></b> We may use your information to provide you with the requested service.
                        </li>
                        <li>
                            <b><span style={{color: '#707070'}}>To respond to user inquiries/offer support to users.</span></b> We may use your information to respond to your inquiries and solve any potential issues you might have with the use of our Services
                        </li>
                    </ul>
                </Typography>
            </div>
            <div id="3">
                <Typography variant="body1" sx={{lineHeight: 2}}>
                    <b>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</b>
                    <br/>
                    <br/>
                    <b><span style={{color: '#707070'}}>In Short: </span></b><i>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</i>
                    <br/>
                    <br/>
                    We may process or share your data that we hold based on the following legal basis:
                    <ul>
                        <li>
                            <b><span style={{color: '#707070'}}>Consent:</span></b> We may process your data if you have given us specific consent to use your personal information for a specific purpose.
                        </li>
                        <li>
                            <b><span style={{color: '#707070'}}>Legitimate Interests:</span></b> We may process your data when it is reasonably necessary to achieve our legitimate business interests
                        </li>
                        <li>
                            <b><span style={{color: '#707070'}}>Performance of a Contract:</span></b> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.
                        </li>
                        <li>
                            <b><span style={{color: '#707070'}}>Legal Obligations:</span></b> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).
                        </li>
                        <li>
                            <b><span style={{color: '#707070'}}>Vital Interests:</span></b> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                        </li>
                    </ul>
                    More specifically, we may need to process your data or share your personal information in the following situations:
                    <ul>
                        <li>
                            <b><span style={{color: '#707070'}}>Business Transfers:</span></b> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                        </li>
                    </ul>
                </Typography>
            </div>
        </TextHolder>
    </div>
    <Footer />
    </>
  )
}

export default PrivacyNotice;
