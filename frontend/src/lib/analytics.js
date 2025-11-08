import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID is not set');
    return;
  }

  ReactGA.initialize(MEASUREMENT_ID, {
    gaOptions: {
      // Send page views automatically
      send_page_view: false, // We'll handle this manually for better control with React Router
    },
    gtagOptions: {
      // Track where users came from
      anonymize_ip: true, // Anonymize IP for privacy compliance
    },
  });

  console.log('Google Analytics initialized');
};

// Track page views
export const trackPageView = (path, title) => {
  if (!MEASUREMENT_ID) return;

  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (category, action, label, value) => {
  if (!MEASUREMENT_ID) return;

  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Get referrer and campaign data
export const trackCampaignData = () => {
  if (!MEASUREMENT_ID) return;

  // Get URL parameters for campaign tracking
  const urlParams = new URLSearchParams(window.location.search);
  const campaignData = {
    source: urlParams.get('utm_source') || document.referrer || 'direct',
    medium: urlParams.get('utm_medium'),
    campaign: urlParams.get('utm_campaign'),
    term: urlParams.get('utm_term'),
    content: urlParams.get('utm_content'),
  };

  // Track campaign data as custom event
  if (campaignData.source !== 'direct' || campaignData.campaign) {
    ReactGA.event({
      category: 'Campaign',
      action: 'Visit',
      label: JSON.stringify(campaignData),
    });
  }

  return campaignData;
};
