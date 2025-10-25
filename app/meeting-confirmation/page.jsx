"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MeetingConfirmation() {
  const router = useRouter();
  const [remaining, setRemaining] = useState({});
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("hakf_booking");
    if (!stored) {
      router.push("/book-meeting");
      return;
    }

    const { endUTC } = JSON.parse(stored);
    const meetingTime = new Date(endUTC).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = meetingTime - now;

      if (diff <= 0) {
        localStorage.removeItem("meetingData");
        setExpired(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [router]);

  if (expired) {
    return (
      <div className="container text-center py-5">
        <h1>Your meeting time has passed</h1>
        <button
          className="btn btn-dark mt-3"
          onClick={() => router.push("/book-meeting")}
        >
          Book Another Meeting
        </button>
      </div>
    );
  }

  return (
    <div className="container text-center py-5">
      <h1>Your Meeting is Confirmed! 🎉</h1>
      <p className="text-secondary mb-4">
        We’re looking forward to seeing you. Here’s your countdown:
      </p>
      <h2>
        {remaining.days}d : {remaining.hours}h : {remaining.minutes}m :{" "}
        {remaining.seconds}s
      </h2>
      <p className="mt-3 text-muted">See you soon </p>
    </div>
  );
}
