let destination = "";
let comfortLevel = "";
let startDate = "";
let endDate = "";
let activity = "";
let priceRange = "";

$(function() {
  $("#start-date").datepicker({
    onSelect: function(dateText) {
      startDate = dateText;
    }
  });
  $("#end-date").datepicker({
    onSelect: function(dateText) {
      endDate = dateText;
    }
  });
});

function onResortClicked() {
  let id = event.srcElement
    .getAttribute("aria-valuetext")
    .replace(/resort/g, "");

  localStorage.setItem("selectedResortId", parseInt(id));
  window.location = "/resort-page.html";
}

$(document).ready(function() {
  $("select#destination").change(function() {
    destination = $(this)
      .children("option:selected")
      .val();
  });

  $("select#comfort-level").change(function() {
    comfortLevel = $(this)
      .children("option:selected")
      .val();
  });

  $("select#activities").change(function() {
    activity = $(this)
      .children("option:selected")
      .val();
  });

  $("select#price").change(function() {
    priceRange = $(this)
      .children("option:selected")
      .val();
  });

  $("#search-button").click(function() {
    if (destination === "") {
      return alert("Please select a destination!");
    }
    if (comfortLevel === "") {
      return alert("Please select a destination!");
    }
    if (startDate === "") {
      return alert("Please select a destination!");
    }
    if (endDate === "") {
      return alert("Please select a destination!");
    }
    if (activity === "") {
      return alert("Please select a destination!");
    }
    if (priceRange === "") {
      return alert("Please select a destination!");
    }

    localStorage.setItem("destination", `${destination}`);
    localStorage.setItem("comfortLevel", `${comfortLevel}`);
    localStorage.setItem("startDate", `${startDate}`);
    localStorage.setItem("endDate", `${endDate}`);
    localStorage.setItem("activity", `${activity}`);
    localStorage.setItem("priceRange", `${priceRange}`);

    window.location = "./resort-listing.html";
    return false;
  });

  $(".destination-image").click(function() {
    console.log("hi");
    let destination = $(this).attr("aria-valuetext");
    localStorage.setItem("destination", `${destination}`);
    // console.log(localStorage.getItem("destination"));
    window.location = "./destination.html";
    return false;
  });

  let favoriteResorts = JSON.parse(localStorage.getItem("favoriteResorts"));

  if (favoriteResorts == null) {
    favoriteResorts = [];
  }

  let favoriteResortsHTML = "";

  $.each(favoriteResorts, function(index, id) {
    $.getJSON("resources/resorts.json", function(data) {
      let resorts = data["resorts"];
      let resort = resorts.find(element => {
        return element.id === "resort" + id;
      });

      favoriteResortsHTML += ` <div class="col-sm-6 item">
            <div class="row">
              <div class="col-md-12 col-lg-5">
                <a href="#" class="resort-image"  onclick="onResortClicked()"
                ><img class="img-fluid" src="img/resorts/${resort.name
                  .toLowerCase()
                  .replace(/ /g, "-")}/resort-1.jpeg"
                aria-valuetext="${resort.id}"
                /></a>
              </div>
              <div class="col">
                <h4 class="name">${resort.name}</h4>
                <p class="description">
                 ${resort.shortDescription}
                </p>
              </div>
            </div>
          </div>`;

      console.log(favoriteResorts);
      console.log(favoriteResortsHTML);

      $(".resort-list").html(favoriteResortsHTML);
    });
  });
});
