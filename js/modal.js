//Modal is a class that creates a modal dialog for every html element with the class "modal".
// from displya none to block
//Modal is a background for the modal dialog
//modal dialog has a text and other elements

const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector("#btn-get");
const closeModalBtn = document.querySelector(".modal_close");

const openModal = () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; //disables scroll
};

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = ""; //enables scroll
};

// openModalBtn.onclick = () => {
//   openModal();
// };

//OR
// instead of above - shorten by inputting "onclick="openModal()"" to index.html

//OR
openModalBtn.onclick = openModal; //newer works with tags and HTML
closeModalBtn.onclick = closeModal;
modal.onclick = (event) => {
  if (event.target === modal) {
    closeModal();
  }
};

// openModalBtn.addEventListener("click", openModal); //older and doesnot work with tags

//hw3 scrolling down - open modal box once

let hasModalShown = false;

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Check if we've reached the bottom of the page
  if (scrollPosition >= documentHeight) {
    if (!hasModalShown) {
      openModal();
      hasModalShown = true;

      // Remove scroll listener to prevent showing the modal again
      window.removeEventListener("scroll", handleScroll);
    }
  }
};

// Add the scroll event listener
window.addEventListener("scroll", handleScroll);

//hw3 after 10 sec of opeining the page - modal window needs to pop up

setTimeout(() => {
  openModal();
}, 10000);
