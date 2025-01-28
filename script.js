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