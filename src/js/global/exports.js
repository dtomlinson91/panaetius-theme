const showModal = () => {
  console.log("Show Modal pressed");
  console.log($);
  $("#exampleModalCenter").modal("toggle");
};

export default { showModal: showModal };
