/*
    ========================================
    Sherlock Holmes' Code for Chronoflux
    ========================================
    My dear Watson, observe the elegant simplicity of this script. 
    It's elementary, yet it orchestrates the entire user experience 
    with precision. Each function is a clue, leading to a seamless
    and interactive website.
*/

document.addEventListener('DOMContentLoaded', () => {

    // The game is afoot! Let's initialize our interactive elements.
    initSideMenu();
    initTestimonialCarousel();
    initSmoothScrolling();
    initWorksExpansion(); // A new case to solve.
    initChatbot();

});

/**
 * Elementary, my dear programmer: Functions for the side navigation.
 * A simple click reveals what was once hidden.
 */
function initSideMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', openNav);
    }

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
    }
}

function openNav() {
    const sideMenu = document.getElementById("side-menu");
    if (sideMenu) {
        sideMenu.style.width = "350px"; 
    }
}

function closeNav() {
    const sideMenu = document.getElementById("side-menu");
    if (sideMenu) {
        sideMenu.style.width = "0";
    }
}


/**
 * The case of the rotating testimonials.
 * We must cycle through the evidence (quotes) one by one.
 */
let slideIndex = 0;
let testimonialTimer; // To hold our automated timer

function initTestimonialCarousel() {
    showSlides();
    testimonialTimer = setInterval(plusSlides, 7000); // Change slide every 7 seconds
}

function plusSlides() {
    slideIndex++;
    showSlides();
}

function currentSlide(n) {
    slideIndex = n;
    showSlides();
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(plusSlides, 7000);
}

function showSlides() {
    let slides = document.getElementsByClassName("testimonial-slide");
    let dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return;

    if (slideIndex >= slides.length) {slideIndex = 0}
    if (slideIndex < 0) {slideIndex = slides.length - 1}

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}


/**
 * The curious incident of the smooth scroll in the site.
 * We must guide the user gently to their destination, not jolt them.
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Close the nav if it's open and a link is clicked
            if (document.getElementById("side-menu").style.width !== "0px") {
                closeNav();
            }
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // A slight delay to allow the nav to close smoothly before scrolling
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
}

/**
 * The puzzle of the expanding works.
 * A click reveals the hidden description. A second click conceals it. Simple, effective.
 */
function initWorksExpansion() {
    const workItems = document.querySelectorAll('.works-grid .work-item');
    workItems.forEach(item => {
        item.addEventListener('click', () => {
            // If the clicked item is already active, just deactivate it.
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                // Deactivate all other items first.
                workItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                // Then, activate the clicked item.
                item.classList.add('active');
            }
        });
    });
}


/**
 * The Adventure of the Artificial Intelligence.
 * Here, we construct our digital thinking machine and fix its wiring.
 */
function initChatbot() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotCloseButton = document.querySelector('#chatbot-header span');
    const chatbotSendButton = document.querySelector('#chatbot-footer button');
    const chatbotInput = document.getElementById('chatbot-input');

    if (chatbotIcon) {
        chatbotIcon.addEventListener('click', toggleChatbot);
    }
    if(chatbotCloseButton){
        chatbotCloseButton.addEventListener('click', toggleChatbot);
    }
    if(chatbotSendButton){
        chatbotSendButton.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                sendMessage();
            }
        });
    }
}

function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    if(chatbotContainer) {
        chatbotContainer.classList.toggle('active');
    }
}

function sendMessage() {
    const inputField = document.getElementById('chatbot-input');
    const chatBody = document.getElementById('chatbot-body');
    const userMessage = inputField.value.trim();

    if (userMessage === "") return;

    const sentMessageDiv = document.createElement('div');
    sentMessageDiv.className = 'message sent';
    sentMessageDiv.textContent = userMessage;
    chatBody.appendChild(sentMessageDiv);

    inputField.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
    
    getAIResponse(userMessage);
}


/**
 * A dialogue with the machine. This is where we consult the Pollinations API.
 * @param {string} userMessage The user's query.
 */
async function getAIResponse(userMessage) {
    const chatBody = document.getElementById('chatbot-body');
    const sendButton = document.querySelector('#chatbot-footer button');
    sendButton.disabled = true;

    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'message received';
    thinkingDiv.textContent = 'Thinking...';
    chatBody.appendChild(thinkingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    const systemPrompt = `You are ChronoBot, the official AI assistant for Chronoflux Media, a modern social media agency based in Birmingham. Your goal is to provide helpful information about the company and its services.

    Here is the information you must use:
    - Company: Chronoflux Media
    - Services Offered: Social Media Management, Content Creation, Digital Marketing Campaigns, Website Design and Development, Analytics and Performance Tracking, Graphic Design and Logo Branding, and AI Chatbot Development.
    - Contact: For detailed pricing or project discussions, tell the user to email business@chronofluxmedia.com.
    
    Your tone must be professional, helpful, and concise. Do not make up services or information. If you don't know the answer, politely refer the user to the contact email.`;

    const encodedPrompt = encodeURIComponent(userMessage);
    const encodedSystem = encodeURIComponent(systemPrompt);
    
    const apiUrl = `https://text.pollinations.ai/${encodedPrompt}?model=openai&json=true&private=true&system=${encodedSystem}&referrer=ChronofluxWebsite`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const responseText = await response.text();
        const data = JSON.parse(responseText);

        chatBody.removeChild(thinkingDiv);
        
        const aiMessage = data.output || "I'm sorry, I couldn't process that. Please try rephrasing.";
        
        const receivedMessageDiv = document.createElement('div');
        receivedMessageDiv.className = 'message received';
        receivedMessageDiv.textContent = aiMessage;
        chatBody.appendChild(receivedMessageDiv);

    } catch (error) {
        console.error("Error fetching AI response:", error);
        chatBody.removeChild(thinkingDiv);
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.className = 'message received';
        errorMessageDiv.textContent = 'My apologies, I am having trouble connecting to my brain. Please try again in a moment.';
        chatBody.appendChild(errorMessageDiv);
    } finally {
        sendButton.disabled = false;
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}