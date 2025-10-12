// app/case-studies/page.jsx
"use client";

import Styles from "../../src/CSS/CaseStudies.module.css";
import caseStudies from "../Resources/CaseStudiesData"; // adjust path if needed
import Link from "next/link";

const CaseStudiesPage = () => {
  return (
    <div className={Styles.mainContainer}>
      <div className="container">
        <div className="row">
          {caseStudies.map((cs) => (
            <div className="col-lg-4 col-md-6" key={cs.id}>
              <Link href={`/case-study/${cs.slug}`} className={Styles.cardLink}>
                <div className={Styles.caseCard}>
                  <div
                    className={Styles.caseImage}
                    style={{ backgroundImage: `url(${cs.image})` }}
                  />
                  <h3 className={Styles.caseTitle}>{cs.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesPage;
