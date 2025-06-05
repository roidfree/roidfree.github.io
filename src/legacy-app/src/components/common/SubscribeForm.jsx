import React from "react";

const SubscribeForm = () => (
  <form
    action="https://docs.google.com/forms/d/e/1FAIpQLScyi1DcZq9GaUi23NW2qmqg7_dFnaAtmyIusuXyUtmYMJMy2A/formResponse"
    method="POST"
    target="_blank"
    rel="noopener noreferrer"
    className="ana-subscribe-form"
  >
    <input
      type="email"
      name="entry.90429524"
      className="ana-subscribe-input"
      placeholder="Enter your email"
      required
    />
    <button
      type="submit"
      className="ana-subscribe-btn"
    >
      Subscribe
    </button>
  </form>
);

export default SubscribeForm;
