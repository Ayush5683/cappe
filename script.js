function subnav_show() {
  if (document.getElementById("sub-nav").style.display === "block") {
    document.getElementById("sub-nav").style.display = "none";
    document.getElementById("fa-sort-down").style.rotate="0deg";
    document.getElementById("fa-sort-down").style.marginTop="0px";
}
else{
      document.getElementById("sub-nav").style.display = "block";
      document.getElementById("fa-sort-down").style.rotate="180deg";
      document.getElementById("fa-sort-down").style.marginTop="8px";
  }

}

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll" , () =>{
    if(window.scrollY > 300){
        toTop.classList.add("active");
    }
    else{
        toTop.classList.remove("active");
    }

})

document.addEventListener("DOMContentLoaded", function () {
  const dateText = document.getElementById("date");
  const timeText = document.getElementById("time");
  const personsSelect = document.getElementById("persons");

  // 🔹 Create hidden native pickers
  const hiddenDate = document.createElement("input");
  hiddenDate.type = "date";
  hiddenDate.style.position = "fixed";
  hiddenDate.style.top = "0";
  hiddenDate.style.left = "-9999px";
  hiddenDate.style.opacity = "0";

  const hiddenTime = document.createElement("input");
  hiddenTime.type = "time";
  hiddenTime.style.position = "fixed";
  hiddenTime.style.top = "0";
  hiddenTime.style.left = "-9999px";
  hiddenTime.style.opacity = "0";

  document.body.appendChild(hiddenDate);
  document.body.appendChild(hiddenTime);

  // 🔹 Set minimum date = today
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  hiddenDate.min = `${yyyy}-${mm}-${dd}`;

  // --- DATE PICKER ---
  dateText.addEventListener("click", () => {
    hiddenDate.focus({ preventScroll: true });
    hiddenDate.showPicker();
  });

  hiddenDate.addEventListener("change", () => {
    const value = hiddenDate.value; // yyyy-mm-dd
    if (value) {
      const [year, month, day] = value.split("-");
      dateText.value = `${day}-${month}-${year}`; // dd-mm-yyyy
      timeText.value = "";
      hiddenTime.value = "";
    }
  });

  // --- TIME PICKER ---
  timeText.addEventListener("click", () => {
    if (!hiddenDate.value) {
      showAlert("Please select a date first!");
      return;
    }

    const selectedDate = new Date(hiddenDate.value);
    const now = new Date();

    if (
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate()
    ) {
      now.setMinutes(now.getMinutes() + 5);
      const minHours = String(now.getHours()).padStart(2, "0");
      const minMinutes = String(now.getMinutes()).padStart(2, "0");
      hiddenTime.min = `${minHours}:${minMinutes}`;
    } else {
      hiddenTime.removeAttribute("min");
    }

    hiddenTime.focus({ preventScroll: true });
    hiddenTime.showPicker();
  });

  hiddenTime.addEventListener("change", () => {
    const timeValue = hiddenTime.value;
    if (timeValue) {
      const [hourStr, minute] = timeValue.split(":");
      let hour = parseInt(hourStr, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12;
      timeText.value = `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
    }
  });

  // --- Persons selector ---
  personsSelect.addEventListener("change", function () {
    if (this.value === "more") {
      const numberInput = document.createElement("input");
      numberInput.type = "number";
      numberInput.id = "persons-input";
      numberInput.placeholder = "Enter number of persons (11–50)";
      numberInput.min = 11;
      numberInput.max = 50;
      numberInput.required = true;

      this.parentNode.replaceChild(numberInput, this);

      numberInput.addEventListener("input", function () {
        if (this.value > 50) {
          showAlert("Maximum 50 seats can be booked!");
          this.value = "";
        }
      });
    }
  });
});

// --- Custom CAPPE alert function ---
function showAlert(message) {
  const alertBox = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");
  const alertOk = document.getElementById("alertOk");

  alertMessage.textContent = message;
  alertBox.style.display = "flex";

  alertOk.onclick = () => {
    alertBox.style.display = "none";
  };
}














const personsSelect = document.getElementById("persons");

personsSelect.addEventListener("change", function () {
    if (this.value === "more") {
        // Replace select with input box
        const numberInput = document.createElement("input");
        numberInput.type = "number";
        numberInput.id = "persons-input";
        numberInput.placeholder = "Enter number of persons (11-50)";
        numberInput.min = 11;
        numberInput.max = 50;
        numberInput.required = true;

        // Replace select with number input in DOM
        this.parentNode.replaceChild(numberInput, this);

        // Listen for value change to enforce max 50
        numberInput.addEventListener("input", function () {
            if (this.value > 50) {
                alert("Maximum 50 seats can be booked!");
                this.value = ""; // clear invalid input
            }
        });
    }
});



