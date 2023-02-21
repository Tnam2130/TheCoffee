function scrollToBlog() {
  document.getElementById("blog").scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "start",
  });
}
