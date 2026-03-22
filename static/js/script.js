// Custom JavaScript for the construction portfolio

/**
 * Update the hero section background image.
 * @param {string} url The URL of the image to set as background.
 */
function updateHeroImage(url) {
  const heroSection = document.querySelector('.hero-section');
  if (heroSection && url) {
    heroSection.style.backgroundImage = `url('${url}')`;
  }
}

/**
 * Update the gallery images displayed in the gallery section.
 * Cycles through the provided array if there are fewer images than slots.
 * @param {string[]} images Array of image URLs.
 */
function updateGalleryImages(images) {
  const galleryImages = document.querySelectorAll('#gallery .gallery-item img');
  if (!images || images.length === 0 || !galleryImages) return;
  galleryImages.forEach((img, index) => {
    const imageUrl = images[index % images.length];
    if (imageUrl) {
      img.src = imageUrl;
    }
  });
}

/**
 * Apply translations from the provided dictionary to the page elements.
 * It maps element IDs to keys in the translation JSON.
 * @param {Object} dict The translation dictionary for the selected language.
 */
function applyTranslations(dict) {
  if (!dict) return;
  // Mapping of element IDs to translation keys
  const mapping = {
    // Navigation
    'nav-services': 'nav_services',
    'nav-gallery': 'nav_gallery',
    'nav-testimonials': 'nav_testimonials',
    'nav-contact': 'nav_contact',
    'nav-pricing': 'nav_pricing',
    // Hero section
    'hero-title': 'hero_title',
    'hero-subtitle': 'hero_subtitle',
    // Services section
    'services-title': 'services_title',
    'service1-title': 'service1_title',
    'service1-desc': 'service1_desc',
    'service2-title': 'service2_title',
    'service2-desc': 'service2_desc',
    'service3-title': 'service3_title',
    'service3-desc': 'service3_desc',
    // Gallery section
    'gallery-title': 'gallery_title',
    // Pricing section
    'pricing-title': 'pricing_title',
    'pricing-header-service': 'pricing_header_service',
    'pricing-header-description': 'pricing_header_description',
    'pricing-header-price': 'pricing_header_price',
    'painting-title': 'painting_title',
    'painting-desc': 'painting_desc',
    'painting-price': 'painting_price',
    'flooring-title': 'flooring_title',
    'flooring-desc': 'flooring_desc',
    'flooring-price': 'flooring_price',
    'tiling-title': 'tiling_title',
    'tiling-desc': 'tiling_desc',
    'tiling-price': 'tiling_price',
    // Testimonials section
    'testimonials-title': 'testimonials_title',
    'testimonial1-text': 'testimonial1_text',
    'testimonial1-author': 'testimonial1_author',
    'testimonial2-text': 'testimonial2_text',
    'testimonial2-author': 'testimonial2_author',
    'testimonial3-text': 'testimonial3_text',
    'testimonial3-author': 'testimonial3_author',
    // Contact section
    'contact-title': 'contact_title',
    'label-name': 'label_name',
    'label-email': 'label_email',
    'label-subject': 'label_subject',
    'label-message': 'label_message',
    'send-button': 'send_button',
    'footer-rights': 'footer_rights',
    // Pricing request section
    'request-service-title': 'request_service_title',
    'request-name-label': 'request_name_label',
    'request-email-label': 'request_email_label',
    'request-services-label': 'request_services_label',
    'service-painting-label': 'service_painting_label',
    'service-flooring-label': 'service_flooring_label',
    'service-tiling-label': 'service_tiling_label',
    'request-message-label': 'request_message_label',
    'request-submit': 'request_submit'
  };
  // Apply text content for each mapped element
  Object.keys(mapping).forEach((id) => {
    const el = document.getElementById(id);
    const key = mapping[id];
    if (el && dict[key]) {
      el.textContent = dict[key];
    }
  });
  // Update placeholders for both forms
  const placeholderMapping = {
    'name': dict.placeholder_name,
    'email': dict.placeholder_email,
    'subject': dict.placeholder_subject,
    'message': dict.placeholder_message,
    'request-name': dict.placeholder_name,
    'request-email': dict.placeholder_email,
    'request-message': dict.placeholder_message
  };
  Object.keys(placeholderMapping).forEach((inputId) => {
    const inputEl = document.getElementById(inputId);
    const placeholderVal = placeholderMapping[inputId];
    if (inputEl && placeholderVal) {
      inputEl.placeholder = placeholderVal;
    }
  });
  // Update validation messages
  const validationMapping = {
    'validation-name': dict.validation_name,
    'validation-email': dict.validation_email,
    'validation-subject': dict.validation_subject,
    'validation-message': dict.validation_message,
    'request-name-validation': dict.request_name_validation || dict.validation_name,
    'request-email-validation': dict.request_email_validation || dict.validation_email,
    'request-message-validation': dict.request_message_validation || dict.validation_message
  };
  Object.keys(validationMapping).forEach((id) => {
    const el = document.getElementById(id);
    const msg = validationMapping[id];
    if (el && msg) {
      el.textContent = msg;
    }
  });
}

/**
 * Load a language JSON file and apply its translations.
 * Also updates images based on the language content.
 * @param {string} lang The language code to load (e.g., 'en', 'fr').
 */
function loadLanguage(lang) {
  // Fetch the translation JSON from the root-level /data directory. Using an
  // absolute path ensures the JSON loads correctly regardless of the current
  // page or subdirectory (e.g. `/en/`, `/fr/`).
  fetch(`/data/${lang}.json`)
    .then((response) => response.json())
    .then((data) => {
      applyTranslations(data);
      updateHeroImage(data.hero_image);
      updateGalleryImages(data.gallery_images);
    })
    .catch((error) => {
      console.error('Failed to load language file:', error);
    });
}

// On page load, set year, apply selected language, and handle language changes
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in the footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  const languageSelect = document.getElementById('language-select');
  // Retrieve stored language or default to English
  const storedLang = localStorage.getItem('site-language') || 'en';
  if (languageSelect) {
    languageSelect.value = storedLang;
    loadLanguage(storedLang);
    languageSelect.addEventListener('change', (e) => {
      const newLang = e.target.value;
      loadLanguage(newLang);
      localStorage.setItem('site-language', newLang);
    });
  } else {
    loadLanguage(storedLang);
  }
});

// Bootstrap form validation (unchanged from original template)
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all forms we want to apply custom validation styles to
    const forms = document.getElementsByClassName('needs-validation');
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();