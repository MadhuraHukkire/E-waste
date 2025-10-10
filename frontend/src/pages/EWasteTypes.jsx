// pages/EWasteTypes.jsx (Updated Hazardous Materials Section)
import React from 'react';
import { 
  FaLaptop, 
  FaMobile, 
  FaTv, 
  FaBatteryHalf, 
  FaPrint, 
  FaHeadphones,
  FaGamepad,
  FaArrowLeft,
  FaRecycle,
  FaExclamationTriangle,
  FaSkullCrossbones,
  FaLungs,
  FaBrain,
  FaHeart,
  FaBaby
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EWasteTypes = () => {
  const navigate = useNavigate();

  // ... (wasteCategories array remains the same as previous)
   const wasteCategories = [
    {
      icon: <FaMobile className="text-4xl text-purple-600" />,
      title: "Mobile Devices",
      items: ["Smartphones", "Tablets", "Feature Phones", "Smart Watches", "GPS Devices"],
      description: "Contain valuable metals like gold, silver, and copper. Improper disposal can leak toxic substances.",
      recycling: "Batteries should be removed separately. Data should be wiped before recycling.",
      danger: "Lithium-ion batteries can cause fires if damaged."
    },
    {
      icon: <FaLaptop className="text-4xl text-blue-600" />,
      title: "Computers & IT Equipment",
      items: ["Laptops", "Desktops", "Servers", "Monitors", "Keyboards", "Mice"],
      description: "Rich source of precious metals. CRT monitors contain leaded glass.",
      recycling: "Hard drives should be securely wiped or destroyed for data protection.",
      danger: "CRT monitors contain 4-8 pounds of lead each."
    },
    {
      icon: <FaTv className="text-4xl text-green-600" />,
      title: "Entertainment Electronics",
      items: ["Televisions", "DVD/Blu-ray Players", "Home Theater Systems", "Speakers"],
      description: "Modern TVs use LED/LCD technology while older ones contain hazardous materials.",
      recycling: "Plasma TVs contain mercury. Proper handling is required.",
      danger: "Older CRT TVs contain lead, barium, and phosphor."
    },
    {
      icon: <FaPrint className="text-4xl text-orange-600" />,
      title: "Office Equipment",
      items: ["Printers", "Scanners", "Copiers", "Fax Machines", "Projectors"],
      description: "Contain various plastics, metals, and often ink/toner cartridges.",
      recycling: "Toner cartridges can often be refilled and reused.",
      danger: "Printer ink and toner can contain hazardous chemicals."
    },
    {
      icon: <FaBatteryHalf className="text-4xl text-red-600" />,
      title: "Batteries & Power",
      items: ["Lithium-ion Batteries", "Lead-acid Batteries", "Power Banks", "Chargers"],
      description: "Different battery types require different recycling processes.",
      recycling: "Never dispose of batteries in regular trash due to fire risk.",
      danger: "Can cause fires and leak toxic heavy metals."
    },
    {
      icon: <FaHeadphones className="text-4xl text-indigo-600" />,
      title: "Small Electronics",
      items: ["Headphones", "Cameras", "Routers", "Modems", "Smart Home Devices"],
      description: "Often contain valuable copper wiring and various electronic components.",
      recycling: "Many small devices can be refurbished and reused.",
      danger: "May contain heavy metals like cadmium and mercury."
    },
    {
      icon: <FaGamepad className="text-4xl text-pink-600" />,
      title: "Gaming & Entertainment",
      items: ["Gaming Consoles", "VR Headsets", "Controllers", "Gaming PCs"],
      description: "High-end gaming equipment contains valuable components and rare metals.",
      recycling: "Often have good resale value if still functional.",
      danger: "Contains similar hazards to computers and monitors."
    },
    {
      icon: <FaRecycle className="text-4xl text-teal-600" />,
      title: "Miscellaneous E-Waste",
      items: ["Medical Devices", "Laboratory Equipment", "Industrial Controls", "Network Equipment"],
      description: "Specialized equipment that may require specific disposal protocols.",
      recycling: "Check with manufacturers for take-back programs.",
      danger: "May contain specialized hazardous materials."
    }
  ];

  const hazardousMaterials = [
    {
      name: "Lead (Pb)",
      source: "CRT monitors, solder, circuit boards, lead-acid batteries",
      chemicalSymbol: "Pb",
      prevalence: "Very High - 40% of all e-waste",
      healthEffects: [
        "Neurological damage and brain disorders",
        "Developmental delays in children",
        "Kidney dysfunction and failure",
        "Reproductive system damage",
        "High blood pressure and anemia",
        "Memory loss and concentration problems"
      ],
      exposureRoutes: "Inhalation of dust, ingestion through contaminated water",
      safetyLevel: "Zero tolerance - no safe exposure level",
      icon: <FaBrain className="text-red-600" />
    },
    {
      name: "Mercury (Hg)",
      source: "Flat screens, fluorescent lamps, switches, thermostats",
      chemicalSymbol: "Hg",
      prevalence: "High - in 20% of electronic devices",
      healthEffects: [
        "Central nervous system damage",
        "Kidney and lung failure",
        "Vision and hearing impairment",
        "Tremors and emotional instability",
        "Developmental defects in fetus",
        "Minamata disease (neurological syndrome)"
      ],
      exposureRoutes: "Inhalation of vapors, skin absorption, contaminated fish",
      safetyLevel: "Extremely hazardous - bioaccumulates in food chain",
      icon: <FaSkullCrossbones className="text-purple-600" />
    },
    {
      name: "Cadmium (Cd)",
      source: "Ni-Cd batteries, coatings, pigments, semiconductors",
      chemicalSymbol: "Cd",
      prevalence: "Moderate - primarily in batteries",
      healthEffects: [
        "Lung and prostate cancer",
        "Kidney damage and bone demineralization",
        "Itai-itai disease (severe bone pain)",
        "Respiratory system damage",
        "Gastrointestinal irritation",
        "Genetic mutations and birth defects"
      ],
      exposureRoutes: "Inhalation of fumes, ingestion through contaminated food",
      safetyLevel: "Carcinogenic - accumulates in kidneys for 10-30 years",
      icon: <FaLungs className="text-orange-600" />
    },
    {
      name: "Hexavalent Chromium (Cr-VI)",
      source: "Metal coatings, anti-corrosion treatments",
      chemicalSymbol: "Cr(VI)",
      prevalence: "Moderate - in metal housings and coatings",
      healthEffects: [
        "Lung cancer and nasal damage",
        "Liver and kidney damage",
        "Skin ulcers and dermatitis",
        "Asthma and respiratory issues",
        "DNA damage and mutations",
        "Gastrointestinal tumors"
      ],
      exposureRoutes: "Inhalation of dust, skin contact, water contamination",
      safetyLevel: "Carcinogenic - known human carcinogen",
      icon: <FaHeart className="text-pink-600" />
    },
    {
      name: "Brominated Flame Retardants (BFRs)",
      source: "Circuit boards, plastic casings, cables",
      chemicalSymbol: "PBDE, TBBPA",
      prevalence: "Very High - 80% of plastic components",
      healthEffects: [
        "Endocrine system disruption",
        "Thyroid hormone interference",
        "Neurological development issues",
        "Reproductive system damage",
        "Immune system suppression",
        "Increased cancer risk"
      ],
      exposureRoutes: "Dust inhalation, skin contact, food chain accumulation",
      safetyLevel: "Persistent organic pollutants - remain in environment for decades",
      icon: <FaBaby className="text-yellow-600" />
    },
    {
      name: "Beryllium (Be)",
      source: "Power devices, connectors, springs",
      chemicalSymbol: "Be",
      prevalence: "Low but highly toxic",
      healthEffects: [
        "Chronic beryllium disease (lung scarring)",
        "Lung cancer and respiratory failure",
        "Skin diseases and granulomas",
        "Liver and spleen damage",
        "Acute chemical pneumonia",
        "Genetic damage and mutations"
      ],
      exposureRoutes: "Inhalation of dust and fumes",
      safetyLevel: "Carcinogenic - sensitization can occur at very low levels",
      icon: <FaLungs className="text-red-700" />
    },
    {
      name: "Polyvinyl Chloride (PVC)",
      source: "Cable insulation, plastic housings",
      chemicalSymbol: "(C₂H₃Cl)ₙ",
      prevalence: "Very High - 30% of plastic components",
      healthEffects: [
        "Dioxin release when burned (highly carcinogenic)",
        "Endocrine disruption",
        "Reproductive system damage",
        "Immune system suppression",
        "Respiratory problems",
        "Liver cancer"
      ],
      exposureRoutes: "Inhalation of fumes when burned, leaching into water",
      safetyLevel: "Hazardous when burned - releases dioxins and furans",
      icon: <FaSkullCrossbones className="text-gray-600" />
    },
    {
      name: "Arsenic (As)",
      source: "Semiconductors, LEDs, solar cells",
      chemicalSymbol: "As",
      prevalence: "Moderate - in specialized components",
      healthEffects: [
        "Skin, bladder, and lung cancer",
        "Nervous system damage",
        "Cardiovascular diseases",
        "Diabetes and hypertension",
        "Skin lesions and hyperpigmentation",
        "Gangrene and peripheral vascular disease"
      ],
      exposureRoutes: "Drinking contaminated water, inhalation",
      safetyLevel: "Carcinogenic - accumulates in nails and hair",
      icon: <FaHeart className="text-red-800" />
    },
    {
      name: "Lithium (Li)",
      source: "Lithium-ion batteries, mobile devices",
      chemicalSymbol: "Li",
      prevalence: "High - in modern batteries",
      healthEffects: [
        "Respiratory irritation when inhaled",
        "Skin and eye irritation",
        "Toxic if batteries rupture or burn",
        "Environmental contamination",
        "Fire and explosion hazard",
        "Water contamination"
      ],
      exposureRoutes: "Inhalation of dust, battery leakage",
      safetyLevel: "Reactive - fire hazard when damaged",
      icon: <FaExclamationTriangle className="text-orange-500" />
    },
    {
      name: "Selenium (Se)",
      source: "Photocopiers, solar cells, rectifiers",
      chemicalSymbol: "Se",
      prevalence: "Low - in specialized equipment",
      healthEffects: [
        "Selenosis (hair and nail loss)",
        "Neurological damage",
        "Skin rashes and irritation",
        "Garlic breath odor",
        "Liver and kidney damage",
        "Respiratory irritation"
      ],
      exposureRoutes: "Inhalation of dust, ingestion",
      safetyLevel: "Toxic in small amounts - narrow safety margin",
      icon: <FaBrain className="text-yellow-700" />
    },
    {
      name: "Antimony (Sb)",
      source: "Flame retardants, diodes, batteries",
      chemicalSymbol: "Sb",
      prevalence: "Moderate - in plastics and electronics",
      healthEffects: [
        "Cardiovascular problems",
        "Lung and stomach cancer",
        "Skin and eye irritation",
        "Respiratory system damage",
        "Gastrointestinal issues",
        "Reproductive toxicity"
      ],
      exposureRoutes: "Inhalation of dust, skin contact",
      safetyLevel: "Carcinogenic suspect - similar to arsenic",
      icon: <FaHeart className="text-purple-700" />
    },
    {
      name: "Nickel (Ni)",
      source: "Batteries, connectors, stainless steel",
      chemicalSymbol: "Ni",
      prevalence: "High - in batteries and metal parts",
      healthEffects: [
        "Lung and nasal cancer",
        "Skin allergies and dermatitis",
        "Asthma and respiratory issues",
        "Cardiovascular diseases",
        "Neurological effects",
        "Developmental toxicity"
      ],
      exposureRoutes: "Inhalation, skin contact, ingestion",
      safetyLevel: "Carcinogenic and allergenic - common sensitizer",
      icon: <FaLungs className="text-gray-600" />
    }
  ];

  const globalImpactStats = [
    { number: "50M", label: "Tons of e-waste generated annually worldwide" },
    { number: "82.6%", label: "E-waste not properly documented or recycled" },
    { number: "$57B", label: "Value of raw materials dumped or burned annually" },
    { number: "5000%", label: "Increase in e-waste since 2000" },
    { number: "1000+", label: "Toxic substances released from e-waste" },
    { number: "200M", label: "People affected by e-waste contamination globally" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition duration-300 mr-4"
            >
              <FaArrowLeft />
            </button>
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <FaLaptop className="text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Types of E-Waste</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding different categories of electronic waste helps in proper disposal, 
            recycling, and environmental protection. Learn about various e-waste types and their impacts.
          </p>
        </div>

        {/* Global Impact Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Global E-Waste Crisis</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {globalImpactStats.map((stat, index) => (
              <div key={index} className="text-center bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-sm text-red-800">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
               {/* E-Waste Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {wasteCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Common Items:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, itemIndex) => (
                      <span 
                        key={itemIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <FaRecycle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{category.recycling}</span>
                  </div>
                  <div className="flex items-start">
                    <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{category.danger}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hazardous Materials Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Hazardous Materials in E-Waste
          </h2>
          <p className="text-gray-600 text-lg mb-8 text-center">
            Electronic waste contains numerous toxic substances that pose serious threats to human health and the environment. 
            Proper handling and recycling are essential to prevent exposure.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {hazardousMaterials.map((material, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-red-800 text-xl mb-1">
                      {material.name} <span className="text-red-600">({material.chemicalSymbol})</span>
                    </h3>
                    <p className="text-red-700 text-sm mb-2">
                      <strong>Prevalence:</strong> {material.prevalence}
                    </p>
                    <p className="text-red-600 text-sm">
                      <strong>Found in:</strong> {material.source}
                    </p>
                  </div>
                  <div className="text-2xl">
                    {material.icon}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-red-800 mb-2">Health Effects:</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    {material.healthEffects.map((effect, effectIndex) => (
                      <li key={effectIndex} className="flex items-start">
                        <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0 text-xs" />
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-red-800">Exposure Routes:</strong>
                    <p className="text-red-600">{material.exposureRoutes}</p>
                  </div>
                  <div>
                    <strong className="text-red-800">Safety Level:</strong>
                    <p className="text-red-600">{material.safetyLevel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Impact Summary */}
        <div className="bg-orange-100 border-l-4 border-orange-500 p-6 rounded-lg mb-8">
          <div className="flex items-start">
            <FaExclamationTriangle className="text-orange-500 text-2xl mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-2">
                Critical Health Impacts of E-Waste Exposure
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-orange-700">
                <div>
                  <strong>Children & Development:</strong>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• Permanent neurological damage</li>
                    <li>• Reduced IQ and learning disabilities</li>
                    <li>• Behavioral problems</li>
                    <li>• Growth retardation</li>
                  </ul>
                </div>
                <div>
                  <strong>Adult Health Risks:</strong>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• Multiple cancer types</li>
                    <li>• Reproductive system damage</li>
                    <li>• Organ failure (kidney, liver, lungs)</li>
                    <li>• Cardiovascular diseases</li>
                  </ul>
                </div>
                <div>
                  <strong>Environmental Impact:</strong>
                  <ul className="text-sm mt-1 space-y-1">
                    <li>• Soil and water contamination</li>
                    <li>• Food chain accumulation</li>
                    <li>• Biodiversity loss</li>
                    <li>• Long-term ecosystem damage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prevention and Safety Measures */}
        <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-green-800 mb-4">Protective Measures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-green-700">
            <div>
              <h4 className="font-semibold mb-2">For Individuals:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <FaRecycle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  Always use certified e-waste recyclers
                </li>
                <li className="flex items-start">
                  <FaRecycle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  Never burn or dismantle electronics at home
                </li>
                <li className="flex items-start">
                  <FaRecycle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  Wash hands after handling old electronics
                </li>
                <li className="flex items-start">
                  <FaRecycle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  Store e-waste in dry, covered areas
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For Communities:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <FaRecycle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  Establish proper collection systems
                </li>
                <li className="flex items-start">
                  <FaRecycle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  Educate about e-waste dangers
                </li>
                <li className="flex items-start">
                  <FaRecycle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  Support certified recycling facilities
                </li>
                <li className="flex items-start">
                  <FaRecycle className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  Implement strict regulations and monitoring
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-green-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Action Makes a Difference</h2>
          <p className="text-green-100 mb-6 text-lg">
            Proper e-waste disposal prevents health hazards, protects the environment, 
            and conserves valuable resources for future generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/shops')}
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              Find Certified Recycling Centers
            </button>
            <button 
              onClick={() => navigate('/chatbot')}
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              Ask EcoBot for Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EWasteTypes;