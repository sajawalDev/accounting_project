"use client";

import Styles from '../../src/CSS/Contact.module.css';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { FaTimes } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        country: '',
        hearAbout: '',
        message: '',
    });
    const router = useRouter();


    const [isSending, setIsSending] = useState(false);
    const [popup, setPopup] = useState({ show: false, message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setPopup({
                    show: true,
                    type: "success",
                    message: "Your message has been sent successfully. Our team will contact you shortly!",
                });
                setFormData({
                    name: "",
                    email: "",
                    company: "",
                    country: "",
                    hearAbout: "",
                    message: "",
                });
            } else {
                setPopup({
                    show: true,
                    type: "error",
                    message: data.message || "Something went wrong. Please try again later!",
                });
            }
        } catch (err) {
            console.error(err);
            setPopup({
                show: true,
                type: "error",
                message: "Failed to send message. Please try again later!",
            });
        } finally {
            setIsSending(false);
        }
    };



    const handleStartFreeTrial = () => {
        const stored = localStorage.getItem("meetingData");
        if (stored) {
            // Meeting already booked
            router.push("/meeting-confirmation");
        } else {
            router.push("/book-meeting");
        }
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
                    <div className='col-md-6'>
                        <form onSubmit={handleSubmit}>
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

                            <div className='row mb-3'>
                                <div className='col'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' placeholder='Your Message' id='message' name='message'
                                            style={{ height: '120px' }} value={formData.message} onChange={handleChange} required></textarea>
                                        <label htmlFor='message'>Message <span className='text-danger'>*</span></label>
                                    </div>
                                </div>
                            </div>

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
                                Or call us at <strong><a
                                    href="https://wa.me/923214575096"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-dark text-decoration-none fw-bold"
                                >
                                    +92 321 4575096
                                </a>
                                </strong>
                            </p>
                        </form>
                    </div>

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
                            onClick={handleStartFreeTrial}
                            className="btn"
                            style={{ backgroundColor: "#0B1E3D", color: "#fff" }}
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
