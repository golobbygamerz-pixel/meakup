(function() {
  // Service data
  const services = [
    { name: 'Bridal Makeup', img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2070&auto=format&fit=crop', desc: 'Signature bridal look with premium products', price: '₹15,000', duration: '3 hrs' },
    { name: 'Engagement Makeup', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2070&auto=format&fit=crop', desc: 'Elegant engagement style', price: '₹8,000', duration: '2 hrs' },
    { name: 'Party Makeup', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop', desc: 'Glam party look', price: '₹5,000', duration: '1.5 hrs' },
    { name: 'Reception Makeup', img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1974&auto=format&fit=crop', desc: 'Stunning reception makeup', price: '₹10,000', duration: '2.5 hrs' },
    { name: 'HD Makeup', img: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=2070&auto=format&fit=crop', desc: 'High definition flawless finish', price: '₹12,000', duration: '2 hrs' },
    { name: 'Hairstyling', img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2070&auto=format&fit=crop', desc: 'Professional hairstyling', price: '₹2,500', duration: '1 hr' },
    { name: 'Saree Draping', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2070&auto=format&fit=crop', desc: 'Perfect saree draping', price: '₹1,500', duration: '30 min' },
    { name: 'Makeup + Hairstyling', img: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?q=80&w=2070&auto=format&fit=crop', desc: 'Complete beauty package', price: '₹7,500', duration: '2.5 hrs' }
  ];

  // Gallery data
  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1974&auto=format&fit=crop', cat: 'bridal' },
    { src: 'https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?q=80&w=2073&auto=format&fit=crop', cat: 'party' },
    { src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2070&auto=format&fit=crop', cat: 'engagement' },
    { src: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2070&auto=format&fit=crop', cat: 'hairstyling' },
    { src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1974&auto=format&fit=crop', cat: 'reception' },
    { src: 'https://images.unsplash.com/photo-1522335782467-99fc95f3c9c8?q=80&w=2070&auto=format&fit=crop', cat: 'client' },
    { src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop', cat: 'party' },
    { src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2070&auto=format&fit=crop', cat: 'hairstyling' }
  ];

  // Reviews data
  const reviewsData = [
    { name: 'Ananya Sharma', img: 'https://randomuser.me/api/portraits/women/68.jpg', text: 'Mehak made my bridal look absolutely dreamy! Flawless and long-lasting makeup.' },
    { name: 'Ritika Verma', img: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Loved the HD makeup. Got compliments all night long!' },
    { name: 'Sneha Patel', img: 'https://randomuser.me/api/portraits/women/65.jpg', text: 'Professional and friendly. The engagement makeup was perfect.' },
    { name: 'Kavya Singh', img: 'https://randomuser.me/api/portraits/women/33.jpg', text: 'Best makeup artist in town. Highly recommend for parties and events.' },
    { name: 'Pooja Desai', img: 'https://randomuser.me/api/portraits/women/50.jpg', text: 'Saree draping and hairstyling were stunning. Thank you Mehak!' },
    { name: 'Neha Gupta', img: 'https://randomuser.me/api/portraits/women/72.jpg', text: 'Absolutely loved my reception look. Very professional and talented.' }
  ];

  // State variables
  let currentStep = 1;
  let selectedDate = '';
  let selectedTime = '';
  let bookingData = {};

  // Initialize everything when DOM is ready
  function init() {
    // Get DOM elements
    const servicesGrid = document.getElementById('servicesGrid');
    const serviceCheckboxes = document.getElementById('serviceCheckboxes');
    const masonryGallery = document.getElementById('masonryGallery');
    const reviewsGrid = document.getElementById('reviewsGrid');
    const datePicker = document.getElementById('datePicker');
    const timeContainer = document.getElementById('timeSlots');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = document.getElementById('lightboxClose');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    
    // Render Services
    function renderServices() {
      servicesGrid.innerHTML = '';
      services.forEach((service) => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
          <img src="${service.img}" class="service-img" alt="${service.name}">
          <h3>${service.name}</h3>
          <p class="service-desc">${service.desc}</p>
          <div class="service-price">${service.price}</div>
          <div class="service-duration">Duration: ${service.duration}</div>
          <button class="btn btn-primary book-service-btn" data-service="${service.name}">BOOK NOW</button>
        `;
        servicesGrid.appendChild(card);
      });

      // Add event listeners to book buttons
      document.querySelectorAll('.book-service-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const serviceName = e.target.dataset.service;
          // Clear all checkboxes
          document.querySelectorAll('.serviceCheck').forEach(c => c.checked = false);
          // Check the selected service
          const targetCheck = [...document.querySelectorAll('.serviceCheck')].find(c => c.value === serviceName);
          if (targetCheck) targetCheck.checked = true;
          // Navigate to booking
          showStep(1);
          document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        });
      });
    }

    // Render Service Checkboxes
    function renderServiceCheckboxes() {
      serviceCheckboxes.innerHTML = '';
      services.forEach(service => {
        const label = document.createElement('label');
        label.innerHTML = `
          <input type="checkbox" class="serviceCheck" value="${service.name}"> ${service.name}
        `;
        serviceCheckboxes.appendChild(label);
      });
    }

    // Render Gallery
    function renderGallery(filter = 'all') {
      masonryGallery.innerHTML = '';
      const filtered = filter === 'all' ? galleryImages : galleryImages.filter(g => g.cat === filter);
      filtered.forEach(img => {
        const div = document.createElement('div');
        div.className = 'masonry-item';
        div.innerHTML = `<img src="${img.src}" alt="${img.cat} look">`;
        div.addEventListener('click', () => openLightbox(img.src));
        masonryGallery.appendChild(div);
      });
    }

    // Open Lightbox
    function openLightbox(src) {
      lightboxImg.src = src;
      lightbox.classList.add('active');
    }

    // Close Lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
    }

    // Render Reviews
    function renderReviews() {
      reviewsGrid.innerHTML = '';
      reviewsData.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
          <img src="${review.img}" alt="${review.name}">
          <h3>${review.name}</h3>
          <div class="review-stars">★★★★★</div>
          <p>${review.text}</p>
        `;
        reviewsGrid.appendChild(card);
      });
    }

    // Generate Dates
    function generateDates() {
      datePicker.innerHTML = '';
      const today = new Date();
      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateCard = document.createElement('div');
        dateCard.className = 'date-card';
        dateCard.textContent = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
        dateCard.dataset.date = date.toISOString().split('T')[0];
        dateCard.addEventListener('click', () => {
          document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
          dateCard.classList.add('selected');
          selectedDate = dateCard.dataset.date;
        });
        datePicker.appendChild(dateCard);
      }
      // Select first date by default
      selectedDate = today.toISOString().split('T')[0];
      if (datePicker.firstChild) {
        datePicker.firstChild.classList.add('selected');
      }
    }

    // Generate Time Slots
    function generateTimeSlots() {
      const timeSlots = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];
      const unavailableSlots = ['2:00 PM']; // Configure unavailable slots here
      
      timeContainer.innerHTML = '';
      timeSlots.forEach(time => {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.textContent = time;
        
        if (unavailableSlots.includes(time)) {
          slot.classList.add('unavailable');
        } else {
          slot.addEventListener('click', () => {
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            selectedTime = time;
          });
        }
        
        timeContainer.appendChild(slot);
      });
    }

    // Show Step
    function showStep(step) {
      const stepPanels = document.querySelectorAll('.step-panel');
      const stepIndicators = document.querySelectorAll('.step-indicator');
      
      stepPanels.forEach((panel, index) => {
        panel.classList.toggle('active', index === step - 1);
      });
      
      stepIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === step - 1);
      });
      
      currentStep = step;
      
      // Hide success message when showing steps
      document.getElementById('bookingSuccess').style.display = 'none';
      
      // Scroll to top of booking section
      document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Validate Step 1
    function validateStep1() {
      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      
      if (!name) {
        alert('Please enter your full name');
        return false;
      }
      
      if (!phone || phone.length < 10) {
        alert('Please enter a valid phone number');
        return false;
      }
      
      return true;
    }

    // Update Booking Summary
    function updateSummary() {
      const name = document.getElementById('custName').value || 'N/A';
      const phone = document.getElementById('custPhone').value || 'N/A';
      const email = document.getElementById('custEmail').value || 'N/A';
      const people = document.getElementById('custPeople').value || '1';
      const address = document.getElementById('locAddress').value || 'N/A';
      const city = document.getElementById('locCity').value || 'N/A';
      const landmark = document.getElementById('locLandmark').value || 'N/A';
      
      const selectedServiceNames = [...document.querySelectorAll('.serviceCheck:checked')].map(c => c.value);
      const servicesString = selectedServiceNames.length > 0 ? selectedServiceNames.join(', ') : 'Not selected';
      
      const bookingId = 'MK-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      
      const summaryHTML = `
        <div><strong>Booking ID:</strong> ${bookingId}</div>
        <div><strong>Name:</strong> ${name}</div>
        <div><strong>Phone:</strong> ${phone}</div>
        <div><strong>Email:</strong> ${email}</div>
        <div><strong>Number of People:</strong> ${people}</div>
        <div><strong>Services:</strong> ${servicesString}</div>
        <div><strong>Date:</strong> ${selectedDate}</div>
        <div><strong>Time:</strong> ${selectedTime || 'Not selected'}</div>
        <div><strong>Address:</strong> ${address}, ${city}, ${landmark}</div>
        <div><strong>Payment Method:</strong> Cash on Appointment</div>
      `;
      
      document.getElementById('bookingSummary').innerHTML = summaryHTML;
      
      // Store booking data
      bookingData = {
        bookingId,
        name,
        phone,
        email,
        people,
        services: servicesString,
        date: selectedDate,
        time: selectedTime || 'Not selected',
        address,
        city,
        landmark
      };
    }

    // Initial render
    renderServices();
    renderServiceCheckboxes();
    renderGallery('all');
    renderReviews();
    generateDates();
    generateTimeSlots();
    
    // Gallery filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderGallery(e.target.dataset.cat);
      });
    });
    
    // Lightbox events
    lightbox.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
    
    // Navigation events
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('show');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
      });
    });
    
    // Step indicator clicks
    document.querySelectorAll('.step-indicator').forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const step = parseInt(e.target.dataset.step);
        if (step < currentStep || step === currentStep) {
          showStep(step);
        }
      });
    });
    
    // Step navigation buttons
    document.getElementById('toStep2').addEventListener('click', () => {
      if (validateStep1()) {
        showStep(2);
      }
    });
    
    document.getElementById('toStep3').addEventListener('click', () => {
      showStep(3);
    });
    
    document.getElementById('toStep4').addEventListener('click', () => {
      if (!selectedDate) {
        alert('Please select a date');
        return;
      }
      showStep(4);
    });
    
    document.getElementById('toStep5').addEventListener('click', () => {
      if (!selectedTime) {
        alert('Please select a time slot');
        return;
      }
      showStep(5);
    });
    
    document.getElementById('toStep6').addEventListener('click', () => {
      updateSummary();
      showStep(6);
    });
    
    // Confirm booking
    document.getElementById('confirmBooking').addEventListener('click', () => {
      updateSummary();
      // Hide step panels and show success
      document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('bookingSuccess').style.display = 'block';
      document.getElementById('bookingSuccess').scrollIntoView({ behavior: 'smooth' });
    });
    
    // WhatsApp send
    document.getElementById('sendWhatsApp').addEventListener('click', () => {
      if (!bookingData.bookingId) {
        alert('Please complete the booking first');
        return;
      }
      
      const message = `Appointment Request%0A%0A📋 Booking ID: ${bookingData.bookingId}%0A👤 Name: ${bookingData.name}%0A📞 Phone: ${bookingData.phone}%0A✉️ Email: ${bookingData.email}%0A👥 People: ${bookingData.people}%0A💄 Services: ${bookingData.services}%0A📅 Date: ${bookingData.date}%0A⏰ Time: ${bookingData.time}%0A📍 Address: ${bookingData.address}, ${bookingData.city}, ${bookingData.landmark}%0A💵 Payment: Cash on Appointment`;
      
      window.open(`https://wa.me/919310151087?text=${message}`, '_blank');
    });
    
    // Email send
    document.getElementById('sendEmail').addEventListener('click', () => {
      if (!bookingData.bookingId) {
        alert('Please complete the booking first');
        return;
      }
      
      const subject = `Appointment Request - ${bookingData.bookingId}`;
      const body = `Booking ID: ${bookingData.bookingId}\nName: ${bookingData.name}\nPhone: ${bookingData.phone}\nEmail: ${bookingData.email}\nNumber of People: ${bookingData.people}\nServices: ${bookingData.services}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nAddress: ${bookingData.address}, ${bookingData.city}, ${bookingData.landmark}\nPayment Method: Cash on Appointment`;
      
      window.location.href = `mailto:golobbygamerz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
    
    // Hero and contact book buttons
    document.getElementById('heroBookBtn').addEventListener('click', () => {
      showStep(1);
    });
    
    document.getElementById('contactBook').addEventListener('click', () => {
      showStep(1);
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => observer.observe(el));
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();