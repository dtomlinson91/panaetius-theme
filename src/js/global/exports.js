// const showModal = () => {
//   $("modal-button").on("click", () => {
//     $("#exampleModalCenter").modal("toggle");
//   });
// };

var testVar = "text";

const showModal = () => {
  $("#exampleModalCenter").modal({
    keyboard: false,
    show: false,
  });
  $("exampleModalCenter").modal("toggle");
};

