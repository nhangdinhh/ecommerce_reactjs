import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcJcb } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import "../components/Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Client Support</h3>
          <a href="tel:19006035">Hotline: 0987-654-321</a>
          <a href="#">Frequently Asked Questions</a>
          <a href="#">Submit Support Request</a>
          <a href="#">Order Guide</a>
          <a href="#">Shipping Methods</a>
          <a href="#">Return Policy</a>
          <a href="#">Installment Guide</a>
          <a href="mailto:hotro@xyzshop.vn">Customer Support: hotro@xyzshop.vn</a>
          <a href="mailto:security@xyzshop.vn">Security Report: security@xyzshop.vn</a>
        </div>
        <div className="footer-section">
          <h3>About xyzShop</h3>
          <a href="#">About xyzShop</a>
          <a href="#">xyzShop Blog</a>
          <a href="#">Careers</a>
          <a href="#">Payment Privacy Policy</a>
          <a href="#">Personal Information Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Partner with xyzShop</a>
        </div>
        <div className="footer-section">
          <h3>Payment Methods</h3>
          <div className="pay-container">
            <a href="#"><FontAwesomeIcon icon={faCcVisa} /> Visa</a>
            <a href="#"><FontAwesomeIcon icon={faCcMastercard} /> MasterCard</a>
            <a href="#"><FontAwesomeIcon icon={faCcJcb} /> JCB</a>
            <a href="#"><FontAwesomeIcon icon={faCreditCard} /> ATM</a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Connect with Us</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg"
                alt="Facebook"
              />
            </a>
            <a
              href="https://www.youtube.com"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
                alt="YouTube"
              />
            </a>
            <a
              href="https://zalo.me"
              aria-label="Zalo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png"
                alt="Zalo"
              />
            </a>
          </div>
        </div>
        <div className="footer-section qr-code">
          <h3>Download the Application</h3>
          <div className="download-app-container">
            <a
              href="https://play.google.com/store/apps/details?id=com.xyzshop"
              aria-label="Google Play"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1920px-Google_Play_Store_badge_EN.svg.png"
                alt="Get it on Google Play"
                className="google-play-logo"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
