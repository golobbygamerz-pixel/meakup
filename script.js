/* =========================================================
MEHAK MAKEUP ARTIST
Pure HTML + CSS + Vanilla JavaScript
========================================================= */

/* ================= CONFIGURATION ================= */

const CONFIG = {
artistName: “Mehak”,
businessEmail: “golobbygamerz@gmail.com”,

// IMPORTANT:
// Replace this with Mehak’s WhatsApp number.
// Use country code WITHOUT + or spaces.
// Example for India: 919876543210
whatsappNumber: “919XXXXXXXXX”,

paymentMethod: “Cash on Appointment”,

timeSlots: [
“9:00 AM”,
“10:30 AM”,
“12:00 PM”,
“2:00 PM”,
“4:00 PM”,
“6:00 PM”
]
};

/* ================= DOM ELEMENTS ================= */

const bookingForm = document.getElementById(“bookingForm”);
const steps = document.querySelectorAll(”.booking-step”);

const fullNameInput = document.getElementById(“fullName”);
const phoneInput = document.getElementById(“phone”);
const emailInput = document.getElementById(“email”);
const peopleInput = document.getElementById(“numberOfPeople”);

const addressInput = document.getElementById(“address”);
const cityInput = document.getElementById(“city”);
const landmarkInput = document.getElementById(“landmark”);

const dateScroller = document.getElementById(“dateScroller”);
const datePrev = document.getElementById(“datePrev”);
const dateNext = document.getElementById(“dateNext”);

const selectedDateInput = document.getElementById(“selectedDate”);
const selectedTimeInput = document.getElementById(“selectedTime”);

const selectedDateText = document.getElementById(“selectedDateText”);
const timeGrid = document.getElementById(“timeGrid”);

const confirmationModal = document.getElementById(“confirmationModal”);
const modalClose = document.getElementById(“modalClose”);

const modalBookingId = document.getElementById(“modalBookingId”);
const modalName = document.getElementById(“modalName”);
const modalServices = document.getElementById(“modalServices”);
const modalDateTime = document.getElementById(“modalDateTime”);
const modalPeople = document.getElementById(“modalPeople”);
const modalAddress = document.getElementById(“modalAddress”);

const modalWhatsapp = document.getElementById(“modalWhatsapp”);
const modalEmail = document.getElementById(“modalEmail”);

const summaryName = document.getElementById(“summaryName”);
const summaryPhone = document.getElementById(“summaryPhone”);
const summaryPeople = document.getElementById(“summaryPeople”);
const summaryServices = document.getElementById(“summaryServices”);
const summaryDate = document.getElementById(“summaryDate”);
const summaryTime = document.getElementById(“summaryTime”);
const summaryAddress = document.getElementById(“summaryAddress”);

const menuToggle = document.getElementById(“menuToggle”);
const navMenu = document.getElementById(“navMenu”);

const lightbox = document.getElementById(“lightbox”);
const lightboxImage = document.getElementById(“lightboxImage”);
const lightboxClose = document.getElementById(“lightboxClose”);

/* ================= STATE ================= */

let currentStep = 1;
let selectedPeople = “1”;
let selectedServices = [];
let selectedDateObject = null;
let selectedTime = “”;
let currentBooking = null;

/* ================= MOBILE MENU ================= */

if (menuToggle && navMenu) {

menuToggle.addEventListener(“click”, () => {
navMenu.classList.toggle(“active”);
menuToggle.classList.toggle(“active”);
});

navMenu.querySelectorAll(“a”).forEach(link => {

link.addEventListener("click", () => {
  navMenu.classList.remove("active");
  menuToggle.classList.remove("active");
});

});
}

/* ================= STEP NAVIGATION ================= */

function showStep(stepNumber) {

currentStep = stepNumber;

steps.forEach(step => {
step.classList.remove(“active”);

if (Number(step.dataset.step) === stepNumber) {
  step.classList.add("active");
}

});

document.getElementById(“booking”)?.scrollIntoView({
behavior: “smooth”,
block: “start”
});
}

document.querySelectorAll(”.next-btn”).forEach(button => {

button.addEventListener(“click”, () => {

const nextStep = Number(button.dataset.next);
if (!validateStep(currentStep)) {
  return;
}
showStep(nextStep);

});

});

document.querySelectorAll(”.back-btn”).forEach(button => {

button.addEventListener(“click”, () => {

const previousStep = Number(button.dataset.back);
showStep(previousStep);

});

});

/* ================= VALIDATION ================= */

function showError(message) {

alert(message);

}

function validateStep(stepNumber) {

if (stepNumber === 1) {

const name = fullNameInput.value.trim();
const phone = phoneInput.value.trim();
const email = emailInput.value.trim();
if (!name) {
  showError("Please enter your full name.");
  fullNameInput.focus();
  return false;
}
if (!phone) {
  showError("Please enter your WhatsApp / mobile number.");
  phoneInput.focus();
  return false;
}
if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
  showError("Please enter a valid mobile number.");
  phoneInput.focus();
  return false;
}
if (!email) {
  showError("Please enter your email address.");
  emailInput.focus();
  return false;
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  showError("Please enter a valid email address.");
  emailInput.focus();
  return false;
}
return true;

}

if (stepNumber === 2) {

if (selectedServices.length === 0) {
  showError("Please select at least one makeup service.");
  return false;
}
return true;

}

if (stepNumber === 3) {

if (!selectedDateObject) {
  showError("Please select an appointment date.");
  return false;
}
if (!selectedTime) {
  showError("Please select an available time slot.");
  return false;
}
return true;

}

if (stepNumber === 4) {

const address = addressInput.value.trim();
const city = cityInput.value.trim();
if (!address) {
  showError("Please enter the complete appointment address.");
  addressInput.focus();
  return false;
}
if (!city) {
  showError("Please enter your city.");
  cityInput.focus();
  return false;
}
const confirmation = document.getElementById("confirmInfo");
if (!confirmation.checked) {
  showError("Please confirm that your information is correct.");
  return false;
}
return true;

}

return true;
}

/* ================= NUMBER OF PEOPLE ================= */

document.querySelectorAll(”.people-btn”).forEach(button => {

button.addEventListener(“click”, () => {

document.querySelectorAll(".people-btn").forEach(btn => {
  btn.classList.remove("active");
});
button.classList.add("active");
selectedPeople = button.dataset.people;
peopleInput.value = selectedPeople;
summaryPeople.textContent =
  selectedPeople === "1"
    ? "1 Person"
    : `${selectedPeople} People`;

});

});

/* ================= SERVICE SELECTION ================= */

document.querySelectorAll(‘input[name=“services”]’).forEach(input => {

input.addEventListener(“change”, () => {

selectedServices = Array.from(
  document.querySelectorAll('input[name="services"]:checked')
).map(service => service.value);
updateSummary();

});

});

/* ================= BOOK NOW BUTTONS ================= */

document.querySelectorAll(”.service-book”).forEach(button => {

button.addEventListener(“click”, () => {

const service = button.dataset.service;
document.querySelectorAll('input[name="services"]').forEach(input => {
  input.checked = input.value === service;
});
selectedServices = [service];
updateSummary();
showStep(2);

});

});

/* ================= DATE GENERATION ================= */

function generateDates() {

dateScroller.innerHTML = “”;

const today = new Date();

today.setHours(0, 0, 0, 0);

for (let i = 0; i < 45; i++) {

const date = new Date(today);
date.setDate(today.getDate() + i);
const card = document.createElement("button");
card.type = "button";
card.className = "date-card";
const dayName = date.toLocaleDateString("en-US", {
  weekday: "short"
}).toUpperCase();
const monthName = date.toLocaleDateString("en-US", {
  month: "short"
}).toUpperCase();
const dayNumber = date.getDate();
card.innerHTML = `
  <span class="date-day">${dayName}</span>
  <span class="date-number">${dayNumber}</span>
  <span class="date-month">${monthName}</span>
`;
card.dataset.date =
  formatDateForStorage(date);
card.addEventListener("click", () => {
  selectDate(date, card);
});
dateScroller.appendChild(card);

}

}

function formatDateForStorage(date) {

const year = date.getFullYear();

const month = String(
date.getMonth() + 1
).padStart(2, “0”);

const day = String(
date.getDate()
).padStart(2, “0”);

return ${year}-${month}-${day};

}

/* ================= DATE SELECTION ================= */

function selectDate(date, card) {

selectedDateObject = new Date(date);

selectedDateObject.setHours(0, 0, 0, 0);

selectedDateInput.value =
formatDateForStorage(selectedDateObject);

document.querySelectorAll(”.date-card”).forEach(item => {
item.classList.remove(“selected”);
});

card.classList.add(“selected”);

selectedDateText.textContent =
selectedDateObject.toLocaleDateString(“en-US”, {
weekday: “long”,
day: “numeric”,
month: “long”,
year: “numeric”
});

selectedTime = “”;
selectedTimeInput.value = “”;

generateTimeSlots();

updateSummary();

}

/* ================= TIME SLOTS ================= */

function generateTimeSlots() {

timeGrid.innerHTML = “”;

CONFIG.timeSlots.forEach(time => {

const button = document.createElement("button");
button.type = "button";
button.className = "time-slot";
button.textContent = time;
/*
  DEMO AVAILABILITY
  You can manually make specific slots unavailable below.
  Example:
  const unavailableSlots = ["12:00 PM", "4:00 PM"];
  Currently no slots are blocked.
*/
const unavailableSlots = [];
if (unavailableSlots.includes(time)) {
  button.disabled = true;
  button.textContent = `${time} — Booked`;
} else {
  button.addEventListener("click", () => {
    document.querySelectorAll(".time-slot").forEach(slot => {
      slot.classList.remove("selected");
    });
    button.classList.add("selected");
    selectedTime = time;
    selectedTimeInput.value = time;
    updateSummary();
  });
}
timeGrid.appendChild(button);

});

}

/* ================= DATE ARROWS ================= */

if (datePrev) {

datePrev.addEventListener(“click”, () => {

dateScroller.scrollBy({
  left: -250,
  behavior: "smooth"
});

});

}

if (dateNext) {

dateNext.addEventListener(“click”, () => {

dateScroller.scrollBy({
  left: 250,
  behavior: "smooth"
});

});

}

/* ================= LIVE SUMMARY ================= */

function updateSummary() {

const name = fullNameInput.value.trim();
const phone = phoneInput.value.trim();

summaryName.textContent =
name || “—”;

summaryPhone.textContent =
phone || “—”;

summaryPeople.textContent =
selectedPeople === “1”
? “1 Person”
: ${selectedPeople} People;

if (selectedServices.length > 0) {

summaryServices.innerHTML =
  selectedServices
    .map(service => `• ${escapeHTML(service)}`)
    .join("<br>");

} else {

summaryServices.textContent =
  "No service selected";

}

if (selectedDateObject) {

summaryDate.textContent =
  selectedDateObject.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

} else {

summaryDate.textContent = "—";

}

summaryTime.textContent =
selectedTime || “—”;

const address = addressInput.value.trim();
const city = cityInput.value.trim();

if (address || city) {

summaryAddress.textContent =
  [address, city]
    .filter(Boolean)
    .join(", ");

} else {

summaryAddress.textContent = "—";

}

}

/* ================= LIVE INPUT LISTENERS ================= */

[
fullNameInput,
phoneInput,
emailInput,
addressInput,
cityInput,
landmarkInput
].forEach(input => {

if (input) {

input.addEventListener("input", updateSummary);

}

});

/* ================= BOOKING ID ================= */

function generateBookingID() {

const year = new Date().getFullYear();

const randomNumber =
Math.floor(1000 + Math.random() * 9000);

return MH-${year}-${randomNumber};

}

/* ================= CREATE BOOKING DATA ================= */

function createBooking() {

return {

id: generateBookingID(),
name: fullNameInput.value.trim(),
phone: phoneInput.value.trim(),
email: emailInput.value.trim(),
people: selectedPeople,
services: [...selectedServices],
date: selectedDateObject,
dateString: selectedDateInput.value,
time: selectedTime,
address: addressInput.value.trim(),
city: cityInput.value.trim(),
landmark: landmarkInput.value.trim(),
payment: CONFIG.paymentMethod

};

}

/* ================= FORMAT DATE ================= */

function formatReadableDate(date) {

if (!date) {
return “Not selected”;
}

return date.toLocaleDateString(“en-IN”, {
weekday: “long”,
day: “numeric”,
month: “long”,
year: “numeric”
});

}

/* ================= ESCAPE HTML ================= */

function escapeHTML(value) {

return String(value)
.replaceAll(”&”, “&”)
.replaceAll(”<”, “<”)
.replaceAll(”>”, “>”)
.replaceAll(’”’, “"”)
.replaceAll(”’”, “'”);

}

/* ================= WHATSAPP MESSAGE ================= */

function createWhatsAppMessage(booking) {

const services =
booking.services
.map(service => • ${service})
.join(”\n”);

return `NEW APPOINTMENT REQUEST

Booking ID: ${booking.id}

Customer Name: ${booking.name}

Phone: ${booking.phone}

Email: ${booking.email}

Number of People: ${booking.people}

Services:
${services}

Date: ${formatReadableDate(booking.date)}

Time: ${booking.time}

Full Address:
${booking.address}

City:
${booking.city}

Landmark:
${booking.landmark || “Not provided”}

Payment:
Cash on Appointment

Please confirm this appointment.`;

}

/* ================= OPEN WHATSAPP ================= */

function openWhatsApp(booking) {

if (
!CONFIG.whatsappNumber ||
CONFIG.whatsappNumber.includes(“XXXXXXXX”)
) {

alert(
  "Please add Mehak's real WhatsApp number in script.js first."
);
return;

}

const message =
createWhatsAppMessage(booking);

const whatsappURL =
https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)};

window.open(
whatsappURL,
“_blank”,
“noopener,noreferrer”
);

}

/* ================= EMAIL ================= */

function createEmailSubject(booking) {

return New Makeup Appointment - ${booking.name} - ${formatReadableDate(booking.date)};

}

function createEmailBody(booking) {

const services =
booking.services
.map(service => • ${service})
.join(”\n”);

return `NEW MAKEUP APPOINTMENT

Booking ID: ${booking.id}

Customer Name: ${booking.name}

Phone Number: ${booking.phone}

Customer Email: ${booking.email}

Number of People: ${booking.people}

Services:
${services}

Appointment Date:
${formatReadableDate(booking.date)}

Appointment Time:
${booking.time}

Full Address:
${booking.address}

City:
${booking.city}

Landmark:
${booking.landmark || “Not provided”}

Payment Method:
Cash on Appointment

⸻

This appointment request was created through the Mehak Makeup Artist website.`;

}

/* ================= OPEN EMAIL ================= */

function openEmail(booking) {

const subject =
encodeURIComponent(
createEmailSubject(booking)
);

const body =
encodeURIComponent(
createEmailBody(booking)
);

const mailto =
mailto:${CONFIG.businessEmail}?subject=${subject}&body=${body};

window.location.href = mailto;

}

/* ================= FORM SUBMIT ================= */

if (bookingForm) {

bookingForm.addEventListener(“submit”, event => {

event.preventDefault();
if (!validateStep(4)) {
  return;
}
currentBooking = createBooking();
showConfirmation(currentBooking);

});

}

/* ================= CONFIRMATION MODAL ================= */

function showConfirmation(booking) {

modalBookingId.textContent =
booking.id;

modalName.textContent =
booking.name;

modalServices.textContent =
booking.services.join(”, “);

modalDateTime.textContent =
${formatReadableDate(booking.date)} • ${booking.time};

modalPeople.textContent =
booking.people === “1”
? “1 Person”
: ${booking.people} People;

modalAddress.textContent =
${booking.address}, ${booking.city}${booking.landmark ? , ${booking.landmark} : ""};

confirmationModal.classList.add(“active”);

document.body.classList.add(“no-scroll”);

}

/* ================= CLOSE MODAL ================= */

function closeModal() {

confirmationModal.classList.remove(“active”);

document.body.classList.remove(“no-scroll”);

}

if (modalClose) {

modalClose.addEventListener(
“click”,
closeModal
);

}

if (confirmationModal) {

confirmationModal
.querySelector(”.modal-overlay”)
?.addEventListener(
“click”,
closeModal
);

}

/* ================= MODAL WHATSAPP ================= */

if (modalWhatsapp) {

modalWhatsapp.addEventListener(“click”, () => {

if (currentBooking) {
  openWhatsApp(currentBooking);
}

});

}

/* ================= MODAL EMAIL ================= */

if (modalEmail) {

modalEmail.addEventListener(“click”, () => {

if (currentBooking) {
  openEmail(currentBooking);
}

});

}

/* ================= WHATSAPP LINKS ================= */

function setupWhatsAppLinks() {

document.querySelectorAll(”.whatsapp-link”).forEach(link => {

link.addEventListener("click", event => {
  event.preventDefault();
  const message =
    "Hi Mehak, I would like to enquire about makeup services.";
  if (
    !CONFIG.whatsappNumber ||
    CONFIG.whatsappNumber.includes("XXXXXXXX")
  ) {
    alert(
      "Please add Mehak's real WhatsApp number in script.js first."
    );
    return;
  }
  const url =
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
});

});

}

/* ================= GALLERY LIGHTBOX ================= */

document.querySelectorAll(”.gallery-item img”).forEach(image => {

image.addEventListener(“click”, () => {

lightboxImage.src = image.src;
lightboxImage.alt = image.alt;
lightbox.classList.add("active");
document.body.classList.add("no-scroll");

});

});

function closeLightbox() {

lightbox.classList.remove(“active”);

lightboxImage.src = “”;

document.body.classList.remove(“no-scroll”);

}

if (lightboxClose) {

lightboxClose.addEventListener(
“click”,
closeLightbox
);

}

if (lightbox) {

lightbox.addEventListener(“click”, event => {

if (event.target === lightbox) {
  closeLightbox();
}

});

}

/* ================= ESC KEY ================= */

document.addEventListener(“keydown”, event => {

if (event.key === “Escape”) {

closeModal();
closeLightbox();

}

});

/* ================= SCROLL ANIMATIONS ================= */

const animatedElements = document.querySelectorAll(
“.service-card, .review-card, .about-content, .about-image, .gallery-item, .booking-form-card, .booking-summary, .contact-item”
);

const observer =
new IntersectionObserver(
entries => {

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
},
{
  threshold: 0.08
}

);

animatedElements.forEach(element => {

element.style.opacity = “0”;
element.style.transform = “translateY(20px)”;
element.style.transition =
“opacity 0.7s ease, transform 0.7s ease”;

observer.observe(element);

});

/* ================= INITIALIZE ================= */

generateDates();

generateTimeSlots();

setupWhatsAppLinks();

updateSummary();

/* Automatically select today’s date */

const firstDate =
dateScroller.querySelector(”.date-card”);

if (firstDate) {

firstDate.click();

}

/* ================= CONSOLE MESSAGE ================= */

console.log(
%c${CONFIG.artistName} Makeup Artist Website,
“font-size:18px;font-weight:bold;”
);

console.log(
“Website successfully loaded.”
);