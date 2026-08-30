/* ================================
MEHAK MAKEUP ARTIST
BUSINESS CONFIGURATION
================================ */

const BUSINESS_EMAIL = “golobbygamerz@gmail.com”;

/*
WhatsApp number:
India country code = 91
No +, spaces or dashes.

Number: 9310151087
*/
const WHATSAPP_NUMBER = “919310151087”;

/* ================================
BOOKING VARIABLES
================================ */

let selectedPeople = “”;
let selectedServices = [];
let selectedDate = “”;
let selectedTime = “”;
let currentBooking = null;

/* ================================
MOBILE MENU
================================ */

const menuBtn = document.getElementById(“menuBtn”);
const navMenu = document.getElementById(“navMenu”);

if (menuBtn) {
menuBtn.addEventListener(“click”, () => {
navMenu.classList.toggle(“open”);
});
}

document.querySelectorAll(”#navMenu a”).forEach(link => {
link.addEventListener(“click”, () => {
navMenu.classList.remove(“open”);
});
});

/* ================================
WHATSAPP ENQUIRY
================================ */

function openWhatsApp(message) {

const url =
“https://wa.me/” +
WHATSAPP_NUMBER +
“?text=” +
encodeURIComponent(message);

window.open(url, “_blank”);
}

function enquiryMessage() {

openWhatsApp(
“Hi Mehak, I would like to enquire about makeup services.”
);

}

document.getElementById(“heroWhatsapp”)
.addEventListener(“click”, enquiryMessage);

document.getElementById(“contactWhatsapp”)
.addEventListener(“click”, enquiryMessage);

document.getElementById(“floatingWhatsapp”)
.addEventListener(“click”, enquiryMessage);

/* ================================
SERVICE BOOK NOW BUTTONS
================================ */

document.querySelectorAll(”.book-service”).forEach(button => {

button.addEventListener(“click”, () => {

const service = button.dataset.service;
document.querySelectorAll(
  '.service-select input[type="checkbox"]'
).forEach(input => {
  input.checked = input.value === service;
});
selectedServices = [service];
document.getElementById("booking")
  .scrollIntoView({ behavior: "smooth" });
setTimeout(() => {
  showStep(2);
}, 400);

});

});

/* ================================
PEOPLE SELECTION
================================ */

document.querySelectorAll(”.people-options button”)
.forEach(button => {

button.addEventListener(“click”, () => {

document.querySelectorAll(".people-options button")
  .forEach(btn => btn.classList.remove("selected"));
button.classList.add("selected");
selectedPeople = button.dataset.people;

});

});

/* ================================
STEP SYSTEM
================================ */

function showStep(stepNumber) {

document.querySelectorAll(”.step”).forEach(step => {
step.classList.remove(“active”);
});

const step = document.querySelector(
.step[data-step="${stepNumber}"]
);

if (step) {
step.classList.add(“active”);
}

}

function requiredCustomerDetails() {

const name =
document.getElementById(“customerName”).value.trim();

const phone =
document.getElementById(“customerPhone”).value.trim();

const email =
document.getElementById(“customerEmail”).value.trim();

if (!name) {
alert(“Please enter your full name.”);
return false;
}

if (!phone) {
alert(“Please enter your mobile / WhatsApp number.”);
return false;
}

if (!/^[0-9+-\s]{8,15}$/.test(phone)) {
alert(“Please enter a valid mobile number.”);
return false;
}

if (!email) {
alert(“Please enter your email address.”);
return false;
}

if (!email.includes(”@”)) {
alert(“Please enter a valid email address.”);
return false;
}

if (!selectedPeople) {
alert(“Please select the number of people.”);
return false;
}

return true;

}

document.getElementById(“step1Next”)
.addEventListener(“click”, () => {

if (requiredCustomerDetails()) {
showStep(2);
}

});

/* ================================
SERVICE SELECTION
================================ */

document.querySelectorAll(
‘.service-select input[type=“checkbox”]’
).forEach(input => {

input.addEventListener(“change”, () => {

selectedServices = Array.from(
  document.querySelectorAll(
    '.service-select input[type="checkbox"]:checked'
  )
).map(item => item