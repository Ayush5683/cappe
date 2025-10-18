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

  // Hidden native pickers
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

  // --- Date picker ---
  dateText.addEventListener("click", () => {
    hiddenDate.focus({ preventScroll: true });
    hiddenDate.showPicker();
  });

  hiddenDate.addEventListener("change", () => {
    const value = hiddenDate.value; // yyyy-mm-dd
    if (value) {
      const [year, month, day] = value.split("-");
      dateText.value = `${day}-${month}-${year}`; // dd-mm-yyyy
    }
  });

  // --- Time picker ---
  timeText.addEventListener("click", () => {
    hiddenTime.focus({ preventScroll: true });
    hiddenTime.showPicker();
  });

  hiddenTime.addEventListener("change", () => {
    const timeValue = hiddenTime.value; // HH:MM (24hr)
    if (timeValue) {
      const [hourStr, minute] = timeValue.split(":");
      let hour = parseInt(hourStr, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12; // convert to 12-hour format
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
      timeText.value = formattedTime;
    }
  });
});
