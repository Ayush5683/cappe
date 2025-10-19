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
  const bookingForm = document.getElementById("bookingForm");

  // Create hidden native pickers
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

  // Set minimum date = today
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  hiddenDate.min = `${yyyy}-${mm}-${dd}`;

  // Helper: show native picker with fallback
  function openPicker(input) {
    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      // fallback: focus + click (some browsers)
      input.focus({ preventScroll: true });
      input.click();
    }
  }

  // DATE picker: click on visible field opens hidden native date
  dateText.addEventListener("click", function () {
    hiddenDate.focus({ preventScroll: true });
    openPicker(hiddenDate);
  });

  hiddenDate.addEventListener("change", function () {
    const value = hiddenDate.value; // yyyy-mm-dd
    if (value) {
      const [year, month, day] = value.split("-");
      dateText.value = `${day}-${month}-${year}`; // dd-mm-yyyy
      // reset time on date change
      timeText.value = "";
      hiddenTime.value = "";
    }
  });

  // TIME picker: ensure date selected first, and block past times on same day
  timeText.addEventListener("click", function () {
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
      // min time = now + 5 minutes (rounded to next minute)
      const minDate = new Date(now.getTime() + 5 * 60000);
      const minHours = String(minDate.getHours()).padStart(2, "0");
      const minMinutes = String(minDate.getMinutes()).padStart(2, "0");
      hiddenTime.min = `${minHours}:${minMinutes}`;
    } else {
      hiddenTime.removeAttribute("min");
    }

    hiddenTime.focus({ preventScroll: true });
    openPicker(hiddenTime);
  });

  hiddenTime.addEventListener("change", function () {
    const timeValue = hiddenTime.value; // 24-hour HH:MM
    if (timeValue) {
      const [hourStr, minute] = timeValue.split(":");
      let hour = parseInt(hourStr, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12;
      timeText.value = `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
    }
  });

  // Persons: replace with number input when "more" chosen
  personsSelect.addEventListener("change", function () {
    if (this.value === "more") {
      const numberInput = document.createElement("input");
      numberInput.type = "number";
      numberInput.id = "persons-input";
      numberInput.name = "persons"; // preserve form name
      numberInput.placeholder = "Enter number of persons (11–50)";
      numberInput.min = 11;
      numberInput.max = 50;
      numberInput.required = true;
      numberInput.style.boxSizing = "border-box";

      // Replace select with number input
      this.parentNode.replaceChild(numberInput, this);

      // If user clears input, restore select
      numberInput.addEventListener("input", function () {
        const val = parseInt(this.value, 10);
        if (!this.value) {
          // restore select back
          restorePersonsSelect();
        } else if (val > 50) {
          showAlert("Maximum 50 seats can be booked!");
          this.value = "";
        } else if (val < 11) {
          // optionally enforce min
          // do nothing — HTML min already prevents form submit
        }
      });

      // If user blurs empty input, restore select
      numberInput.addEventListener("blur", function () {
        if (!this.value) restorePersonsSelect();
      });
    }
  });

  // Restore original select (used when clearing the custom input)
  function restorePersonsSelect() {
    // if select already exists, do nothing
    if (document.getElementById("persons")) return;

    const select = document.createElement("select");
    select.name = "persons";
    select.id = "persons";
    select.required = true;

    const options = [
      ["", "Persons"],
      ["1", "1"],
      ["2", "2"],
      ["3", "3"],
      ["4", "4"],
      ["5", "5"],
      ["6", "6"],
      ["7", "7"],
      ["8", "8"],
      ["9", "9"],
      ["10", "10"],
      ["more", "More than 10"],
    ];

    options.forEach(([val, text]) => {
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = text;
      select.appendChild(opt);
    });

    // replace any existing persons-input (if present) with select
    const existingInput = document.getElementById("persons-input");
    if (existingInput) {
      existingInput.parentNode.replaceChild(select, existingInput);
    } else {
      // fallback: append to form before submit button
      bookingForm.querySelector("button[type='submit']").before(select);
    }

    // reattach change handler
    select.addEventListener("change", function () {
      if (this.value === "more") {
        // reuse logic by dispatching change event
        this.dispatchEvent(new Event("change"));
      }
    });
  }

  // Form submit: extra validation to ensure date/time/persons are present
  bookingForm.addEventListener("submit", function (e) {
    const personsField = document.querySelector("#persons, #persons-input");
    if (!dateText.value || !timeText.value || !personsField || !personsField.value) {
      e.preventDefault();
      showAlert("Please complete all required fields before submitting.");
      return false;
    }

    // If persons-input is present, validate range
    if (personsField.id === "persons-input") {
      const num = parseInt(personsField.value, 10);
      if (isNaN(num) || num < 11 || num > 50) {
        e.preventDefault();
        showAlert("Please enter a valid number of persons (11–50).");
        return false;
      }
    }

    // form will submit normally otherwise
  });
}); // end DOMContentLoaded

// Custom CAPPE alert function
function showAlert(message) {
  const alertBox = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");
  const alertOk = document.getElementById("alertOk");

  if (!alertBox || !alertMessage || !alertOk) {
    // Fallback to default alert if elements missing
    alert(message);
    return;
  }

  alertMessage.textContent = message;
  alertBox.style.display = "flex";
  alertBox.setAttribute("aria-hidden", "false");

  // Focus OK for accessibility
  alertOk.focus();

  function close() {
    alertBox.style.display = "none";
    alertBox.setAttribute("aria-hidden", "true");
    alertOk.removeEventListener("click", close);
  }

  alertOk.addEventListener("click", close);
}
