  // Function to generate random numbers in a range
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Select the Emergency Stop link
  const emergencyStop = document.getElementById('emergencyStop');

  // Add click listener
  emergencyStop.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default jump if href="#about"

    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 1.0 },
    });
  });