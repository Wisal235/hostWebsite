const projects = [
  {
    name: "Bathroom",
    pictures: [
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(5).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(6).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(7).jpg"
    ]
  },
  {
    name: "Stairs",
    pictures: [
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(8).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(9).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(10).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(11).jpg"
    ]
  },
  {
    name: "Sitting room",
    pictures: [
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(12).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(13).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(14).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(16).jpg"
    ]
  },
  {
    name: "Pathway",
    pictures: [
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(15).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(17).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(18).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(19).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(20).jpg"
    ]
  },
  {
    name: "Outdoor",
    pictures: [
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(21).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(22).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(23).jpg"
    ]
  },
  {
    name: "other",
    pictures: [
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(24).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(25).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(26).jpg",
      "https://ebrarprojects.s3.us-east-1.amazonaws.com/Image+(27).jpg"
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const projectBody = document.querySelector('.project-body');
  const island = document.querySelector('.island');
  const islandTitle = document.querySelector('.island .category-text');
  const imageDisplayHolder = document.querySelector('.image-display-holder')
  const templateMobileImageHolder = document.getElementById("mobileScreenImageHolder");
  const ddMenu = document.querySelector('.island .dropdown-menu');

  let startX;
  let deltaX;

  drawDropDown();
  InitCards(0);

  island.addEventListener('click', () => {
    ddMenu.classList.toggle('active');
  });

  function cardEventListener(el) {
    el.addEventListener('pointerdown', (e) => {
      startX = e.clientX;
      console.log(startX)
    })
    el.addEventListener('pointermove', (e) => {
      deltaX = e.clientX - startX;
      console.log(deltaX);
    })
    el.addEventListener('pointerup', (e) => {
      if (deltaX < -50) {
        reArrangeCards();
      }
      deltaX = 0;
    })
  }

  function reArrangeCards() {
    const displayCards = document.querySelectorAll('.image-holder')
    setTimeout(() => {
      displayCards.forEach(card => {
        let i = parseInt(card.dataset.index);
        let newI;
        if (i === 0) {
          newI = i + 1;
          card.dataset.index = newI;
        }
        else if (i === 1) {
          newI = displayCards.length - 1;
          card.dataset.index = newI;
        }
        else if (i === 2) {
          newI = 0;
          card.dataset.index = newI;
          let imgString = card.querySelector('img').src;
          projectBody.style.backgroundImage = `url("${imgString}")`;
        }
        else {
          newI = i - 1;
          card.dataset.index = newI;
        }
        applyCardStyles(card, newI);
      })
    }, 350)
  }

  function applyCardStyles(card, i) {
    card.classList.remove('display-card-1', 'display-card-2', 'display-card-3', 'hidden-display-card');
    if (i === 0) {
      card.classList.add('display-card-1');

    }
    else if (i == 1) {
      card.classList.add('display-card-2');
    }
    else if (i == 2) {
      card.classList.add('display-card-3');
    }
    else {
      card.classList.add('hidden-display-card');
    }
  }

  function InitCards(i) {
    const selectedProject = projects[i]
    islandTitle.innerText = selectedProject.name;

    imageDisplayHolder.innerHTML = ''

    selectedProject.pictures.forEach((image, i) => {

      const clone = templateMobileImageHolder.content.cloneNode(true);
      const imageHolder = clone.querySelector(".image-holder");

      if (i < 3) {
        imageHolder.classList.add(`display-card-${i + 1}`);
      }
      else {
        imageHolder.classList.add('hidden-display-card');
      }

      imageHolder.dataset.index = i;

      const img = document.createElement('img');
      img.draggable = false;
      img.src = image;
      img.alt = "Bathroom Project";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.borderRadius = "var(--rounded-xl)";

      cardEventListener(imageHolder);

      imageHolder.appendChild(img);

      imageDisplayHolder.appendChild(clone);
    });

    projectBody.style.backgroundImage = `url("${selectedProject.pictures[0]}")`;

  }

  function drawDropDown() {
    projects.forEach((p, i) => {
      const li = document.createElement('li');
      li.innerText = p.name;

      li.addEventListener('click', () => {
        // Remove landscape class by default
        imageDisplayHolder.classList.remove('landscape');

        // Add it back if project is "Outdoor"
        if (p.name === "Outdoor") {
          imageDisplayHolder.classList.add('landscape');
        }

        // Load project images
        InitCards(i);
      });

      ddMenu.appendChild(li);
    });
  }


})