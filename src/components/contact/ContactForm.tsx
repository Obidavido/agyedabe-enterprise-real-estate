"use client";

import { FormEvent, useState } from "react";

const enquiryTypes = ["Property sale", "Property rental", "Building consultancy", "Build and sell", "Build and rent", "Viewing enquiry", "Other"];

export default function ContactForm({ initialReference = "" }: { initialReference?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError("");
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="contact-form-card">
      {submitted ? (
        <div className="form-success" role="status" aria-live="polite">
          <span className="success-mark" aria-hidden="true">✓</span>
          <h2>Demo confirmation</h2>
          <p>Your form is working, but this presentation demo is not connected to an enquiry backend. Your message has <strong>not</strong> been sent or stored. Connect a real backend before production.</p>
          <button className="button-primary" type="button" onClick={() => setSubmitted(false)}>Send another demo enquiry</button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-intro"><p className="section-kicker">Send a message</p><h2>How can we help?</h2><p>Share a few details. This demo form only displays a local confirmation.</p></div>
          <div className="form-grid">
            <label className="form-field"><span>Name <b aria-hidden="true">*</b></span><input className="field-control" name="name" autoComplete="name" required /></label>
            <label className="form-field"><span>Email <b aria-hidden="true">*</b></span><input className="field-control" name="email" type="email" autoComplete="email" required aria-describedby={emailError ? "email-error" : undefined} />{emailError && <small id="email-error" className="field-error" role="alert">{emailError}</small>}</label>
            <label className="form-field"><span>Phone <b aria-hidden="true">*</b></span><input className="field-control" name="phone" type="tel" autoComplete="tel" required /></label>
            <label className="form-field"><span>Enquiry type <b aria-hidden="true">*</b></span><select className="field-control" name="enquiryType" required defaultValue=""><option value="" disabled>Select an enquiry type</option>{enquiryTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label className="form-field form-field-wide"><span>Property reference <small>(optional)</small></span><input className="field-control" name="propertyReference" defaultValue={initialReference} placeholder="e.g. AGE-TH-001" /></label>
            <label className="form-field form-field-wide"><span>Message <b aria-hidden="true">*</b></span><textarea className="field-control" name="message" rows={5} required minLength={10} placeholder="Tell us what you would like to know…" /></label>
          </div>
          <p className="required-hint"><b aria-hidden="true">*</b> Required fields</p>
          <button className="button-primary" type="submit">Show demo confirmation <span aria-hidden="true">→</span></button>
          <p className="form-disclaimer">No enquiry is sent or stored remotely by this demo form.</p>
        </form>
      )}
    </div>
  );
}
