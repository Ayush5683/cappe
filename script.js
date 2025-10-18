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
  hiddenDate.style.position = "absolute";
  hiddenDate.style.opacity = "0";
  hiddenDate.style.pointerEvents = "none";

  const hiddenTime = document.createElement("input");
  hiddenTime.type = "time";
  hiddenTime.style.position = "absolute";
  hiddenTime.style.opacity = "0";
  hiddenTime.style.pointerEvents = "none";

  document.body.appendChild(hiddenDate);
  document.body.appendChild(hiddenTime);

  // When user clicks text field → open hidden input picker
  dateText.addEventListener("click", () => {
    hiddenDate.focus();
    hiddenDate.showPicker();
  });

  timeText.addEventListener("click", () => {
    hiddenTime.focus();
    hiddenTime.showPicker();
  });

  // When a value is picked, reflect it in visible field
  hiddenDate.addEventListener("change", () => {
    dateText.value = hiddenDate.value;
  });

  hiddenTime.addEventListener("change", () => {
    timeText.value = hiddenTime.value;
  });
});
