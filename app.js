const teamMembers = [
	{ name: "Adajonim ", role: " ismlari Komil yoshlari 43 da kasblari sanatkor" },
	{ name: "Onajonim", role: "ismlari dilafruz yoshlari 38 da " },
	{ name: "Opam", role: "ismlari Muslima yoshlari 17 da 11 sinfda o'qidilar" },
	{ name: "Ukam", role: "ismi Muhammadyusuf yoshi 13 da 8 sinfda o'qidi" },
	{ name: "Man", role: "ismim Muhammadamin yoshim 16 da 10 sinfda o'qiman" },
	// { name: "James Wilson", role: "Product Manager" }
];

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
	if (isAnimating) return;
	isAnimating = true;

	currentIndex = (newIndex + cards.length) % cards.length;

	cards.forEach((card, i) => {
		const offset = (i - currentIndex + cards.length) % cards.length;

		card.classList.remove(
			"center",
			"left-1",
			"left-2",
			"right-1",
			"right-2",
			"hidden"
		);

		if (offset === 0) {
			card.classList.add("center");
		} else if (offset === 1) {
			card.classList.add("right-1");
		} else if (offset === 2) {
			card.classList.add("right-2");
		} else if (offset === cards.length - 1) {
			card.classList.add("left-1");
		} else if (offset === cards.length - 2) {
			card.classList.add("left-2");
		} else {
			card.classList.add("hidden");
		}
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});

	memberName.style.opacity = "0";
	memberRole.style.opacity = "0";

	setTimeout(() => {
		memberName.textContent = teamMembers[currentIndex].name;
		memberRole.textContent = teamMembers[currentIndex].role;
		memberName.style.opacity = "1";
		memberRole.style.opacity = "1";
	}, 300);

	setTimeout(() => {
		isAnimating = false;
	}, 800);
}

leftArrow.addEventListener("click", () => {
	updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
	updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
	dot.addEventListener("click", () => {
		updateCarousel(i);
	});
});

cards.forEach((card, i) => {
	card.addEventListener("click", () => {
		updateCarousel(i);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		updateCarousel(currentIndex - 1);
	} else if (e.key === "ArrowRight") {
		updateCarousel(currentIndex + 1);
	}
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const swipeThreshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > swipeThreshold) {
		if (diff > 0) {
			updateCarousel(currentIndex + 1);
		} else {
			updateCarousel(currentIndex - 1);
		}
	}
}

updateCarousel(0);

const pages = document.querySelectorAll(".page");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const book = document.getElementById("book");
const status = document.getElementById("status");

let currentPage = 0;

function updateBook() {
    pages.forEach((page, index) => {
        if (index < currentPage) {
            page.classList.add("flipped");
            page.style.zIndex = index + 1;
        } else {
            page.classList.remove("flipped");
            page.style.zIndex = pages.length - index;
        }
    });

    status.textContent = currentPage === 0
        ? "Muqova — 0 / 4"
        : `Ochilgan sahifalar — ${currentPage} / 4`;
}

function nextPage() {
    if (currentPage < pages.length) {
        currentPage++;
        updateBook();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updateBook();
    }
}

nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);

book.addEventListener("click", (event) => {
    const rect = book.getBoundingClientRect();
    const x = event.clientX - rect.left;

    if (x > rect.width / 2) {
        nextPage();
    } else {
        prevPage();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") nextPage();
    if (event.key === "ArrowLeft") prevPage();
});

updateBook();










(() => {
  const aminSection = document.querySelector("#amin-contact");

  if (!aminSection) return;

  const aminForm = aminSection.querySelector(".amin-form");
  const aminStatus = aminSection.querySelector(".amin-status");

  aminForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!aminForm.reportValidity()) return;

    const aminData = new FormData(aminForm);

    const aminFirst = aminData.get("firstName").trim();
    const aminLast = aminData.get("lastName").trim();
    const aminEmail = aminData.get("email").trim();
    const aminSubject = aminData.get("subject");
    const aminMessage = aminData.get("message").trim();

    // O'zingning haqiqiy emailingni yoz
    const aminReceiver = "YOUR_EMAIL@gmail.com";

    const aminBody =
      `Name: ${aminFirst} ${aminLast}\n` +
      `Email: ${aminEmail}\n\n` +
      `Message:\n${aminMessage}`;

    const aminMailto =
      `mailto:${aminReceiver}` +
      `?subject=${encodeURIComponent(aminSubject)}` +
      `&body=${encodeURIComponent(aminBody)}`;

    aminStatus.textContent =
      "Email dasturi ochilmoqda...";

    window.location.href = aminMailto;
  });
})();
