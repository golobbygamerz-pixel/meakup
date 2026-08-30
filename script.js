/* =========================================
MEHAK MAKEUP ARTIST
BUSINESS SETTINGS
========================================= */

const BUSINESS_EMAIL = “golobbygamerz@gmail.com”;

/*
Mehak WhatsApp number
India country code +91
Do NOT add +, spaces or dashes.
*/
const WHATSAPP_NUMBER = “919310151087”;

/* =========================================
BOOKING VARIABLES
========================================= */

let selectedPeople = “”;
let selectedServices = [];
let selectedDate = “”;
let selectedTime = “”;
let currentBooking = null;

/* =========================================
MOBILE MENU
========================================= */

const menuBtn = document.getElementById(“menuBtn”);
const navMenu = document.getElementById(“navMenu”);

menuBtn.addEventListener(“click”, () => {
navMenu.classList.toggle(“open”);
});

document.querySelectorAll(”#navMenu a”).forEach(link => {

link.addEventListener(“click”, () => {
navMenu.classList.remove(“open”);
});

});

/* =========================================
SHOW BOOKING STEP
========================================= */

function showStep(number) {

document.querySelectorAll(”.booking-step”)
.forEach(step => step.classList.remove(“active”));

const selectedStep =
document.getElementById(“step” + number);

if (selectedStep) {
selectedStep.classList.add(“active”);
}

}

/* =========================================
PEOPLE SELECTION
========================================= */

document.querySelectorAll(”.people button”)
.forEach(button => {

button.addEventListener(“click”, () => {

document.querySelectorAll(".people button")
  .forEach(btn => btn.classList.remove("selected"));
button.classList.add("selected");
selectedPeople = button.dataset.people;

});

});

/* =========================================
SERVICE BOOK NOW
========================================= */

document.querySelectorAll(”.service-btn”)
.forEach(button => {

button.addEventListener(“click”, () => {

const service = button.dataset.service;
document.querySelectorAll(
  '.service-selection input[type="checkbox"]'
).forEach(input => {
  input.checked = input.value === service;
});
selectedServices = [service];
document.getElementById("booking")
  .scrollIntoView({
    behavior: "smooth"
  });
setTimeout(() => {
  showStep(2);
}, 500);

});

});

/* =========================================
CUSTOMER DETAILS
========================================= */

document.getElementById(“next1”)
.addEventListener(“click”, () => {

const name =
document.getElementById(“customerName”)
.value.trim();

const phone =
document.getElementById(“customerPhone”)
.value.trim();

const email =
document.getElementById(“customerEmail”)
.value.trim();

if (!name) {
alert(“Please enter your full name.”);
return;
}

if (!phone) {
alert(“Please enter your mobile / WhatsApp number.”);
return;
}

if (!/^[0-9+-\s]{8,15}$/.test(phone)) {
alert(“Please enter a valid mobile number.”);
return;
}

if (!email) {
alert(“Please enter your email address.”);
return;
}

if (!email.includes(”@”)) {
alert(“Please enter a valid email address.”);
return;
}

if (!selectedPeople) {
alert(“Please select the number of people.”);
return;
}

showStep(2);

});

/* =========================================
SERVICES
========================================= */

document.querySelectorAll(
‘.service-selection input[type=“checkbox”]’
).forEach(input => {

input.addEventListener(“change”, () => {

selectedServices =
  Array.from(
    document.querySelectorAll(
      '.service-selection input[type="checkbox"]:checked'
    )
  ).map(item => item.value);

});

});

document.getElementById(“next2”)
.addEventListener(“click”, () => {

selectedServices =
Array.from(
document.querySelectorAll(
‘.service-selection input[type=“checkbox”]:checked’
)
).map(item => item.value);

if (selectedServices.length === 0) {

alert("Please select at least one service.");
return;

}

showStep(3);

});

/* =========================================
DATES
========================================= */

const dateList =
document.getElementById(“dateList”);

function createDates() {

dateList.innerHTML = “”;

const today = new Date();

for (let i = 0; i < 45; i++) {

const date = new Date();
date.setHours(0, 0, 0, 0);
date.setDate(today.getDate() + i);
const button =
  document.createElement("button");
button.type = "button";
button.className = "date-option";
const day =
  date.toLocaleDateString("en-US", {
    weekday: "short"
  }).toUpperCase();
const month =
  date.toLocaleDateString("en-US", {
    month: "short"
  }).toUpperCase();
button.innerHTML = `
  <span>${day}</span>
  <strong>${date.getDate()}</strong>
  <span>${month}</span>
`;
button.addEventListener("click", () => {
  document.querySelectorAll(".date-option")
    .forEach(btn =>
      btn.classList.remove("selected")
    );
  button.classList.add("selected");
  selectedDate =
    date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
});
dateList.appendChild(button);

}

}

createDates();

/* =========================================
TIME SLOTS
========================================= */

const timeList =
document.getElementById(“timeList”);

const timeSlots = [
“9:00 AM”,
“10:30 AM”,
“12:00 PM”,
“2:00 PM”,
“4:00 PM”,
“6:00 PM”
];

timeSlots.forEach(time => {

const button =
document.createElement(“button”);

button.type = “button”;
button.className = “time-option”;
button.textContent = time;

button.addEventListener(“click”, () => {

document.querySelectorAll(".time-option")
  .forEach(btn =>
    btn.classList.remove("selected")
  );
button.classList.add("selected");
selectedTime = time;

});

timeList.appendChild(button);

});

/* =========================================
DATE & TIME CONTINUE
========================================= */

document.getElementById(“next3”)
.addEventListener(“click”, () => {

if (!selectedDate) {

alert("Please select an appointment date.");
return;

}

if (!selectedTime) {

alert("Please select a time slot.");
return;

}

showStep(4);

});

/* =========================================
BACK BUTTONS
========================================= */

document.querySelectorAll(”.back”)
.forEach(button => {

button.addEventListener(“click”, () => {

showStep(button.dataset.step);

});

});

/* =========================================
CREATE BOOKING
========================================= */

document.getElementById(“confirm”)
.addEventListener(“click”, () => {

const address =
document.getElementById(“address”)
.value.trim();

const city =
document.getElementById(“city”)
.value.trim();

const landmark =
document.getElementById(“landmark”)
.value.trim();

if (!address) {

alert("Please enter the complete appointment address.");
return;

}

if (!city) {

alert("Please enter the city.");
return;

}

const bookingID =
“MH-” +
new Date().getFullYear() +
“-” +
Math.floor(1000 + Math.random() * 9000);

currentBooking = {

id: bookingID,
name:
  document.getElementById("customerName")
  .value.trim(),
phone:
  document.getElementById("customerPhone")
  .value.trim(),
email:
  document.getElementById("customerEmail")
  .value.trim(),
people: selectedPeople,
services: [...selectedServices],
date: selectedDate,
time: selectedTime,
address: address,
city: city,
landmark: landmark

};

showSummary();

});

/* =========================================
SUMMARY
========================================= */

function showSummary() {

const summary =
document.getElementById(“summary”);

summary.innerHTML = `

<p>
  <strong>Booking ID:</strong>
  ${escapeHTML(currentBooking.id)}
</p>
<p>
  <strong>Customer Name:</strong>
  ${escapeHTML(currentBooking.name)}
</p>
<p>
  <strong>Phone:</strong>
  ${escapeHTML(currentBooking.phone)}
</p>
<p>
  <strong>Email:</strong>
  ${escapeHTML(currentBooking.email)}
</p>
<p>
  <strong>Number of People:</strong>
  ${escapeHTML(currentBooking.people)}
</p>
<p>
  <strong>Services:</strong><br>
  ${currentBooking.services
    .map(service =>
      "• " + escapeHTML(service)
    )
    .join("<br>")}
</p>
<p>
  <strong>Date:</strong>
  ${escapeHTML(currentBooking.date)}
</p>
<p>
  <strong>Time:</strong>
  ${escapeHTML(currentBooking.time)}
</p>
<p>
  <strong>Full Address:</strong><br>
  ${escapeHTML(currentBooking.address)}
</p>
<p>
  <strong>City:</strong>
  ${escapeHTML(currentBooking.city)}
</p>
<p>
  <strong>Landmark:</strong>
  ${escapeHTML(
    currentBooking.landmark || "Not provided"
  )}
</p>
<p>
  <strong>Payment:</strong>
  Cash on Appointment
</p>

`;

document.getElementById(“successModal”)
.classList.add(“show”);

}

/* =========================================
ESCAPE HTML
========================================= */

function escapeHTML(value) {

return String(value)
.replaceAll(”&”, “&”)
.replaceAll(”<”, “<”)
.replaceAll(”>”, “>”)
.replaceAll(’”’, “"”)
.replaceAll(”’”, “'”);

}

/* =========================================
WHATSAPP BOOKING
========================================= */

document.getElementById(“sendWhatsApp”)
.addEventListener(“click”, () => {

if (!currentBooking) return;

const message =

`NEW APPOINTMENT REQUEST

Booking ID: ${currentBooking.id}

Customer Name: ${currentBooking.name}

Phone: ${currentBooking.phone}

Email: ${currentBooking.email}

Number of People: ${currentBooking.people}

Services:
${currentBooking.services.join(”, “)}

Date:
${currentBooking.date}

Time:
${currentBooking.time}

Full Address:
${currentBooking.address}

City:
${currentBooking.city}

Landmark:
${currentBooking.landmark || “Not provided”}

Payment:
Cash on Appointment`;

const whatsappURL =
“https://wa.me/” +
WHATSAPP_NUMBER +
“?text=” +
encodeURIComponent(message);

window.open(whatsappURL, “_blank”);

});

/* =========================================
EMAIL BOOKING
========================================= */

document.getElementById(“sendEmail”)
.addEventListener(“click”, () => {

if (!currentBooking) return;

const subject =
New Makeup Appointment - ${currentBooking.name} - ${currentBooking.date};

const body =

`NEW MAKEUP APPOINTMENT

Booking ID: ${currentBooking.id}

Customer Name: ${currentBooking.name}

Phone Number: ${currentBooking.phone}

Customer Email: ${currentBooking.email}

Number of People: ${currentBooking.people}

Services:
${currentBooking.services.join(”, “)}

Appointment Date:
${currentBooking.date}

Appointment Time:
${currentBooking.time}

Full Address:
${currentBooking.address}

City:
${currentBooking.city}

Landmark:
${currentBooking.landmark || “Not provided”}

Payment Method:
Cash on Appointment`;

window.location.href =
“mailto:” +
BUSINESS_EMAIL +
“?subject=” +
encodeURIComponent(subject) +
“&body=” +
encodeURIComponent(body);

});

/* =========================================
GENERAL WHATSAPP ENQUIRY
========================================= */

function sendEnquiry() {

const message =
“Hi Mehak, I would like to enquire about makeup services.”;

const url =
“https://wa.me/” +
WHATSAPP_NUMBER +
“?text=” +
encodeURIComponent(message);

window.open(url, “_blank”);

}

document.getElementById(“heroWhatsApp”)
.addEventListener(“click”, sendEnquiry);

document.getElementById(“contactWhatsApp”)
.addEventListener(“click”, sendEnquiry);

document.getElementById(“floatingWhatsApp”)
.addEventListener(“click”, sendEnquiry);

/* =========================================
CLOSE MODAL
========================================= */

document.getElementById(“closeModal”)
.addEventListener(“click”, () => {

document.getElementById(“successModal”)
.classList.remove(“show”);

});

/* =========================================
CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

document.getElementById(“successModal”)
.addEventListener(“click”, event => {

if (event.target.id === “successModal”) {

event.currentTarget.classList.remove("show");

}

});