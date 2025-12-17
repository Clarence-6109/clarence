// ============ ENHANCED DRINKS DATA ============
const drinksData = [
  {
    id: 'blue',
    name: 'Blue Lagoon',
    description: 'A cool and refreshing blue cocktail with tropical vibes.',
    color: 0x0077be,
    price: '$12.99'
  },
  {
    id: 'red',
    name: 'Red Sunset',
    description: 'A vibrant red fruity beverage with berry essence.',
    color: 0xff3333,
    price: '$14.99'
  },
  {
    id: 'green',
    name: 'Green Mint',
    description: 'Refreshing mint flavor that\'s cool and invigorating.',
    color: 0x28a745,
    price: '$11.99'
  },
  {
    id: 'yellow',
    name: 'Golden Glow',
    description: 'Bright, sweet, and sunny golden drink with citrus notes.',
    color: 0xffcc00,
    price: '$13.99'
  },
  {
    id: 'purple',
    name: 'Purple Punch',
    description: 'A bold purple burst of flavor with grape and berry blend.',
    color: 0x9d4edd,
    price: '$15.99'
  },
  {
    id: 'orange',
    name: 'Orange Bliss',
    description: 'Vibrant orange smoothie with mango and passion fruit.',
    color: 0xff8c00,
    price: '$12.99'
  }
];

// ============ DOM ELEMENTS ============
const loginCanvas = document.getElementById('login3d');
const loginForm = document.getElementById('loginForm');
const loginScreen = document.getElementById('loginScreen');
const mainSite = document.getElementById('mainSite');
const productsGrid = document.getElementById('productsGrid');
const contactForm = document.getElementById('contactForm');

// ============ UTILITY FUNCTIONS ============
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// ============ NOTIFICATION SYSTEM ============
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 30px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 10px;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  `;
  
  if (type === 'success') {
    notification.style.background = 'rgba(16, 185, 129, 0.9)';
    notification.style.color = '#fff';
  } else if (type === 'error') {
    notification.style.background = 'rgba(239, 68, 68, 0.9)';
    notification.style.color = '#fff';
  } else {
    notification.style.background = 'rgba(59, 130, 246, 0.9)';
    notification.style.color = '#fff';
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============ THREE.JS LOGIN SCENE ============
function setupLoginScene() {
  if (!loginCanvas) return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, loginCanvas.clientWidth / loginCanvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: loginCanvas, alpha: true, antialias: true });
  renderer.setSize(loginCanvas.clientWidth, loginCanvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  // Advanced Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0x00aaff, 1.5);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  
  const pointLight2 = new THREE.PointLight(0x7c3aed, 1);
  pointLight2.position.set(-5, -5, 5);
  scene.add(pointLight2);

  // Rotating bottle with improved geometry
  const geometry = new THREE.CylinderGeometry(1, 0.8, 3, 32);
  const material = new THREE.MeshPhongMaterial({ 
    color: 0x00aaff, 
    shininess: 150,
    metalness: 0.3,
    emissive: 0x001144
  });
  const bottle = new THREE.Mesh(geometry, material);
  scene.add(bottle);

  // Add a cap/top to bottle
  const capGeometry = new THREE.SphereGeometry(0.35, 32, 32);
  const capMaterial = new THREE.MeshPhongMaterial({ color: 0x7c3aed, shininess: 100 });
  const cap = new THREE.Mesh(capGeometry, capMaterial);
  cap.position.y = 1.6;
  bottle.add(cap);

  camera.position.z = 6;

  let animationId;
  function animate() {
    animationId = requestAnimationFrame(animate);
    bottle.rotation.x += 0.003;
    bottle.rotation.y += 0.008;
    pointLight.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.005);
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resize
  const handleResize = debounce(() => {
    const width = loginCanvas.clientWidth;
    const height = loginCanvas.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }, 250);

  window.addEventListener('resize', handleResize);

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
    renderer.dispose();
  };
}

// ============ LOGIN FORM HANDLER ============
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!loginForm.checkValidity()) {
      loginForm.classList.add('was-validated');
      return;
    }

    // Simulate authentication
    const email = document.getElementById('inputEmail').value;
    loginForm.style.opacity = '0.5';
    loginForm.style.pointerEvents = 'none';

    setTimeout(() => {
      if (loginScreen) loginScreen.style.display = 'none';
      if (mainSite) mainSite.style.display = 'block';
      showNotification(`Welcome back, ${email.split('@')[0]}!`, 'success');
      initializeDrinksGrid();
      setupScrollAnimations();
    }, 800);
  });
}

// ============ DRINKS GRID INITIALIZATION ============
function initializeDrinksGrid() {
  if (!productsGrid) return;
  
  productsGrid.innerHTML = '';
  
  drinksData.forEach((drink, index) => {
    const card = document.createElement('div');
    card.className = 'drink-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'drink-canvas-container';

    const canvas = document.createElement('canvas');
    canvas.className = 'drink-canvas';
    canvas.id = `canvas-${drink.id}`;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'drink-info';
    infoDiv.innerHTML = `
      <h4>${drink.name}</h4>
      <p>${drink.description}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
        <span style="color: #00aaff; font-weight: 700; font-size: 18px;">${drink.price}</span>
      </div>
    `;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'drink-actions';
    actionsDiv.innerHTML = `
      <button type="button" onclick="addToCart('${drink.id}')">
        <i class="fas fa-shopping-cart"></i> Add
      </button>
      <button type="button" onclick="viewDetails('${drink.id}')">
        <i class="fas fa-info-circle"></i> Details
      </button>
    `;

    canvasContainer.appendChild(canvas);
    card.appendChild(canvasContainer);
    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);
    productsGrid.appendChild(card);

    setup3DDrinkModel(canvas, drink.color, drink.name);
  });
}

// ============ 3D DRINK MODEL SETUP ============
function setup3DDrinkModel(canvas, color, drinkName) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x0a0a0a, 0.3);

  // Multi-light setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  
  const directionalLight = new THREE.DirectionalLight(0x00aaff, 0.8);
  directionalLight.position.set(-5, 5, 3);
  scene.add(directionalLight);

  // Enhanced bottle
  const geometry = new THREE.CylinderGeometry(0.6, 0.5, 2.5, 32);
  const material = new THREE.MeshPhongMaterial({ 
    color: color, 
    shininess: 150,
    emissive: color,
    emissiveIntensity: 0.2
  });
  const bottle = new THREE.Mesh(geometry, material);
  bottle.castShadow = true;
  bottle.receiveShadow = true;
  scene.add(bottle);

  // Liquid inside bottle
  const liquidGeometry = new THREE.CylinderGeometry(0.55, 0.45, 2.2, 32);
  const liquidMaterial = new THREE.MeshPhongMaterial({ 
    color: color,
    emissive: color,
    emissiveIntensity: 0.3,
    opacity: 0.7,
    transparent: true
  });
  const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
  liquid.position.y = -0.15;
  scene.add(liquid);

  // Cap
  const capGeometry = new THREE.SphereGeometry(0.35, 32, 32);
  const capMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
  const cap = new THREE.Mesh(capGeometry, capMaterial);
  cap.position.y = 1.35;
  bottle.add(cap);

  camera.position.z = 4;

  let animationId;
  let mouseX = 0, mouseY = 0;

  function animate() {
    animationId = requestAnimationFrame(animate);
    bottle.rotation.y += 0.008;
    bottle.rotation.x = mouseY * 0.2;
    liquid.rotation.z -= 0.002;
    renderer.render(scene, camera);
  }
  animate();

  // Mouse interaction
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;
  });

  const handleCanvasResize = debounce(() => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }, 250);

  window.addEventListener('resize', handleCanvasResize);

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleCanvasResize);
    renderer.dispose();
  };
}

// ============ INTERACTIVE FUNCTIONS ============
function addToCart(drinkId) {
  const drink = drinksData.find(d => d.id === drinkId);
  if (drink) {
    showNotification(`${drink.name} added to cart! 🛒`, 'success');
  }
}

function viewDetails(drinkId) {
  const drink = drinksData.find(d => d.id === drinkId);
  if (drink) {
    showNotification(`${drink.name} - ${drink.price}`, 'info');
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    mainSite.style.display = 'none';
    loginScreen.style.display = 'flex';
    loginForm.classList.remove('was-validated');
    loginForm.reset();
    showNotification('Logged out successfully', 'success');
  }
}

function toggleSignup(e) {
  e.preventDefault();
  showNotification('Sign up coming soon! 🚀', 'info');
}

// ============ SCROLL ANIMATIONS ============
function setupScrollAnimations() {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.drink-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

  // Smooth scroll nav active link
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  window.addEventListener('scroll', throttle(() => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, 150));
}

// ============ CONTACT FORM VALIDATION ============
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      return;
    }

    const name = document.getElementById('contactName').value;
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      contactForm.classList.remove('was-validated');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showNotification(`Thanks for reaching out, ${name}! We\'ll get back to you soon.`, 'success');
    }, 1500);
  });
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  setupLoginScene();
  
  // Add keyframes for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideOut {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100px);
      }
    }
  `;
  document.head.appendChild(style);
  
  console.log('✨ Cool Drinks Co. - Premium Experience Loaded');
});

// Prevent right-click context menu (optional branding protection)
document.addEventListener('contextmenu', (e) => {
  // Uncomment if you want to prevent right-click
  // e.preventDefault();
});