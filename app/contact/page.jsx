"use client";

import Styles from '../../src/CSS/Contact.module.css';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaTimes } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';
// import img from "@/assets/ourstory/animated1.svg";

// --- Next.js Metadata (App Router) ---
// export const metadata = {
//   title: "Contact HKFinance | Expert Accounting & Tax Support",
//   description: "Get in touch with HKFinance for accounting, bookkeeping, audit, tax, and financial reporting services. Our experts help your business thrive.",
//   keywords: "Contact, HKFinance, Accounting, Bookkeeping, Tax, Audit, Financial Reporting, Outsourcing, Services",
//   authors: [{ name: "HKFinance", url: "https://hkfinance.com" }],
//   viewport: "width=device-width, initial-scale=1.0",
//   robots: "index, follow",
//   openGraph: {
//     title: "Contact HKFinance | Expert Accounting & Tax Support",
//     description: "Reach out to HKFinance for professional accounting, tax, audit, and financial reporting services worldwide.",
//     url: "https://hkfinance.com/contact",
//     siteName: "HKFinance",
//     images: [
//       {
//         url: "https://hkfinance.com/assets/og-image.jpg", // Replace with actual OG image
//         width: 1200,
//         height: 630,
//         alt: "HKFinance Contact",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
// };

const Contact = () => {
  const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        country: '',
        hearAbout: '',
        message: '',
    });

    const [isSending, setIsSending] = useState(false);
    const [popup, setPopup] = useState({ show: false, message: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        emailjs
            .send(
                'service_grkzhnb',
                'template_403ma1c',
                formData,
                'NNVn0gx2A7VmlrfvP'
            )
            .then(
                () => {
                    setIsSending(false);
                    setFormData({
                        name: '',
                        email: '',
                        company: '',
                        country: '',
                        hearAbout: '',
                        message: '',
                    });
                    setPopup({
                        show: true,
                        type: 'success',
                        message: 'Your message has been sent successfully. Our team will contact you shortly!',
                    });
                },
                () => {
                    setIsSending(false);
                    setPopup({
                        show: true,
                        type: 'error',
                        message: 'Something went wrong. Please try again later!',
                    });
                }
            );
    };

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
        "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
        "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
        "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia", "Eswatini", "Ethiopia",
        "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
        "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran",
        "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
        "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
        "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mexico", "Moldova", "Monaco",
        "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
        "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama", "Paraguay", "Peru",
        "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia",
        "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden",
        "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
        "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela",
        "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    return (
        <div className={Styles.mainContainer}>
            {/* ✅ Popup Notification */}
            {popup.show && (
                <div className={Styles.popup}>
                    <FaTimes className={Styles.closeIcon} onClick={() => setPopup({ ...popup, show: false })} />
                    <p>{popup.message}</p>
                </div>
            )}

            <div className='container'>
                <div className={Styles.contactHeading}>
                    <h1>Contact Us</h1>
                    <p>
                        We’re here to assist! Whether you’d like to explore our services, discuss a custom accounting solution, or learn how we can empower your business — get in touch with us below.
                    </p>
                </div>

                <div className='row'>
                    {/* LEFT COLUMN – CONTACT FORM */}
                    <div className='col-md-6'>
                        <form onSubmit={handleSubmit}>
                            {/* Row 1 */}
                            <div className='row mb-3'>
                                <div className='col'>
                                    <div className='form-floating'>
                                        <input type='text' className='form-control' id='name' name='name'
                                            placeholder='Your Name' value={formData.name} onChange={handleChange} required />
                                        <label htmlFor='name'>Your Name <span className='text-danger'>*</span></label>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='form-floating'>
                                        <input type='email' className='form-control' id='email' name='email'
                                            placeholder='Your Email' value={formData.email} onChange={handleChange} required />
                                        <label htmlFor='email'>Your Email <span className='text-danger'>*</span></label>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className='row mb-3'>
                                <div className='col'>
                                    <div className='form-floating'>
                                        <input type='text' className='form-control' id='company' name='company'
                                            placeholder='Company Name' value={formData.company} onChange={handleChange} required />
                                        <label htmlFor='company'>Company Name <span className='text-danger'>*</span></label>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='form-floating'>
                                        <select className='form-select' id='country' name='country'
                                            value={formData.country} onChange={handleChange} required>
                                            <option value=''>Select Country</option>
                                            {countries.map((c, i) => (
                                                <option key={i} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        <label htmlFor='country'>Country <span className='text-danger'>*</span></label>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className='row mb-3'>
                                <div className='col'>
                                    <div className='form-floating'>
                                        <select className='form-select' id='hearAbout' name='hearAbout'
                                            value={formData.hearAbout} onChange={handleChange} required>
                                            <option value=''>Select an Option</option>
                                            <option value='Instagram'>Instagram</option>
                                            <option value='Facebook'>Facebook</option>
                                            <option value='Email or Newsletter'>Email or Newsletter</option>
                                            <option value='Search Engine'>Search Engine</option>
                                            <option value='Word of Mouth'>Word of Mouth</option>
                                            <option value='Other'>Other</option>
                                        </select>
                                        <label htmlFor='hearAbout'>How did you hear about us? <span className='text-danger'>*</span></label>
                                    </div>
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className='row mb-3'>
                                <div className='col'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' placeholder='Your Message' id='message' name='message'
                                            style={{ height: '120px' }} value={formData.message} onChange={handleChange} required></textarea>
                                        <label htmlFor='message'>Message <span className='text-danger'>*</span></label>
                                    </div>
                                </div>
                            </div>

                            {/* Send Button */}
                            <div className='text-start'>
                                <button
                                    type='submit'
                                    className='btn px-4 py-2 rounded-pill text-white'
                                    style={{ backgroundColor: '#0B1E3D', border: 'none', width: '100%', textAlign: 'center' }}
                                    disabled={isSending}
                                >
                                    {isSending ? (
                                        <>
                                            <Spinner animation="border" size="sm" />
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>

                            </div>

                            <p className='mt-3 mb-0 text-center'>
                                Or call us at <strong>+1 (675) 678 8343</strong>
                            </p>
                        </form>
                    </div>

                    {/* RIGHT COLUMN */}
                    {/* RIGHT COLUMN */}
                    <div className='col-md-6 d-flex flex-column justify-content-center align-items-center text-center'>
                        <img
                            src='/assets/ourstory/animated1.svg'
                            alt="Contact Illustration"
                            className='img-fluid mb-4'
                            style={{ maxWidth: '250px' }}
                        />

                        <h6 className='mb-3 text-secondary'>
                            Hate filling out forms? Just dive right in then.
                        </h6>

                        <button
                            onClick={() => window.location.href = "https://calendly.com/hkfinances000/30min"}
                            className={"btn"}
                            style={{backgroundColor:'#0B1E3D', color:'#fff'}}
                        >
                            Start Free Trial
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
