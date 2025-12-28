// Smooth Scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}


// about me
// Typing effect for About Me
document.addEventListener("DOMContentLoaded", () => {
    const aboutPara = document.querySelector("#about p:first-child");
    const aboutText = "I am an MCA student at Parul Institute of Engineering and Technology, Vadodara. I am a full-stack web development enthusiast with strong fundamentals in HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB.";
    
    let index = 0;

    function typeAbout() {
        if (index < aboutText.length) {
            aboutPara.innerHTML += aboutText.charAt(index);
            index++;
            setTimeout(typeAbout, 50); // 50ms delay
        }
    }

    typeAbout();
});




//skills-------
// Add new skill
function addSkill() {
    const skillInput = document.getElementById("newSkill");
    const skillValue = skillInput.value.trim();
    if (skillValue === "") {
        alert("Please enter a skill");
        return;
    }

    const skillSpan = document.createElement("span");
    skillSpan.innerText = skillValue + " ";

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "❌";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = function() { removeSkill(removeBtn); }

    skillSpan.appendChild(removeBtn);
    skillSpan.setAttribute("draggable", "true");
    document.getElementById("skillsGrid").appendChild(skillSpan);

    addDragEvents(skillSpan);
    skillInput.value = "";
}

// Remove skill
function removeSkill(button) {
    button.parentElement.remove();
}

// Drag & Drop functionality
function addDragEvents(element) {
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragover', dragOver);
    element.addEventListener('drop', drop);
    element.addEventListener('dragend', dragEnd);
}

let dragged;

function dragStart(e) {
    dragged = this;
    setTimeout(() => (this.style.display = "none"), 0);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    if (this !== dragged) {
        let parent = this.parentNode;
        let children = Array.from(parent.children);
        let draggedIndex = children.indexOf(dragged);
        let targetIndex = children.indexOf(this);

        if (draggedIndex < targetIndex) {
            parent.insertBefore(dragged, this.nextSibling);
        } else {
            parent.insertBefore(dragged, this);
        }
    }
}

function dragEnd() {
    this.style.display = "inline-flex";
}

// Initialize drag events for existing skills
document.querySelectorAll("#skillsGrid span").forEach(addDragEvents);

// certifications
function addCertificate() {
    const name = document.getElementById("certName").value.trim();
    const details = document.getElementById("certDetails").value.trim();

    if (!name || !details) {
        alert("Please enter both Certificate Name and Details");
        return;
    }

    const certCard = document.createElement("div");
    certCard.classList.add("cert-card");

    certCard.innerHTML = `<h3>${name}</h3><p>${details}</p>`;

    document.getElementById("certGrid").appendChild(certCard);

    // Clear inputs
    document.getElementById("certName").value = "";
    document.getElementById("certDetails").value = "";
}
// project
function addProject() {
    const title = document.getElementById("projectTitle").value.trim();
    const desc = document.getElementById("projectDesc").value.trim();

    if (title === "" || desc === "") {
        alert("Please fill all project details");
        return;
    }

    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    projectCard.innerHTML = `
        <h3>${title}</h3>
        <p>${desc}</p>
    `;

    document.getElementById("projectList").appendChild(projectCard);

    // Clear input fields
    document.getElementById("projectTitle").value = "";
    document.getElementById("projectDesc").value = "";
}




// Contact form
function sendMessage() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill all fields!");
        return false;
    }

    alert(`Thank you ${name}! Your message has been sent.`);
    
    // Clear form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    return false; // Prevent actual form submission
}


// Typing effect
const texts = ["Web Developer", "MCA Student", "Full Stack Learner"];
let index = 0, char = 0;

function typingEffect() {
    if (char < texts[index].length) {
        document.querySelector(".typing").innerHTML += texts[index].charAt(char);
        char++;
        setTimeout(typingEffect, 100);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    if (char > 0) {
        document.querySelector(".typing").innerHTML =
            texts[index].substring(0, char - 1);
        char--;
        setTimeout(eraseEffect, 60);
    } else {
        index = (index + 1) % texts.length;
        setTimeout(typingEffect, 500);
    }
}

typingEffect();


//data send to mysql
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    if (data.success) {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();
    } else {
        alert("Error occurred!");
    }
});

