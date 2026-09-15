const listItems = document.querySelectorAll('.list-item li');
const list = document.querySelector('.list-item');

// Click on a list item
listItems.forEach(li => {
    li.addEventListener('click', (e) => {

        e.stopPropagation();

        listItems.forEach(item => {
            item.classList.remove('active-li');
        });

        li.classList.add('active-li');
    });
});


// Click anywhere outside the list
document.addEventListener('click', (e) => {

    if (!list.contains(e.target)) {

        listItems.forEach(item => {
            item.classList.remove('active-li');
        });
    }
});


const toggleBtn = document.querySelector('.toggleBtn');

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');


    document.body.classList.toggle(
        'dark',
        toggleBtn.classList.contains('active')
    );
})




const face = document.querySelector(".face");
const eyes = document.querySelectorAll(".eyeball");


// ========================================
// EYES FOLLOW + TILT TOWARD CURSOR
// ========================================

window.addEventListener("mousemove", (e) => {

    const faceRect = face.getBoundingClientRect();

    // Face center
    const centerX = faceRect.left + faceRect.width / 2;
    const centerY = faceRect.top + faceRect.height / 2;

    // Cursor distance from face center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Direction
    const angle = Math.atan2(mouseY, mouseX);

    // Maximum eye movement
    const maxMove = 10;

    // Distance from center
    const distance = Math.min(
        Math.sqrt(mouseX * mouseX + mouseY * mouseY) / 300,
        1
    );

    // Eye movement
    const moveX = Math.cos(angle) * maxMove * distance;
    const moveY = Math.sin(angle) * maxMove * distance;


    // ========================================
    // TILT
    // ========================================

    // Cursor left  → negative rotation
    // Cursor right → positive rotation
    const tilt = gsap.utils.clamp(
        -12,
        12,
        (mouseX / (faceRect.width / 2)) * 12
    );


    // ========================================
    // ANIMATE
    // ========================================

    gsap.to(eyes, {
        x: moveX,
        y: moveY,
        rotation: tilt,

        duration: 0.25,
        ease: "power3.out",

        overwrite: true
    });

});


// ========================================
// BLINK
// ========================================

function blink() {

const tl = gsap.timeline();

    tl.to(eyes, {
        scaleY: 0.08,
        duration: 0.08,
        ease: "power2.in"
    })
    .to(eyes, {
        scaleY: 1,
        duration: 0.12,
        ease: "power2.out"
    });

    // Blink again after 2 seconds
    gsap.delayedCall(2, blink);
}


// First blink
gsap.delayedCall(2, blink);