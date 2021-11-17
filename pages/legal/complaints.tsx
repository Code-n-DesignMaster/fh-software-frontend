import Head from 'next/head';
import Link from 'next/link';
import { Layout } from 'antd';

const ComplaintsPolicy = () => (
  <>
    <Head>
      <title>HoneyDrip | Complaints policy</title>
    </Head>
    <Layout>
      <Layout.Content>
        <div className="main-container">
          <div className="page-container legal">
            <div className="page-heading">HONEY DRIP COMPLAINTS POLICY</div>
            <div className="page-content">
              <ol className="decimal-list">
                <li>
                  <u>Your Agreement with Us</u>: The following is a statement of
                  the Complaints Policy that applies to use of the HoneyDrip
                  platform. However, people who are not a HoneyDrip User may
                  also notify us of a complaint with regard to HoneyDrip in
                  accordance with the terms set forth in this statement.
                </li>
                <li>
                  <u>Definition of Terms</u>: The defined terms in the 
                  <Link href="/legal/terms#general">
                    <a>Terms of Service for all Users</a>
                  </Link>{' '}
                  have the same meaning in this statement of our Complaints
                  Policy.
                </li>
                <li>
                  <u>Making a Complaint about HoneyDrip:</u>
                  <ol className="alpha-list">
                    <li>
                      If you have a complaint about Content on HoneyDrip or the
                      conduct of a User, you should send your complaint
                      to support@honeydrip.com.
                    </li>
                    <li>
                      If you are unable to email us your complaint, you can mail
                      your complaint to West of Hudson Group (“WHG”), the
                      company that operates HoneyDrip, at the following address:
                      West Hackensack Avenue, Suite 301, Hackensack, New Jersey,
                      07601.
                    </li>
                    <li>
                      Please include the following information when you contact
                      us with a complaint:  your name, address, contact details,
                      the nature of your complaint and, if your complaint
                      relates to Content, the URL for the Content to which your
                      complaint relates.
                    </li>
                  </ol>
                </li>
                <li>
                  <u>How We Process Your Complaint: </u>
                  <ol className="alpha-list">
                    <li>
                      Once we receive your complaint, we will investigate within
                      a reasonable time period which will depend on the
                      description of the offense that you provide, the scope of
                      the problem and other factors reasonably affecting our
                      investigation.
                    </li>
                    <li>
                      We will contact you if we need further information or
                      documents from you.
                    </li>
                    <li>
                      Once we have sufficient information to determine the
                      validity of your complaint, we will take the appropriate
                      actions to address the issue your complaint has raised.
                    </li>
                    <li>
                      If we determine that your complaint is about Content which
                      appears on HoneyDrip that is unlawful or otherwise does
                      not comply with our 
                      <Link href="/legal/acceptable-use">
                        <a>Acceptable Use Policy</a>
                      </Link>
                      , we will remove such Content as quickly as reasonably
                      possible.
                    </li>
                    <li>
                      Please note that we may, but are not obligated to, inform
                      you of the outcome of your complaint.
                    </li>
                  </ol>
                </li>
                <li>
                  <u>Unfounded or Harassing Complaints</u>: By agreeing to the
                  HoneyDrip Terms of Service and the other Terms incorporated
                  therein, you are entering into a legally binding agreement
                  with WHG. One of the terms of your agreement with WHG as a
                  HoneyDrip User is that you will not make any complaint to us
                  under this Complaints Policy which you reasonably know not to
                  be a valid complaint or which you have made with the intent to
                  harass or otherwise cause trouble for another User or any
                  other individual. If we determine that you have made in
                  complaint in bad faith or without justification, we may in our
                  sole discretion decide to suspend or terminate your User
                  account.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  </>
);

ComplaintsPolicy.authenticate = false;

export default ComplaintsPolicy;
