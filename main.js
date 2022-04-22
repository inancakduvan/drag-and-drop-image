const dropContainer = document.querySelector(".drop-container");
const fileName = document.getElementById("file_name");

dropContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropContainer.addEventListener("drop", (event) => {
  event.preventDefault();

  let file;

  if (event.dataTransfer.items) {
    const item = event.dataTransfer.items[0];

    const isFile = item.kind === "file";
    const isImage = item.type.split("/")[0] === "image";

    if (isFile && isImage) {
      file = item.getAsFile();
    } else {
      alert("This is not an image!");

      return;
    }
  } else {
    file = event.dataTransfer.files[0];
  }

  const url = window.URL.createObjectURL(file);

  const image = document.createElement("img");
  image.src = url;

  dropContainer.innerHTML = "";
  dropContainer.appendChild(image);

  dropContainer.classList.add("uploaded");

  fileName.innerHTML = `${file.name} [${file.type}]`;
});
