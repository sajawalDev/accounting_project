"use client";
import "../../src/CSS/bookMeeting.module.css";
import { useState, useEffect, useMemo } from "react";
import { Button, Form, Placeholder, Spinner } from "react-bootstrap";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { DateTime } from "luxon";
import { Formik } from "formik";

const timezonesByRegion = {
  Africa: ["Africa/Cairo", "Africa/Lagos", "Africa/Nairobi"],
  America: [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Sao_Paulo",
  ],
  Asia: [
    "Asia/Karachi",
    "Asia/Dubai",
    "Asia/Kolkata",
    "Asia/Bangkok",
    "Asia/Singapore",
    "Asia/Tokyo",
  ],
  Europe: ["Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Moscow"],
  Australia: ["Australia/Sydney", "Australia/Melbourne"],
};

const LOCAL_STORAGE_KEY = "hakf_booking";

export default function BookMeeting() {
  const [step, setStep] = useState(1);
  const [timezone, setTimezone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // ---------- Responsive detection ----------
  useEffect(() => {
    const check = () => setIsMobile(typeof window !== "undefined" ? window.innerWidth <= 768 : false);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ---------- Existing effects ----------
  useEffect(() => {
    (async () => {
      try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!raw) return;

        const parsed = JSON.parse(raw);
        const { email, endUTC } = parsed || {};

        if (!email || !endUTC) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          return;
        }

        const now = DateTime.now();
        const end = DateTime.fromISO(endUTC);

        if (end <= now) {
          try {
            await fetch("/api/bookings/delete-expired", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
          } catch (err) {
            console.warn("Failed to delete expired booking:", err);
          } finally {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
        } else {
          window.location.href = "/meeting-confirmation";
        }
      } catch (err) {
        console.warn("LocalStorage parse error:", err);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    })();
  }, []);

  useEffect(() => {
    const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(localZone);

    const allZones = Object.values(timezonesByRegion).flat();
    if (!allZones.includes(localZone)) {
      timezonesByRegion["Detected"] = [localZone];
    }
  }, []);

  useEffect(() => {
    if (!timezone) return;
    const updateTime = () => {
      const time = DateTime.now().setZone(timezone).toFormat("hh:mm a");
      setCurrentTimeDisplay(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  useEffect(() => {
    if (!timezone) return;
    const today = DateTime.now().setZone(timezone).toISODate();
    setSelectedDate(today);
    const dt = DateTime.fromISO(today, { zone: timezone });
    setMonth(dt.month - 1);
    setYear(dt.year);
  }, [timezone]);

  useEffect(() => {
    if (!selectedDate || !timezone) return;

    async function fetchSlots() {
      try {
        setLoadingSlots(true);

        // Compare local Pakistan date (Asia/Karachi) and selected timezone's date
        const localNow = DateTime.now().setZone("Asia/Karachi");
        const targetNow = DateTime.now().setZone(timezone);

        // if the target timezone's *current day* is behind Pakistan (e.g., London still 25th while PK is 26th)
        if (targetNow.startOf("day") < localNow.startOf("day")) {
          setAvailableSlots([]); // show "No slots available"
          setLoadingSlots(false);
          return;
        }

        const res = await fetch(`/api/availability?date=${selectedDate}&tz=${timezone}`);
        const data = await res.json();
        const rawSlots = data.slots || [];

        const nowInTZ = DateTime.now().setZone(timezone);
        const isSelectedToday = DateTime.fromISO(selectedDate, { zone: timezone }).hasSame(nowInTZ, "day");

        const filtered = rawSlots.filter((slot) => {
          try {
            const dt = DateTime.fromFormat(`${selectedDate} ${slot.display}`, "yyyy-MM-dd h:mm a", { zone: timezone });
            if (!dt.isValid) return true;
            if (!isSelectedToday) return true;
            return dt > nowInTZ;
          } catch (e) {
            return true;
          }
        });

        setAvailableSlots(filtered);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    }

    fetchSlots();
  }, [selectedDate, timezone]);

  // ---------- Calendar helpers ----------
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const emptySlots = Array(firstDayIndex).fill(null);
  const allDays = [...emptySlots, ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const currentDateInTZ = useMemo(() => {
    if (!timezone) return null;
    return DateTime.now().setZone(timezone);
  }, [timezone]);

  const canGoPrev = useMemo(() => {
    if (!currentDateInTZ) return true;
    const currentMonthIndex = currentDateInTZ.month - 1;
    const currentYear = currentDateInTZ.year;
    if (year > currentYear) return true;
    if (year === currentYear && month > currentMonthIndex) return true;
    return false;
  }, [month, year, currentDateInTZ]);

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else setMonth((prev) => prev - 1);
  };
  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else setMonth((prev) => prev + 1);
  };

  const handlePickDay = (day) => {
    if (!timezone) return;
    const dt = DateTime.fromObject({ year, month: month + 1, day }, { zone: timezone });
    if (dt < currentDateInTZ.startOf("day")) return;
    const isoDate = dt.toISODate();
    setSelectedDate(isoDate);
    setSelectedTime("");
  };

  const dayState = (d) => {
    if (!timezone || d == null) return "empty";
    const dt = DateTime.fromObject({ year, month: month + 1, day: d }, { zone: timezone });
    if (dt < currentDateInTZ.startOf("day")) return "past";
    if (dt.hasSame(currentDateInTZ, "day")) return "today";
    return "future";
  };

  // ---------- Validation & submit (kept same) ----------
  const validateForm = (values) => {
    const errors = {};
    if (!values.name || values.name.trim().length < 2) errors.name = "Please enter your name (2+ chars).";

    if (!values.email) {
      errors.email = "Email is required.";
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(values.email)) errors.email = "Please enter a valid email.";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required.";
    } else {
      const digits = values.phone.replace(/[^\d]/g, "");
      if (digits.length < 7) errors.phone = "Enter a valid phone number (7+ digits).";
    }

    if (!values.company) errors.company = "Company is required.";
    if (!values.website) {
      errors.website = "Website is required.";
    } else {
      try {
        const url = new URL(values.website.startsWith("http") ? values.website : `https://${values.website}`);
        if (!url.hostname) errors.website = "Please enter a valid website.";
      } catch (e) {
        errors.website = "Please enter a valid website URL.";
      }
    }

    if (!values.message || values.message.trim().length < 5) errors.message = "Please add a short message (5+ chars).";

    if (!selectedDate) errors._date = "Please pick a date.";
    if (!selectedTime) errors._time = "Please pick a time.";

    return errors;
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitAttempted(true);
    const errs = validateForm(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setSubmitting(false);
      return;
    }

    setSubmitting(true);

    try {
      const localDateTime = DateTime.fromFormat(
        `${selectedDate} ${selectedTime}`,
        "yyyy-MM-dd h:mm a",
        { zone: timezone }
      );
      const startUTC = localDateTime.toUTC().toISO();
      const endUTC = localDateTime.plus({ minutes: 30 }).toUTC().toISO();

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startUTC, endUTC, timezone }),
      });

      const data = await res.json();

      if (data && data.success) {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ email: values.email, endUTC }));
        } catch (e) {
          console.warn("Could not write localStorage", e);
        }

        window.location.href = "/meeting-confirmation";
      } else {
        setSubmitting(false);
        setErrors({ _server: data.error || "Booking failed. Please try again." });
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      setSubmitting(false);
      setErrors({ _server: "Server error occurred. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- Inline responsive styles ----------
  const containerStyle = {
    width: "90vw",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    background: "#fff",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 84,
  };

  const leftStyle = {
    width: "100%",
    maxWidth: isMobile ? "100%" : 400,
    padding: isMobile ? "2rem 1rem" : "3rem 2.5rem",
    backgroundColor: "#0B1E3D",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: isMobile ? "center" : "left",
  };

  const rightStyle = {
    width: "100%",
    padding: isMobile ? "1rem" : "1.5rem",
    flexGrow: 1,
  };

  const calendarAndTimesStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: 16,
  };

  const calendarColStyle = {
    width: "100%",
    maxWidth: isMobile ? "100%" : "60%",
    boxSizing: "border-box",
  };

  const availableTimesStyle = {
    width: "100%",
    maxWidth: isMobile ? "100%" : "40%",
    padding: 12,
    background: "#fff",
    color: "#0B1E3D",
    borderRadius: 10,
    maxHeight: 400,
    overflowY: "auto",
    boxSizing: "border-box",
    borderLeft: isMobile ? "none" : "1px solid rgba(0,0,0,0.06)",
    marginTop: isMobile ? 12 : 0,
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f9f9f9" }}
    >
      <div style={containerStyle} className="booking-container">
        {/* LEFT PANEL */}
        <div className="booking-left" style={leftStyle}>
          <h2 className="mb-3" style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: isMobile ? "center" : "flex-start" }}>
            1-week Free Trial 
          </h2>
          <p style={{ marginBottom: 8 }}>Book your consultation with HAKFinancials.</p>
          <p className="mt-4" style={{ marginTop: 12 }}>
            If you can't find slots available, please email us at <br /> <br />Hakfinancials@gmail.com
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="booking-right" style={rightStyle}>
          {step === 1 ? (
            <div style={calendarAndTimesStyle} className="calendar-and-times">

              {/* Calendar */}
              <div style={calendarColStyle}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handlePrevMonth}
                    disabled={!canGoPrev}
                    style={{ opacity: !canGoPrev ? 0.4 : 1, pointerEvents: !canGoPrev ? "none" : "auto" }}
                  >
                    <FaChevronLeft />
                  </Button>

                  <h5 className="text-center mb-0">
                    {monthNames[month]} {year}
                  </h5>

                  <Button variant="outline-secondary" size="sm" onClick={handleNextMonth}>
                    <FaChevronRight />
                  </Button>
                </div>

                {/* Weekdays */}
                <div className="d-flex justify-content-between text-center mb-2" style={{ fontWeight: 600 }}>
                  {weekdays.map((d) => (
                    <div key={d} style={{ width: "13%", fontSize: "0.9rem" }}>{d}</div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="d-flex flex-wrap" style={{ gap: "0.4rem" }}>
                  {allDays.map((day, i) =>
                    day ? (
                      (() => {
                        const state = dayState(day);
                        const isSelected = selectedDate && selectedDate.endsWith(`-${String(day).padStart(2, "0")}`);
                        const baseStyle = {
                          width: "13%",
                          padding: "0.5rem 0",
                          fontSize: "0.9rem",
                          borderRadius: "6px",
                          cursor: state === "past" ? "not-allowed" : "pointer",
                          fontWeight: state === "future" ? 700 : 500,
                        };
                        let className = "btn ";
                        let inline = { ...baseStyle };

                        if (state === "past") {
                          className += "btn-light text-muted";
                          inline.background = "#f3f3f3";
                          inline.color = "#b5b5b5";
                        } else if (state === "today") {
                          className += "btn-primary text-white";
                          inline.background = "#0B1E3D";
                          inline.color = "#fff";
                          inline.border = "2px solid #0B1E3D";
                        } else {
                          className += "btn-outline-dark";
                          inline.background = "#ffffff";
                          inline.color = "#0B1E3D";
                          inline.border = "1px solid rgba(11,30,61,0.08)";
                        }

                        if (isSelected) {
                          className = "btn btn-primary text-white";
                          inline.background = "#0B1E3D";
                          inline.color = "#fff";
                        }

                        return (
                          <button
                            key={i}
                            className={className}
                            style={inline}
                            onClick={() => handlePickDay(day)}
                            disabled={state === "past"}
                          >
                            {day}
                          </button>
                        );
                      })()
                    ) : (
                      <div key={i} style={{ width: "13%" }}></div>
                    )
                  )}
                </div>

                <Form.Group className="mt-3">
                  <div className="position-relative">
                    <Form.Select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      style={{
                        paddingLeft: "2.2rem",
                        paddingRight: "8rem",
                        fontWeight: 500,
                      }}
                    >
                      {Object.entries(timezonesByRegion).map(([region, zones]) => (
                        <optgroup key={region} label={region}>
                          {zones.map((tz) => (
                            <option key={tz} value={tz}>
                              {tz.replace("_", " ").split("/").join(" / ")}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Form.Select>

                    <i
                      className="fa-solid fa-earth-americas  position-absolute"
                      style={{
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        color: "#0B1E3D"
                      }}
                    ></i>

                    <span
                      className="position-absolute text-muted fw-semibold"
                      style={{
                        top: "50%",
                        right: "12px",
                        transform: "translateY(-50%)",
                        fontFamily: "monospace",
                        fontSize: "0.95rem",
                      }}
                    >
                      {currentTimeDisplay}
                    </span>
                  </div>
                </Form.Group>
              </div>

              {/* Available Times */}
              <div className="available-times" style={availableTimesStyle}>
                <h6 className="text-center mb-3">Available Times</h6>

                {loadingSlots ? (
                  [...Array(6)].map((_, i) => (
                    <Placeholder.Button
                      key={i}
                      variant="secondary"
                      animation="wave"
                      className="w-100 mb-2"
                      style={{ height: "38px" }}
                    />
                  ))
                ) : availableSlots.length === 0 ? (
                  <p className="text-center text-dark opacity-75">No slots available</p>
                ) : (
                  availableSlots.map((slot, i) => (
                    <div key={i} className="mb-2">
                      <Button
                        className={`w-100 d-flex justify-content-between align-items-center ${selectedTime === slot.display ? "btn-success" : "btn-outline-light"}`}
                        onClick={() => {
                          setSelectedTime(slot.display);
                          if (selectedTime === slot.display) {
                            setStep(2);
                          }
                        }}
                        style={{
                          background: selectedTime === slot.display ? "#0B1E3D" : "#0B1E3D",
                          borderColor: "#fff",
                          color: "#fff",
                          width: "100%",
                        }}
                      >
                        <span>{slot.display}</span>

                        {selectedTime === slot.display && (
                          <span
                            className=" fw-semibold"
                            style={{
                              marginLeft: "auto",
                              cursor: "pointer",
                              background: "#fff",
                              color: "#0B1E3D",
                              padding: "4px 10px",
                              borderRadius: "6px",
                            }}
                          >
                            Next <i className="fa-solid fa-arrow-right-long"></i>
                          </span>
                        )}
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            // Step 2: Formik Form
            <div className="p-4" style={{ width: "100%" }}>
              <h4 className="mb-4 text-center">Enter Your Details</h4>

              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  company: "",
                  website: "",
                  phone: "",
                  message: "",
                }}
                validate={validateForm}
                onSubmit={onSubmit}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ values, handleChange, handleSubmit, isSubmitting, errors }) => {
                  if (isSubmitting) {
                    return (
                      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 220 }}>
                        <Spinner animation="border" role="status" />
                        <div className="mt-3">Scheduling your meeting... please wait</div>
                      </div>
                    );
                  }

                  return (
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitAttempted(true);
                        handleSubmit(e);
                      }}
                    >
                      {errors._server && (
                        <div className="alert alert-danger">{errors._server}</div>
                      )}

                      {["name", "email", "company", "website", "phone", "message"].map((field) => (
                        <Form.Group key={field} className="mb-3">
                          <Form.Label>
                            <span style={{ color: "red" }}>*</span>{" "}
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </Form.Label>

                          {field === "message" ? (
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name={field}
                              value={values[field]}
                              onChange={handleChange}
                              isInvalid={submitAttempted && !!errors[field]}
                            />
                          ) : field === "phone" ? (
                            <div
                              className="d-flex align-items-center border rounded px-2 py-1"
                              style={{
                                background: "#fff",
                                borderColor: submitAttempted && errors[field] ? "red" : "#ced4da",
                              }}
                            >
                              <Form.Control
                                type="tel"
                                name={field}
                                value={values[field]}
                                onChange={handleChange}
                                placeholder="your watsapp number"
                                isInvalid={submitAttempted && !!errors[field]}
                                className="border-0 flex-grow-1"
                                style={{ boxShadow: "none" }}
                              />
                            </div>
                          ) : (
                            <Form.Control
                              type={field === "email" ? "email" : "text"}
                              name={field}
                              value={values[field]}
                              onChange={handleChange}
                              isInvalid={submitAttempted && !!errors[field]}
                            />
                          )}

                          {submitAttempted && errors[field] && (
                            <Form.Control.Feedback type="invalid">
                              {errors[field]}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      ))}

                      {submitAttempted && errors._date && (
                        <div className="text-danger mb-2">{errors._date}</div>
                      )}
                      {submitAttempted && errors._time && (
                        <div className="text-danger mb-2">{errors._time}</div>
                      )}

                      <div className="d-flex justify-content-between mt-4">
                        <Button variant="secondary" onClick={() => setStep(1)}>
                          ← Back
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={isSubmitting}
                          style={{ background: "#0B1E3D", borderColor: "#0B1E3D" }}
                        >
                          Schedule Meeting
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
