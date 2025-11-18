const tool = document.querySelector('.tool');
const rail = document.querySelector('.rail');
const info = document.querySelector('.info');
const duration = 110;
const sleep = ms => new Promise(res => setTimeout(res, ms));
let animating = false;
tool.style.transition = `transform ${duration}ms ease`;
rail.style.transition = `transform ${duration}ms ease`;
info.style.transition = `transform ${duration}ms ease, height 50ms linear`;

function onHelpClick(element) {
    info.src = element.id + ".html";
    info.style.height = `${info.offsetHeight}px`;
    info.scrolling = "no"
    runAnimation();
}

    async function runAnimation() {
    if (animating) return;
    animating = true;
    info.style.height = `${info.offsetHeight}px`;
    info.style.height = `${10}px`;
    let currentY = 0;
    for (let loop = 0; loop < 8; loop++) {
        tool.style.transform = `translate(327px, ${currentY}px)`;
        await sleep(duration);
        currentY -= 20;
        rail.style.transform = `translateY(${currentY}px)`;
        tool.style.transform = `translate(327px, ${currentY}px)`;
        await sleep(duration);

        for (let i = 0; i <4; i++) {
            info.style.transform = `translateY(${currentY}px)`;
            info.style.height = `${info.offsetHeight + 5}px`;
            await sleep(duration);
        }
        await sleep(duration);

        currentY -= 20;
        tool.style.transform = `translate(40px, ${currentY}px)`;
        rail.style.transform = `translateY(${currentY}px)`;
        await sleep(duration);

        for (let i = 0; i < 4; i++) {
            info.style.transform = `translateY(${currentY}px)`;
            info.style.height = `${info.offsetHeight + 5}px`;
            await sleep(duration);
        }
        await sleep(duration);
    }
    info.scrolling = "yes"

    animating = false;
}