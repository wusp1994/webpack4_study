import imageDemo from "./1570779702(1).jpg"

export function index() {
  const img = new Image()
  img.src = imageDemo
  img.classList.add("imgBox")
  let root = document.querySelector("#root")
  root.append(img)
}