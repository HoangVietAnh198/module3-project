$(function () {
  $("#upload_link").on("click", function (e) {
    e.preventDefault();
    $("#upload:hidden").trigger("click");
  });
});

$(function () {
  $("#upload-image").on("click", function (e) {
    e.preventDefault();
    $("#upload-img:hidden").trigger("click");
  });
});

let api = "http://127.0.0.1:3000/";
let formStudySet = document.getElementById("form-study-set");

formStudySet.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = formStudySet.title.value;
  let description = formStudySet.description.value;
  let data = { title, description };
  fetch(api + `study/question/1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
