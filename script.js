/* =========================================================
   MEHAK MAKEUP ARTIST
   EASY BUSINESS SETTINGS
   ========================================================= */

const CONFIG = {
  artistName: "Mehak",
  businessEmail: "golobbygamerz@gmail.com",

  // WhatsApp MUST contain country code.
  // 91 + 9310151087 = 919310151087
  whatsappNumber: "919310151087",

  paymentMethod: "Cash on Appointment",

  // Demo unavailable slots.
  // Change these whenever you want.
  unavailableSlots: {
    // "2026-09-01": ["10:30 AM", "4:00 PM"],
    // "2026-09-02": ["12:00 PM"]
  }
};


/* =========================================================
   GLOBAL STATE
   ========================================================= */

const state = {
  step: 1,
  people: "1",
  services: [],
  date: "",
  dateLabel: "",
  time: "",
  bookingId: "",
  booking: null
};


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  setupNavigation();
  setupServiceButtons();
  setupBookingServices();
  setupPeopleSelector();
  setupBookingSteps();
  setupDates();
  setupTimeSlots();
  setupCalendarFallback();
  setupFormValidation();
  setupGallery();
  setupRevealAnimations();
  setupWhatsAppLinks();
  setupSuccessButtons();

});


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open");

  });

  navMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      menuToggle.classList.remove("active");
      navMenu.classList.remove("open");
      document.body.classList.remove("menu-open");

    });

  });

}


/* =========================================================
   SERVICE CARDS → BOOKING FORM
   ========================================================= */

function setupServiceButtons() {

  document.querySelectorAll(".service-book").forEach(button => {

    button.addEventListener("click", () => {

      const card = button.closest(".service-card");

      if (!card) return;

      const service = card.dataset.service;

      const checkbox = document.querySelector(
        `.service-check input[value="${CSS.escape(service)}"]`
      );

      if (checkbox) {
        checkbox.checked = true;
      }

      state.services = getSelectedServices();

      scrollToBooking();

      showBookingStep(2);

      updateServiceVisuals();

      showToast(`${service} selected`);

    });

  });

}


/* =========================================================
   BOOKING SERVICE CHECKBOXES
   ========================================================= */

function setupBookingServices() {

  document.querySelectorAll(".service-check input").forEach(input => {

    input.addEventListener("change", () => {

      state.services = getSelectedServices();

      updateServiceVisuals();

    });

  });

}


function getSelectedServices() {

  return [...document.querySelectorAll(".service-check input:checked")]
    .map(input => input.value);

}


function updateServiceVisuals() {

  document.querySelectorAll(".service-check").forEach(item => {

    const checkbox = item.querySelector("input");

    item.classList.toggle("selected", checkbox.checked);

  });

}


/* =========================================================
   PEOPLE SELECTOR
   ========================================================= */

function setupPeopleSelector() {

  document.querySelectorAll(".people-option").forEach(button => {

    button.addEventListener("click", () => {

      document.querySelectorAll(".people-option")
        .forEach(item => item.classList.remove("selected"));

      button.classList.add("selected");

      state.people = button.dataset.people;

    });

  });

}


/* =========================================================
   BOOKING STEPS
   ========================================================= */

function setupBookingSteps() {

  document.querySelectorAll(".next-step").forEach(button => {

    button.addEventListener("click", () => {

      const currentStep = Number(
        button.closest(".booking-step").dataset.step
      );

      if (validateStep(currentStep)) {

        showBookingStep(currentStep + 1);

      }

    });

  });


  document.querySelectorAll(".prev-step").forEach(button => {

    button.addEventListener("click", () => {

      const currentStep = Number(
        button.closest(".booking-step").dataset.step
      );

      showBookingStep(currentStep - 1);

    });

  });


  document.getElementById("confirmBtn")
    ?.addEventListener("click", confirmAppointment);

}


function showBookingStep(step) {

  if (step < 1 || step > 4) return;

  state.step = step;

  document.querySelectorAll(".booking-step").forEach(section => {

    section.classList.toggle(
      "active",
      Number(section.dataset.step) === step
    );

  });


  document.querySelectorAll(".progress-item").forEach(item => {

    const itemStep = Number(item.dataset.stepIndicator);

    item.classList.toggle("active", itemStep === step);
    item.classList.toggle("done", itemStep < step);

  });


  if (step === 4) {

    updateSummary();

  }

}


/* =========================================================
   VALIDATION
   ========================================================= */

function validateStep(step) {

  clearErrors();

  if (step === 1) {

    const name = document.getElementById("customerName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");

    let valid = true;

    if (name.value.trim().length < 2) {

      showFieldError(name, "Please enter your full name.");
      valid = false;

    }

    const cleanPhone = phone.value.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {

      showFieldError(phone, "Enter a valid 10-digit mobile number.");
      valid = false;

    }

    if (!isValidEmail(email.value.trim())) {

      showFieldError(email, "Enter a valid email address.");
      valid = false;

    }

    if (!state.people) {

      document.getElementById("peopleError").textContent =
        "Please select the number of people.";

      valid = false;

    }

    return valid;
  }


  if (step === 2) {

    state.services = getSelectedServices();

    const error = document.getElementById("serviceError");

    if (state.services.length === 0) {

      error.textContent = "Please select at least one service.";
      return false;

    }

    return true;
  }


  if (step === 3) {

    let valid = true;

    if (!state.date) {

      document.getElementById("dateError").textContent =
        "Please select an appointment date.";

      valid = false;

    }

    if (!state.time) {

      document.getElementById("dateError").textContent +=
        " Please select a time slot.";

      valid = false;

    }

    return valid;
  }


  if (step === 4) {

    return validateLocation();

  }


  return true;
}


function validateLocation() {

  const address = document.getElementById("address");
  const city = document.getElementById("city");

  let valid = true;

  if (address.value.trim().length < 10) {

    showFieldError(
      address,
      "Please enter the complete appointment address."
    );

    valid = false;

  }

  if (city.value.trim().length < 2) {

    showFieldError(
      city,
      "Please enter the city."
    );

    valid = false;

  }

  return valid;

}


function showFieldError(field, message) {

  field.classList.add("invalid");

  const wrapper = field.closest(".field");

  if (!wrapper) return;

  const error = wrapper.querySelector(".field-error");

  if (error) {
    error.textContent = message;
  }

}


function clearErrors() {

  document.querySelectorAll(".field-error")
    .forEach(error => error.textContent = "");

  document.querySelectorAll(".invalid")
    .forEach(field => field.classList.remove("invalid"));

}


/* =========================================================
   DYNAMIC DATES
   ========================================================= */

function setupDates() {

  const scroller = document.getElementById("dateScroller");

  if (!scroller) return;

  scroller.innerHTML = "";

  const today = new Date();

  for (let i = 0; i < 45; i++) {

    const date = new Date(today);

    date.setHours(0,0,0,0);
    date.setDate(today.getDate() + i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const iso = `${year}-${month}-${day}`;

    const weekday = date.toLocaleDateString("en-US", {
      weekday: "short"
    }).toUpperCase();

    const monthName = date.toLocaleDateString("en-US", {
      month: "short"
    }).toUpperCase();

    const button = document.createElement("button");

    button.type = "button";
    button.className = "date-card";

    button.dataset.date = iso;

    button.innerHTML = `
      <small>${weekday}</small>
      <strong>${day}</strong>
      <span>${monthName}</span>
    `;

    button.addEventListener("click", () => {

      selectDate(iso, date, button);

    });

    scroller.appendChild(button);

  }


  // Automatically select today's date
  const firstDate = scroller.querySelector(".date-card");

  if (firstDate) {

    const todayDate = new Date();

    selectDate(
      firstDate.dataset.date,
      todayDate,
      firstDate
    );

  }

}


function selectDate(iso, dateObject, button) {

  state.date = iso;

  state.dateLabel = dateObject.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  document.querySelectorAll(".date-card")
    .forEach(item => item.classList.remove("selected"));

  button?.classList.add("selected");

  const calendar = document.getElementById("calendarDate");

  if (calendar) {
    calendar.value = iso;
  }

  updateTimeAvailability();

  state.time = "";

  document.querySelectorAll(".time-slot")
    .forEach(slot => slot.classList.remove("selected"));

}


/* =========================================================
   CALENDAR FALLBACK
   ========================================================= */

function setupCalendarFallback() {

  const calendar = document.getElementById("calendarDate");

  if (!calendar) return;

  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const todayISO = `${yyyy}-${mm}-${dd}`;

  calendar.min = todayISO;

  calendar.addEventListener("change", () => {

    if (!calendar.value) return;

    const selectedDate = new Date(
      `${calendar.value}T00:00:00`
    );

    const card = document.querySelector(
      `.date-card[data-date="${calendar.value}"]`
    );

    selectDate(
      calendar.value,
      selectedDate,
      card
    );

    if (!card) {

      document.querySelectorAll(".date-card")
        .forEach(item => item.classList.remove("selected"));

    }

  });

}


/* =========================================================
   TIME SLOTS
   ========================================================= */

function setupTimeSlots() {

  document.querySelectorAll(".time-slot").forEach(button => {

    button.addEventListener("click", () => {

      if (button.disabled || button.classList.contains("unavailable")) {
        return;
      }

      document.querySelectorAll(".time-slot")
        .forEach(slot => slot.classList.remove("selected"));

      button.classList.add("selected");

      state.time = button.dataset.time;

    });

  });

}


function updateTimeAvailability() {

  const unavailable =
    CONFIG.unavailableSlots[state.date] || [];

  document.querySelectorAll(".time-slot").forEach(slot => {

    const time = slot.dataset.time;

    const isUnavailable =
      unavailable.includes(time);

    slot.disabled = isUnavailable;
    slot.classList.toggle("unavailable", isUnavailable);

    if (isUnavailable) {
      slot.classList.remove("selected");
    }

  });

}


/* =========================================================
   SUMMARY
   ========================================================= */

function updateSummary() {

  state.services = getSelectedServices();

  document.getElementById("summaryName").textContent =
    document.getElementById("customerName").value.trim() || "—";

  document.getElementById("summaryPhone").textContent =
    document.getElementById("phone").value.trim() || "—";

  document.getElementById("summaryEmail").textContent =
    document.getElementById("email").value.trim() || "—";

  document.getElementById("summaryPeople").textContent =
    state.people || "—";

  document.getElementById("summaryServices").textContent =
    state.services.length
      ? state.services.join(", ")
      : "—";

  document.getElementById("summaryDate").textContent =
    state.dateLabel || "—";

  document.getElementById("summaryTime").textContent =
    state.time || "—";

  document.getElementById("summaryAddress").textContent =
    document.getElementById("address").value.trim() || "—";

  document.getElementById("summaryCity").textContent =
    document.getElementById("city").value.trim() || "—";

  if (!state.bookingId) {
    state.bookingId = generateBookingId();
  }

  document.getElementById("summaryId").textContent =
    state.bookingId;

}


/* =========================================================
   CONFIRM APPOINTMENT
   ========================================================= */

function confirmAppointment() {

  if (!validateStep(4)) {
    return;
  }

  state.services = getSelectedServices();

  if (!state.bookingId) {
    state.bookingId = generateBookingId();
  }

  state.booking = {

    bookingId: state.bookingId,

    name: document.getElementById("customerName")
      .value.trim(),

    phone: document.getElementById("phone")
      .value.trim(),

    email: document.getElementById("email")
      .value.trim(),

    people: state.people,

    services: [...state.services],

    date: state.dateLabel,

    time: state.time,

    address: document.getElementById("address")
      .value.trim(),

    city: document.getElementById("city")
      .value.trim(),

    landmark: document.getElementById("landmark")
      .value.trim(),

    payment: CONFIG.paymentMethod

  };


  showSuccessPanel();

}


/* =========================================================
   BOOKING ID
   ========================================================= */

function generateBookingId() {

  const year = new Date().getFullYear();

  const random =
    Math.floor(1000 + Math.random() * 9000);

  return `MH-${year}-${random}`;

}


/* =========================================================
   SUCCESS PANEL
   ========================================================= */

function showSuccessPanel() {

  document.getElementById("bookingForm")
    .style.display = "none";

  document.querySelector(".booking-progress")
    .style.display = "none";

  document.getElementById("successPanel")
    .classList.add("active");

  document.getElementById("successId")
    .textContent = state.booking.bookingId;

  renderSuccessDetails();

}


function renderSuccessDetails() {

  const b = state.booking;

  const container =
    document.getElementById("successDetails");

  container.innerHTML = `

    <div class="success-detail">
      <span>Customer</span>
      <strong>${escapeHTML(b.name)}</strong>
    </div>

    <div class="success-detail">
      <span>Services</span>
      <strong>${escapeHTML(b.services.join(", "))}</strong>
    </div>

    <div class="success-detail">
      <span>People</span>
      <strong>${escapeHTML(b.people)}</strong>
    </div>

    <div class="success-detail">
      <span>Date</span>
      <strong>${escapeHTML(b.date)}</strong>
    </div>

    <div class="success-detail">
      <span>Time</span>
      <strong>${escapeHTML(b.time)}</strong>
    </div>

    <div class="success-detail">
      <span>Address</span>
      <strong>${escapeHTML(b.address)}, ${escapeHTML(b.city)}</strong>
    </div>

    <div class="success-detail">
      <span>Payment</span>
      <strong>${escapeHTML(b.payment)}</strong>
    </div>

  `;

}


/* =========================================================
   WHATSAPP MESSAGE
   ========================================================= */

function buildWhatsAppMessage() {

  const b = state.booking;

  return `NEW APPOINTMENT REQUEST

Booking ID: ${b.bookingId}

Customer Name: ${b.name}

Phone: ${b.phone}

Email: ${b.email}

Number of People: ${b.people}

Services:
${b.services.map(service => `• ${service}`).join("\n")}

Date: ${b.date}

Time: ${b.time}

Full Address:
${b.address}

City:
${b.city}

Landmark:
${b.landmark || "Not provided"}

Payment:
Cash on Appointment

Please confirm availability and appointment details.

— Mehak Makeup Artist`;
}


function sendBookingWhatsApp() {

  if (!state.booking) return;

  const message = buildWhatsAppMessage();

  const url =
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

}


/* =========================================================
   EMAIL
   ========================================================= */

function buildEmailSubject() {

  const b = state.booking;

  return `New Makeup Appointment - ${b.name} - ${b.date}`;

}


function buildEmailBody() {

  const b = state.booking;

  return `NEW MAKEUP APPOINTMENT

Booking ID: ${b.bookingId}

Customer Name: ${b.name}

Phone Number: ${b.phone}

Customer Email: ${b.email}

Number of People: ${b.people}

Services:
${b.services.map(service => `• ${service}`).join("\n")}

Appointment Date:
${b.date}

Appointment Time:
${b.time}

Full Address:
${b.address}

City:
${b.city}

Landmark:
${b.landmark || "Not provided"}

Payment Method:
Cash on Appointment

--------------------------------

This is an appointment request sent from the Mehak Makeup Artist website.

Please confirm availability directly with the customer.`;

}


function sendBookingEmail() {

  if (!state.booking) return;

  const subject =
    encodeURIComponent(buildEmailSubject());

  const body =
    encodeURIComponent(buildEmailBody());

  const mailto =
    `mailto:${CONFIG.businessEmail}?subject=${subject}&body=${body}`;

  window.location.href = mailto;

}


/* =========================================================
   SUCCESS BUTTONS
   ========================================================= */

function setupSuccessButtons() {

  document.getElementById("sendWhatsappBtn")
    ?.addEventListener("click", sendBookingWhatsApp);

  document.getElementById("sendEmailBtn")
    ?.addEventListener("click", sendBookingEmail);

  document.getElementById("newBookingBtn")
    ?.addEventListener("click", resetBooking);

}


/* =========================================================
   RESET BOOKING
   ========================================================= */

function resetBooking() {

  state.step = 1;
  state.people = "1";
  state.services = [];
  state.date = "";
  state.dateLabel = "";
  state.time = "";
  state.bookingId = "";
  state.booking = null;

  document.getElementById("bookingForm").reset();

  document.querySelectorAll(".people-option")
    .forEach(item => item.classList.remove("selected"));

  document.querySelector(".people-option")
    ?.classList.add("selected");

  document.querySelectorAll(".service-check input")
    .forEach(input => input.checked = false);

  document.querySelectorAll(".time-slot")
    .forEach(slot => slot.classList.remove("selected"));

  document.getElementById("successPanel")
    .classList.remove("active");

  document.getElementById("bookingForm")
    .style.display = "";

  document.querySelector(".booking-progress")
    .style.display = "";

  showBookingStep(1);

  clearErrors();

  scrollToBooking();

}


/* =========================================================
   WHATSAPP LINKS
   ========================================================= */

function setupWhatsAppLinks() {

  const message =
    "Hi Mehak, I would like to enquire about makeup services.";

  const url =
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll(".whatsapp-link")
    .forEach(link => {

      link.href = url;

    });

}


/* =========================================================
   GALLERY LIGHTBOX
   ========================================================= */

function setupGallery() {

  const lightbox =
    document.getElementById("lightbox");

  const image =
    document.getElementById("lightboxImage");

  const close =
    document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-item")
    .forEach(item => {

      item.addEventListener("click", () => {

        const src = item.dataset.image;

        image.src = src;

        lightbox.classList.add("active");

        document.body.classList.add("menu-open");

      });

    });


  close.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });


  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeLightbox();
    }

  });


  function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("menu-open");

  }

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function setupRevealAnimations() {

  const elements =
    document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {

    elements.forEach(element => {
      element.classList.add("visible");
    });

    return;

  }

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: .12
      }
    );

  elements.forEach(element => {
    observer.observe(element);
  });

}


/* =========================================================
   FORM VALIDATION HELPERS
   ========================================================= */

function isValidEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


document.querySelectorAll?.("input, textarea");


/* =========================================================
   INPUT CLEANUP
   ========================================================= */

document.addEventListener("input", event => {

  const target = event.target;

  if (
    target.matches("#customerName") ||
    target.matches("#phone") ||
    target.matches("#email") ||
    target.matches("#address") ||
    target.matches("#city")
  ) {

    target.classList.remove("invalid");

    const error =
      target.closest(".field")?.querySelector(".field-error");

    if (error) {
      error.textContent = "";
    }

  }

});


/* =========================================================
   SCROLL TO BOOKING
   ========================================================= */

function scrollToBooking() {

  const booking =
    document.getElementById("booking");

  if (!booking) return;

  booking.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;

function showToast(message) {

  const toast =
    document.getElementById("toast");

  const text =
    document.getElementById("toastText");

  if (!toast || !text) return;

  text.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}


/* =========================================================
   SECURITY / DISPLAY HELPER
   ========================================================= */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   OPTIONAL DEMO AVAILABILITY EXAMPLE

   To block slots, edit CONFIG at the top:

   unavailableSlots: {
     "2026-09-01": ["10:30 AM", "4:00 PM"],
     "2026-09-02": ["12:00 PM"]
   }

   IMPORTANT:
   This is only frontend/demo availability.
   It does NOT synchronize bookings between customers.
   ========================================================= */