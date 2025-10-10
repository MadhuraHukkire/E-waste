// import React from "react";

// const About = () => {
//   return <div>About</div>;
// };

// export default About;
import React from "react";
import { 
  FaMapMarkerAlt, 
  FaShieldAlt, 
  FaBell, 
  FaRobot,
  FaUsers,
  FaRecycle,
  FaCheckCircle,
  FaMobileAlt,
  FaGlobeAmericas,
  FaHandshake
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaMapMarkerAlt className="text-3xl text-blue-600" />,
      title: "Shop Registration & Verification",
      description: "E-cycle shops and refurbishers can register their businesses. Our admin team verifies each submission to ensure authenticity and quality standards."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-green-600" />,
      title: "Admin Approval System",
      description: "Every registered shop undergoes thorough verification. Only approved businesses are displayed to users, ensuring reliable and trustworthy services."
    },
    {
      icon: <FaBell className="text-3xl text-orange-600" />,
      title: "Smart Reminders",
      description: "Automated reminders for regular e-waste disposal, maintenance schedules, and environmental impact updates to keep users engaged and responsible."
    },
    {
      icon: <FaRobot className="text-3xl text-purple-600" />,
      title: "AI-Powered Chatbot",
      description: "24/7 intelligent assistant to answer queries about e-waste disposal, shop locations, recycling processes, and environmental impact."
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Shop Registration",
      description: "Business owners register their e-cycle or refurbishment shops with complete details and documentation"
    },
    {
      step: "02",
      title: "Admin Verification",
      description: "Our team verifies authenticity, credentials, and compliance with environmental standards"
    },
    {
      step: "03",
      title: "Approval & Listing",
      description: "Approved shops are geotagged and listed in our platform with ratings and user reviews"
    },
    {
      step: "04",
      title: "User Discovery",
      description: "Users find nearest approved shops with real-time distance calculation and service details"
    },
    {
      step: "05",
      title: "Ongoing Support",
      description: "Regular reminders, chatbot assistance, and community engagement for sustainable practices"
    }
  ];

  const adminProcess = [
    {
      stage: "Submission Review",
      details: "New shop applications are thoroughly examined for completeness and basic requirements"
    },
    {
      stage: "Document Verification",
      details: "Business licenses, environmental compliance certificates, and operational permits are verified"
    },
    {
      stage: "Quality Assessment",
      details: "Evaluation of service quality, infrastructure, and environmental impact practices"
    },
    {
      stage: "Final Approval",
      details: "Successful applicants are approved and added to the platform with proper categorization"
    }
  ];

  const benefits = [
    {
      for: "For Users",
      points: [
        "Find trusted e-waste handlers nearby",
        "Get regular disposal reminders",
        "Access to verified recycling services",
        "24/7 chatbot support",
        "Contribute to environmental protection"
      ]
    },
    {
      for: "For Shop Owners",
      points: [
        "Increased visibility and customers",
        "Official verification badge",
        "Access to eco-conscious community",
        "Business growth opportunities",
        "Networking with other verified shops"
      ]
    },
    {
      for: "For Environment",
      points: [
        "Reduced illegal e-waste dumping",
        "Proper recycling and refurbishment",
        "Resource conservation",
        "Toxic waste prevention",
        "Sustainable ecosystem development"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FaRecycle className="text-6xl text-green-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            About E-Waste Connect
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A comprehensive platform bridging the gap between e-waste generators and certified recycling solutions. 
            We're building a sustainable ecosystem where responsible e-waste management meets modern technology.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FaGlobeAmericas className="text-5xl mx-auto mb-6 text-green-300" />
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto opacity-95">
            To create a transparent, efficient, and accessible e-waste management network that empowers 
            both businesses and individuals to participate in building a cleaner, greener future through 
            technology-driven solutions.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-green-700 p-6 rounded-lg">
              <FaUsers className="text-4xl mx-auto mb-4 text-green-300" />
              <h3 className="text-2xl font-semibold mb-4">Community First</h3>
              <p>Building a network of environmentally conscious users and verified service providers</p>
            </div>
            <div className="bg-green-700 p-6 rounded-lg">
              <FaShieldAlt className="text-4xl mx-auto mb-4 text-green-300" />
              <h3 className="text-2xl font-semibold mb-4">Trust & Verification</h3>
              <p>Ensuring every listed shop meets our strict quality and environmental standards</p>
            </div>
            <div className="bg-green-700 p-6 rounded-lg">
              <FaHandshake className="text-4xl mx-auto mb-4 text-green-300" />
              <h3 className="text-2xl font-semibold mb-4">Sustainable Impact</h3>
              <p>Creating measurable environmental impact through proper e-waste management</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and services designed to revolutionize e-waste management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-green-500">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, transparent process from registration to sustainable e-waste management
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition duration-300 border-2 border-green-500">
                  <span className="text-2xl font-bold text-green-600">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Verification Process */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <FaCheckCircle className="text-5xl text-green-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Rigorous Verification Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ensuring only qualified and responsible businesses join our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminProcess.map((process, index) => (
              <div key={index} className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{process.stage}</h3>
                <p className="text-gray-600 text-sm">{process.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Benefits for Everyone</h2>
            <p className="text-xl opacity-95 max-w-3xl mx-auto">
              Creating value across the entire e-waste management ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-green-700 p-8 rounded-xl">
                <h3 className="text-2xl font-semibold mb-6 text-center">{benefit.for}</h3>
                <ul className="space-y-4">
                  {benefit.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start space-x-3">
                      <FaCheckCircle className="text-green-300 mt-1 flex-shrink-0" />
                      <span className="opacity-95">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Feature */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <FaRobot className="text-6xl text-purple-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Intelligent Chatbot Assistant</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your 24/7 guide to responsible e-waste management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">What Our Chatbot Can Help With:</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center space-x-3">
                  <FaMobileAlt className="text-green-600" />
                  <span>Find nearest approved e-waste shops</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaRecycle className="text-green-600" />
                  <span>Learn about e-waste recycling processes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaBell className="text-green-600" />
                  <span>Set up disposal reminders and schedules</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaShieldAlt className="text-green-600" />
                  <span>Understand environmental impact and benefits</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span>Get directions to verified recycling centers</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl shadow-lg">
              <div className="bg-white rounded-lg p-6 shadow-inner">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <FaRobot className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">EcoBot Assistant</h4>
                    <p className="text-sm text-gray-500">Always online to help</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                    <p className="text-gray-700">Hi! How can I help with e-waste today?</p>
                  </div>
                  <div className="bg-green-100 rounded-lg p-4 max-w-xs ml-auto">
                    <p className="text-gray-700">Find recycling centers near me</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-gray-700">I'll show you the nearest verified e-waste shops! 📍</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Join Our Sustainable Movement</h2>
          <p className="text-xl mb-8 opacity-95">
            Whether you're a shop owner, environmental enthusiast, or responsible citizen, 
            there's a place for you in our ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition duration-300">
              Register Your Shop
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition duration-300">
              Start Recycling
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition duration-300">
              Chat with EcoBot
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;