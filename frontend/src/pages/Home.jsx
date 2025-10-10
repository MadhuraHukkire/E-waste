
import React from "react";
import process from "../assets/process.webp";
import { 
  FaRecycle, 
  FaShieldAlt, 
  FaGlobeAmericas, 
  FaIndustry,
  FaChartLine,
  FaUsers,
  FaLeaf,
  FaBolt
} from "react-icons/fa";

const Home = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-3xl text-blue-600" />,
      title: "Data Security",
      description: "Proper e-waste management ensures complete data destruction and prevents sensitive information from falling into wrong hands."
    },
    {
      icon: <FaLeaf className="text-3xl text-green-600" />,
      title: "Environmental Protection",
      description: "Formalization prevents toxic substances like lead, mercury, and cadmium from contaminating soil and water sources."
    },
    {
      icon: <FaIndustry className="text-3xl text-purple-600" />,
      title: "Resource Recovery",
      description: "Recycling e-waste recovers valuable materials like gold, silver, copper, and rare earth elements for reuse."
    },
    {
      icon: <FaChartLine className="text-3xl text-orange-600" />,
      title: "Economic Benefits",
      description: "Creates green jobs and contributes to circular economy while reducing raw material extraction costs."
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Collection & Sorting",
      description: "Systematic collection and categorization of electronic waste"
    },
    {
      step: "2",
      title: "Data Destruction",
      description: "Secure wiping or physical destruction of data storage devices"
    },
    {
      step: "3",
      title: "Dismantling",
      description: "Careful separation of components and materials"
    },
    {
      step: "4",
      title: "Material Recovery",
      description: "Extraction and purification of valuable materials"
    },
    {
      step: "5",
      title: "Safe Disposal",
      description: "Environmentally responsible disposal of non-recyclable components"
    }
  ];

  const stats = [
    { number: "53.6", label: "Million Metric Tons", description: "E-waste generated globally in 2023" },
    { number: "17.4%", label: "Properly Recycled", description: "Only a small fraction is properly processed" },
    { number: "$57", label: "Billion Value", description: "Raw materials in e-waste dumped or burned annually" },
    { number: "2030", label: "Projected Growth", description: "E-waste expected to reach 74 million MT by 2030" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <FaRecycle className="text-6xl text-green-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Formalizing E-Waste Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transforming electronic waste from environmental hazard to valuable resource through 
            systematic normalization processes. Join the movement towards sustainable technology lifecycle management.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300">
              Learn More
            </button>
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition duration-300">
              Get Involved
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Formalize E-Waste?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              E-waste Formalization is crucial for environmental protection, resource conservation, 
              and sustainable development. Here's why it matters:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-r hidden sm:block from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">The Formalization Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our systematic approach ensures safe and efficient e-waste management from collection to material recovery
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition duration-300">
                  <span className="text-2xl font-bold text-green-600">{step.step}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Process Image Placeholder */}
          <div className="mt-20 rounded-xl h-100 relative overflow-hidden">
            <img 
                src={process} 
                alt="Process" 
                className="absolute inset-0 rounded w-full h-full object-cover"
            />
            
            </div>

        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">The E-Waste Crisis</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the scale of the problem highlights the urgency for normalization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-700">{stat.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <FaUsers className="text-5xl mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Join the Movement</h2>
          <p className="text-xl mb-8 opacity-90">
            Together, we can transform e-waste from an environmental problem into an economic opportunity 
            while protecting our planet for future generations.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition duration-300">
              Start Recycling
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition duration-300">
              Contact Experts
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;