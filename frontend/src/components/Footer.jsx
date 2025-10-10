import React from "react";
import { 
  FaRecycle, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram,
  FaArrowRight,
  FaShieldAlt,
  FaUsers,
  FaHandshake
} from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Find Shops", href: "/shops" },
    { name: "Register Shop", href: "/register-shop" },
    { name: "Chatbot", href: "/chatbot" }
  ];

  const services = [
    { name: "Shop Verification", href: "/verification" },
    { name: "E-Waste Collection", href: "/collection" },
    { name: "Refurbishment", href: "/refurbishment" },
    { name: "Recycling Process", href: "/recycling" },
    { name: "Environmental Impact", href: "/impact" },
    { name: "Community Programs", href: "/community" }
  ];

  const support = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "FAQ", href: "/faq" },
    { name: "Shop Guidelines", href: "/guidelines" }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", name: "Facebook" },
    { icon: <FaTwitter />, href: "#", name: "Twitter" },
    { icon: <FaLinkedin />, href: "#", name: "LinkedIn" },
    { icon: <FaInstagram />, href: "#", name: "Instagram" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <FaRecycle className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-xl font-bold">E-Waste Connect</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Building a sustainable future through responsible e-waste management. 
              Connecting certified recyclers with environmentally conscious users.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-gray-800 hover:bg-green-600 w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FaArrowRight className="text-green-400 mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition duration-300 flex items-center"
                  >
                    <FaArrowRight className="text-xs mr-2 text-green-400" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FaShieldAlt className="text-green-400 mr-2" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-green-400 transition duration-300 flex items-center"
                  >
                    <FaArrowRight className="text-xs mr-2 text-green-400" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FaUsers className="text-green-400 mr-2" />
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Green Tech Park</p>
                  <p className="text-gray-300">Sustainable City, SC 12345</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-green-400 mr-3 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-300 hover:text-green-400 transition duration-300">
                  +1 (123) 456-7890
                </a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-green-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@ewasteconnect.com" className="text-gray-300 hover:text-green-400 transition duration-300">
                  info@ewasteconnect.com
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            {/* <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-300">NEWSLETTER</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-3 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                />
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-lg transition duration-300">
                  <FaArrowRight />
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Features Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-700">
          <div className="text-center">
            <FaShieldAlt className="text-3xl text-green-400 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Verified Shops</h4>
            <p className="text-gray-300 text-sm">All shops are thoroughly verified by our admin team</p>
          </div>
          <div className="text-center">
            <FaHandshake className="text-3xl text-green-400 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Trusted Platform</h4>
            <p className="text-gray-300 text-sm">Connecting you with reliable e-waste handlers</p>
          </div>
          <div className="text-center">
            <FaUsers className="text-3xl text-green-400 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">24/7 Support</h4>
            <p className="text-gray-300 text-sm">Chatbot and customer support always available</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} E-Waste Connect. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center space-x-6">
              <a href="/privacy" className="text-gray-300 hover:text-green-400 text-sm transition duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-300 hover:text-green-400 text-sm transition duration-300">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-300 hover:text-green-400 text-sm transition duration-300">
                Cookie Policy
              </a>
              <a href="/sitemap" className="text-gray-300 hover:text-green-400 text-sm transition duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;