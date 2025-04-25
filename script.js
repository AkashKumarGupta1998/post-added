document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Form submission successful
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Admin Modal Functionality
    const adminModal = document.getElementById('admin-modal');
    const adminAccessBtn = document.getElementById('admin-access-btn');
    const openModalBtn = document.getElementById('toggle-form-btn');
    const closeModal = document.getElementsByClassName('close')[0];
    const loginBtn = document.getElementById('login-btn');
    const addPostForm = document.getElementById('addPostForm');

    // Set your admin password (change this to your own secure password)
    const ADMIN_PASSWORD = "Password123";

    // Open modal when clicking admin access button
    openModalBtn.addEventListener('click', function() {
        adminModal.style.display = 'block';
    });

    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        adminModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });

    // Login functionality
    loginBtn.addEventListener('click', function() {
        const enteredPassword = document.getElementById('admin-password').value;
        
        if (enteredPassword === ADMIN_PASSWORD) {
            adminModal.style.display = 'none';
            adminAccessBtn.style.display = 'inline-block';
            openModalBtn.style.display = 'none';
            alert("Admin access granted! You can now add new posts.");
        } else {
            alert("Incorrect password! Please try again.");
        }
    });

    // Toggle add post form
    adminAccessBtn.addEventListener('click', function() {
        if (addPostForm.style.display === 'block') {
            addPostForm.style.display = 'none';
            this.innerHTML = '<i class="fas fa-plus"></i> Add New Post';
        } else {
            addPostForm.style.display = 'block';
            this.innerHTML = '<i class="fas fa-times"></i> Cancel';
        }
    });

    // Posts Data and Functionality
    let postsData = [
        {
            title: "The Intersection of Chemistry and Cloud Computing",
            date: "June 15, 2023",
            excerpt: "Exploring how cloud technologies are revolutionizing chemical research and data analysis in modern laboratories.",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            link: "#"
        },
        {
            title: "My Journey from Chemistry to Tech",
            date: "April 5, 2023",
            excerpt: "Sharing my personal experience transitioning from a chemistry background to the world of cloud computing.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            link: "#"
        }
    ];

    // Function to render all posts
    function renderPosts() {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = ''; // Clear existing posts
        
        postsData.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post-card';
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="post-image">
                <div class="post-content">
                    <h3 class="post-title">${post.title}</h3>
                    <span class="post-date">${post.date}</span>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <a href="${post.link}" class="read-more">Read more</a>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Function to add a new post
    function addNewPost(e) {
        e.preventDefault();
        
        const newPost = {
            title: document.getElementById('post-title').value,
            date: document.getElementById('post-date').value,
            excerpt: document.getElementById('post-excerpt').value,
            image: document.getElementById('post-image').value,
            link: document.getElementById('post-link').value || "#"
        };
        
        // Add to beginning of array (so new posts show first)
        postsData.unshift(newPost);
        
        // Re-render posts
        renderPosts();
        
        // Clear form
        addPostForm.reset();
        
        // Hide form
        addPostForm.style.display = 'none';
        adminAccessBtn.innerHTML = '<i class="fas fa-plus"></i> Add New Post';
        
        // Show success message
        alert('Post added successfully!');
    }

    // Event listener for add post button
    document.getElementById('add-post-btn').addEventListener('click', addNewPost);

    // Initial render of posts
    renderPosts();
});

// Resume Print Functionality
document.getElementById('print-resume')?.addEventListener('click', function() {
    const pdfFrame = document.getElementById('resume-pdf');
    if (pdfFrame) {
        pdfFrame.contentWindow.print();
    } else {
        // Fallback in case PDF viewer doesn't support printing
        window.open('docs/your-resume.pdf', '_blank');
    }
});