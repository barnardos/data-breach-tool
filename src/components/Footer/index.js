import React from "react";

import AttentionGrabbingLink from "../../components/AttentionGrabbingLink";
import { footer } from "../../data/footer.json";
import Link from "../../components/Link";

import "./index.css";
import barnardosLogo from "../../images/barnardos.svg";
import dfeLogo from "../../images/dfe.svg";
import lgaLogo from "../../images/lga.svg";

const Footer = () => (
  <footer className="Footer">
    <AttentionGrabbingLink
      color={footer.feedback.color}
      href={footer.feedback.href}
      target={footer.feedback.target}
      text={footer.feedback.text}
    />
    <span className="Footer-link">
      <Link href={footer.privacyPolicy.href}>{footer.privacyPolicy.text}</Link>
    </span>
    <ul className="Footer-logos">
      <li className="Footer-logo">
        <Link
          className="Footer-logoLink"
          href={footer.barnardos.href}
          target={footer.target}
        >
          <img
            alt={footer.barnardos.img.alt}
            className="Footer-logoImage"
            src={barnardosLogo}
          />
        </Link>
      </li>
      <li className="Footer-logo">
        <Link
          className="Footer-logoLink"
          href={footer.lga.href}
          target={footer.target}
        >
          <img
            alt={footer.lga.img.alt}
            className="Footer-logoImage"
            src={lgaLogo}
          />
        </Link>
      </li>
      <li className="Footer-logo">
        <Link
          className="Footer-logoLink"
          href={footer.dfe.href}
          target={footer.target}
        >
          <img
            alt={footer.dfe.img.alt}
            className="Footer-logoImage"
            src={dfeLogo}
          />
        </Link>
      </li>
    </ul>
  </footer>
);

export default Footer;
