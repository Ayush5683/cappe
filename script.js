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

  // Create hidden inputs for native pickers
  const hiddenDate = document.createElement("input");
  hiddenDate.type = "date";
  hiddenDate.style.position = "fixed";   // keep fixed in viewport
  hiddenDate.style.top = "0";
  hiddenDate.style.left = "-9999px";     // move off-screen
  hiddenDate.style.opacity = "0";

  const hiddenTime = document.createElement("input");
  hiddenTime.type = "time";
  hiddenTime.style.position = "fixed";
  hiddenTime.style.top = "0";
  hiddenTime.style.left = "-9999px";
  hiddenTime.style.opacity = "0";

  document.body.appendChild(hiddenDate);
  document.body.appendChild(hiddenTime);

  // When user clicks visible field → open hidden input picker
  dateText.addEventListener("click", () => {
    hiddenDate.focus({ preventScroll: true }); // prevent scrolling
    hiddenDate.showPicker();
  });

  timeText.addEventListener("click", () => {
    hiddenTime.focus({ preventScroll: true });
    hiddenTime.showPicker();
  });

  // When user picks a value, reflect it back
  hiddenDate.addEventListener("change", () => {
    dateText.value = hiddenDate.value;
  });

  hiddenTime.addEventListener("change", () => {
    timeText.value = hiddenTime.value;
  });
});
