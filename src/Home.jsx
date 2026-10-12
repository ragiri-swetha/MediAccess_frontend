
import { useEffect, useState } from 'react';
import PharmacyFinder from './PharmacyFinder';
import './Home.css';

const translations = {
  English: {
    welcome: 'Welcome to MediAccess',
    subtitle: 'Search medicines and learn about their uses.',
    search: 'Search medicine name...',
    medicines: 'Available Medicines',
    uses: 'Uses',
    precautions: 'Precautions',
    sideEffects: 'Side Effects',
    pharmacy: 'Pharmacy Finder',
    pharmacyText: 'Find pharmacies near your location.',
    noMedicines: 'No medicines found.',
    loading: 'Loading medicines...',
    error: 'Could not load medicines. Please check the backend.',
    footer: 'For medical advice, consult a doctor or pharmacist.',
  },

  Telugu: {
    welcome: 'MediAccess కి స్వాగతం',
    subtitle: 'మందుల కోసం వెతికి, వాటి ఉపయోగాలను తెలుసుకోండి.',
    search: 'మందు పేరు టైప్ చేయండి...',
    medicines: 'అందుబాటులో ఉన్న మందులు',
    uses: 'ఉపయోగాలు',
    precautions: 'జాగ్రత్తలు',
    sideEffects: 'దుష్ప్రభావాలు',
    pharmacy: 'ఫార్మసీని కనుగొనండి',
    pharmacyText: 'మీ దగ్గరలోని ఫార్మసీలను కనుగొనండి.',
    noMedicines: 'మందులు దొరకలేదు.',
    loading: 'మందుల వివరాలు లోడ్ అవుతున్నాయి...',
    error: 'మందుల వివరాలు లోడ్ కాలేదు. బ్యాకెండ్ నడుస్తోందో చూడండి.',
    footer: 'వైద్య సలహా కోసం వైద్యుడిని లేదా ఫార్మసిస్ట్‌ను సంప్రదించండి.',
  },

  Hindi: {
    welcome: 'MediAccess में आपका स्वागत है',
    subtitle: 'दवाइयाँ खोजें और उनके उपयोग जानें।',
    search: 'दवा का नाम लिखें...',
    medicines: 'उपलब्ध दवाइयाँ',
    uses: 'उपयोग',
    precautions: 'सावधानियाँ',
    sideEffects: 'दुष्प्रभाव',
    pharmacy: 'फार्मेसी खोजें',
    pharmacyText: 'अपने पास की फार्मेसियाँ खोजें।',
    noMedicines: 'कोई दवा नहीं मिली।',
    loading: 'दवाइयों की जानकारी लोड हो रही है...',
    error: 'दवाइयों की जानकारी नहीं मिली। बैकएंड जाँचें।',
    footer: 'चिकित्सा सलाह के लिए डॉक्टर या फार्मासिस्ट से पूछें।',
  },
};

const medicineTranslations = {
  Paracetamol: {
    Telugu: {
      use: 'జ్వరం మరియు తేలికపాటి నొప్పిని తగ్గించడానికి ఉపయోగిస్తారు.',
      precautions:
        'పారాసిటమాల్ ఉన్న ఇతర మందులతో కలిపి తీసుకోకండి. సూచించిన మోతాదును మించకండి. అధిక మోతాదు కాలేయానికి తీవ్రమైన హాని కలిగించవచ్చు.',
      sideEffects:
        'సిఫార్సు చేసిన మోతాదులో దుష్ప్రభావాలు అరుదుగా ఉంటాయి. అధిక మోతాదు కాలేయానికి తీవ్రమైన హాని కలిగించవచ్చు.',
    },
    Hindi: {
      use: 'बुखार और हल्के दर्द को कम करने में मदद करती है।',
      precautions:
        'पैरासिटामोल वाली दूसरी दवाओं के साथ इसे न लें। निर्धारित मात्रा से अधिक न लें। अधिक मात्रा से लिवर को गंभीर नुकसान हो सकता है।',
      sideEffects:
        'अनुशंसित मात्रा में दुष्प्रभाव कम होते हैं। अधिक मात्रा से लिवर को गंभीर नुकसान हो सकता है।',
    },
  },

  Cetirizine: {
    Telugu: {
      use: 'తుమ్ములు, దురద, ముక్కు కారడం వంటి అలర్జీ లక్షణాలను తగ్గించడంలో సహాయపడుతుంది.',
      precautions:
        'ఈ మందుతో నిద్రమత్తు రావచ్చు. వాహనం నడిపేటప్పుడు జాగ్రత్తగా ఉండండి. ఇతర మందులు వాడుతున్నట్లయితే వైద్యుడిని సంప్రదించండి.',
      sideEffects: 'నిద్రమత్తు, అలసట లేదా నోరు పొడిబారడం కలగవచ్చు.',
    },
    Hindi: {
      use: 'छींक, खुजली और नाक बहने जैसे एलर्जी के लक्षणों में मदद करती है।',
      precautions:
        'इससे नींद आ सकती है। वाहन चलाते समय सावधानी रखें। दूसरी दवाएँ ले रहे हों तो डॉक्टर से पूछें।',
      sideEffects: 'नींद आना, थकान या मुँह सूखना हो सकता है।',
    },
  },

  ORS: {
    Telugu: {
      use: 'విరేచనాలు లేదా శరీరంలో నీరు తగ్గినప్పుడు నీరు, లవణాలను భర్తీ చేయడంలో సహాయపడుతుంది.',
      precautions:
        'ప్యాకెట్‌పై సూచించిన నీటి పరిమాణంలోనే కలపండి. తీవ్రమైన నిర్జలీకరణ లక్షణాలు ఉంటే వైద్య సహాయం పొందండి.',
      sideEffects:
        'ప్యాకెట్‌పై సూచించిన విధంగా కలపాలి. తప్పుగా కలపడం వల్ల సమస్యలు రావచ్చు.',
    },
    Hindi: {
      use: 'दस्त या शरीर में पानी की कमी होने पर पानी और लवणों की भरपाई करने में मदद करता है।',
      precautions:
        'पैकेट पर बताई गई पानी की मात्रा में ही मिलाएँ। गंभीर निर्जलीकरण होने पर चिकित्सा सहायता लें।',
      sideEffects:
        'पैकेट पर दिए गए निर्देशों का पालन करें। गलत तरीके से मिलाने पर समस्याएँ हो सकती हैं।',
    },
  },
};

export default function Home() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const t = translations[language];

  useEffect(() => {
   fetch('http://127.0.0.1:8080/api/medicines')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Medicine loading failed');
        }
        return response.json();
      })
      .then((data) => setMedicines(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="medi-container">
      <nav className="medi-navbar">
        <h2 className="medi-brand">💊 MediAccess</h2>

        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          aria-label="Select language"
        >
          <option value="English">English</option>
          <option value="Telugu">తెలుగు</option>
          <option value="Hindi">हिंदी</option>
        </select>
      </nav>

      <section className="medi-hero">
        <h1>{t.welcome}</h1>
        <p>{t.subtitle}</p>

        <input
          className="medi-search"
          type="text"
          placeholder={t.search}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </section>

      <section style={{ padding: '0 20px' }}>
        <PharmacyFinder language={language} />
      </section>

      <section style={{ padding: 20 }}>
        <h2 className="medi-section-title">{t.medicines}</h2>

        {loading && <p>{t.loading}</p>}

        {error && <p>{t.error}</p>}

        {!loading && !error && filteredMedicines.length === 0 && (
          <p>{t.noMedicines}</p>
        )}

        <div className="medi-grid">
          {filteredMedicines.map((medicine) => {
            const translated =
              medicineTranslations[medicine.name]?.[language];

            return (
              <div className="medi-card" key={medicine.name}>
                <h3>{medicine.name}</h3>

                <h4>{t.uses}</h4>
                <p>
                  {translated?.use ||
                    medicine.use ||
                    'Information unavailable'}
                </p>

                <h4>{t.precautions}</h4>
                <p>
                  {translated?.precautions ||
                    medicine.precautions ||
                    'Please consult a healthcare professional.'}
                </p>

                {(translated?.sideEffects || medicine.sideEffects) && (
                  <>
                    <h4>{t.sideEffects}</h4>
                    <p>
                      {translated?.sideEffects || medicine.sideEffects}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <footer className="medi-footer">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}



