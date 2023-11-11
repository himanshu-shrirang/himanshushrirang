// nav options effect
const letters = "ABCEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*(){}?><|~`][";

document.querySelectorAll("a").forEach(anchor => {
    let iterations = 0;
    let interval;

    anchor.onmouseover = event => {
        iterations = 0;
        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return event.target.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 55)];
                })
                .join("");

            if (iterations >= event.target.dataset.value.length) {
                clearInterval(interval);
            }

            iterations += 1;
        }, 25);
    };

    anchor.onmouseout = () => {
        clearInterval(interval);
        iterations = 0; // Start from the first character

        interval = setInterval(() => {
            anchor.innerText = anchor.innerText.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return anchor.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 55)];
                })
                .join("");

            if (iterations >= anchor.dataset.value.length) {
                clearInterval(interval);
            }

            iterations += 1;
        }, 25);
    };
});


//second page effect
const track = document.getElementById("img-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}; 

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    let percentage = (mouseDelta / maxDelta) * -50;
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    nextPercentage = Math.min(0, Math.max(-43.8, nextPercentage));

    track.dataset.percentage = nextPercentage;
    track.animate ({
        transform:`translate(${nextPercentage}%, -50%)`
    }, {duration:1200, fill:"forwards"});

    for (const image of track.getElementsByClassName("image")) {
        image.animate ({
            objectPosition: `${100 + nextPercentage}% center`
        },{duration:1200, fill:"forwards"});
    } 
};


// const track = document.getElementById("img-track");
// const images = track.getElementsByClassName("image");
// const totalImages = images.length;
// const imageWidth = parseFloat(window.getComputedStyle(images[0]).width) + parseFloat(window.getComputedStyle(images[0]).marginRight);
// const trackWidth = totalImages * imageWidth;
// track.style.width = `${trackWidth}px`;

// let scrollPosition = 0;
// let lastTimestamp = 0;

// function scrollImages(timestamp) {
//     const deltaTime = timestamp - lastTimestamp;
//     lastTimestamp = timestamp;

//     scrollPosition -= 0.05* deltaTime; // Adjust the speed here
//     if (scrollPosition <= -imageWidth) {
//         track.appendChild(images[0]);
//         scrollPosition += imageWidth;
//     }
//     track.style.transform = `translateX(${scrollPosition}px)`;
//     requestAnimationFrame(scrollImages);
// }

// requestAnimationFrame(scrollImages);
