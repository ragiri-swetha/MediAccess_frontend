
import { useState } from 'react';

export default function PharmacyFinder({ language = 'English' }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const translations = {
    English: {
      title: 'Nearby Medical Shops',
      info: 'Find medical shops near your current location.',
      button: 'Find Nearby Medical Shops',
      loading: 'Getting your location...',
      permission: 'Please allow location access in your browser.',
      error: 'Unable to get your location. Please enable GPS.',
    },

    Telugu: {
      title: 'దగ్గరలోని మెడికల్ షాపులు',
      info: 'మీ ప్రస్తుత స్థానానికి దగ్గరలోని మెడికల్ షాపులను కనుగొనండి.',
      button: 'దగ్గరలోని మెడికల్ షాపులను కనుగొనండి',
      loading: 'మీ లొకేషన్ తెలుసుకుంటున్నాం...',
      permission: 'బ్రౌజర్‌లో లొకేషన్ అనుమతి ఇవ్వండి.',
      error: 'మీ లొకేషన్ దొరకలేదు. GPS ఆన్ చేయండి.',
    },

    Hindi: {
      title: 'आस-पास की मेडिकल दुकानें',
      info: 'अपने वर्तमान स्थान के पास मेडिकल दुकानें खोजें।',
      button: 'पास की मेडिकल दुकानें खोजें',
      loading: 'आपकी लोकेशन प्राप्त की जा रही है...',
      permission: 'ब्राउज़र में लोकेशन की अनुमति दें।',
      error: 'आपकी लोकेशन नहीं मिली। GPS चालू करें।',
    },
  };

  const t = translations[language] || translations.English;

  function findNearbyShops() {
    setMessage('');

    if (!navigator.geolocation) {
      setMessage(t.error);
      return;
    }

    setLoading(true);
    setMessage(t.loading);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const mapUrl =
          'https://www.google.com/maps/search/?api=1' +
          '&query=medical%20shops' +
          `&query_place_id=&center=${latitude},${longitude}`;

        setLoading(false);
        setMessage('');

        window.open(mapUrl, '_blank', 'noopener,noreferrer');
      },

      () => {
        setLoading(false);
        setMessage(t.permission);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }

  return (
    <div className="medi-card">
      <h2>{t.title}</h2>

      <p>{t.info}</p>

      <button
        type="button"
        onClick={findNearbyShops}
        disabled={loading}
      >
        {loading ? t.loading : t.button}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
