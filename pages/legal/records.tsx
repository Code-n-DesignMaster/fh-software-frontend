import Head from 'next/head';
import { Layout } from 'antd';

const CustodianOfRecords = () => (
  <>
    <Head>
      <title>HoneyDrip | Custodian of records</title>
    </Head>
    <Layout>
      <Layout.Content>
        <div className="main-container">
          <div className="page-container legal">
            <div className="page-heading">
              CUSTODIAN OF RECORDS U.S.C. TITLE 18, SECTION 2257 COMPLIANCE
            </div>
            <div className="page-content">
              <p>
                18 U.S.C. § 2257
                <br />
                Statement Any actual human beings depicted in images or videos
                appearing on the website located at www.honeydrip.com (the{' '}
                <b>&quot;</b>) were at least 18-years old at the time those
                images or videos were produced.
              </p>
              <p>
                <b>Exemption: Content Produced by Third Parties</b>
              </p>
              <p>
                The operator of the Website is not the "producer" of any
                depictions of actual or simulated sexually explicit conduct that
                may appear on the Website. The operator of the Website limits
                its handling of this content, and only performs the activities
                of transmission, storage, retrieval, hosting, or formatting of
                material that may depict sexually explicit conduct, all of which
                material appears on the Website as the result of actions taken
                by third-party users of the Website. All parts of the Website
                that contain user-generated material are under the control of
                the relevant user, for whom the Website is provided as an online
                service by the operator. In accordance with 18 U.S.C. §
                2257(h)(2)(B)(v) and 47 U.S.C. § 230(c), the operator of the
                Website may delete materials appearing on the Website as the
                result of actions taken by the Website’s users, which materials
                are considered, in the operator’s sole discretion, to be
                indecent, obscene, defamatory, or inconsistent with the policies
                and terms of use for the Website.
              </p>
              <p>
                <b>Exemption: Content Produced by Website Operator</b>
              </p>
              <p>
                To the extent that any images or videos appear on the Website,
                for which the operator of the Website may be considered the
                "producer," those images and videos are exempt from the
                requirements of 18 U.S.C. § 2257 and 28 C.F.R. Part 75 for one
                or more of the following reasons: (1) the produced images or
                videos do not portray any sexually explicit conduct defined in
                18 U.S.C. § 2256(2)(A); (2) the produced images or videos do not
                portray depictions of the genitals or pubic area created after
                July 27, 2006; (3) the produced images or videos do not portray
                simulated sexually explicit activity occurring after the
                effective date of 18 U.S.C. § 2257A; or (4) the produced images
                or videos were created before July 3, 1995.
              </p>
              <p>
                <b>Designated Records Custodian</b>
              </p>
              <p>
                Without limiting in any way the applicability of the
                above-stated exemptions, the operator of the Website has
                designated the custodian, whose address appears below, to be the
                keeper of original records described in 18 U.S.C. § 2257 and 28
                C.F.R. Part 75 for all materials appearing on the Website that
                fall in the following categories: (1) marketing and advertising
                materials that contain visual depictions of actual or simulated
                sexually explicit conduct, which materials have been acquired or
                created by the Website’s operator to promote the Website; or (2)
                materials that are not exempt, as described above.
              </p>
              <p>
                The named earlier records and their custodian can be found at
                the following location:
              </p>
              <p>
                <b>Custodian of Records:</b>
              </p>
              <p>201 Santa Monica Blvd., Suite 300, Santa Monica, CA 90401</p>
            </div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  </>
);

CustodianOfRecords.authenticate = false;

export default CustodianOfRecords;
