import "bootstrap";

const showModal = () => {
  console.log("Show Modal pressed");
  console.log($);
  // $("#exampleModalCenter").modal({
  //   keyboard: false,
  //   show: false,
  // });
  $("exampleModalCenter").modal("toggle");
};

export default showModal;
