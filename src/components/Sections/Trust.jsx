'use client';

import Styles from '../../CSS/Trust.module.css';

const Trust = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-between">
        <div className="col-lg-3 col-md-4 col-6">
          <div className={Styles.Tbox}>
            <i className="fa-solid fa-shield-halved"></i>
            <span className='ms-2'>ACCA Certified</span>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 col-6">
          <div className={Styles.Tbox}>
            <i className="fa-solid fa-coins"></i>
            <span className='ms-2'>60% More Affordable</span>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 col-6">
          <div className={Styles.Tbox}>
            <i className="fa-solid fa-circle-user"></i>
            <span className='ms-2'>Dedicated Account Manager</span>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 col-6">
          <div className={Styles.Tbox}>
            <i className="fa-solid fa-chart-simple"></i>
            <span className='ms-2'>Scale Easy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trust;
