var appState = 0;
var toggleStatus = 0;
var answer = "";

var data = [{ url: "media/bread.png" }, { url: "media/coin.wav" }];

$(function() {
  Store.loaddata(data).then(function() {
    $(".item-image").css(
      "background-image",
      "url(" + Store.cache["media/bread.png"].src + ")"
    );
  });
});

var app = new Vue({
  el: "#app",
  data: {
    action: "",
    choice: [],
    button: "Go to cashier",
    warnMessage: ""
  },
  methods: {
    changeStatus() {
      Store.cache["media/coin.wav"].play();
      this.closeMessage();
      switch (appState) {
        case 0: // products
          this.goToPay();
          break;
        case 1: // pay quiz
          this.goToCoins();
          break;
        case 2: // coins quiz
          this.goToReceive();
          break;
        case 3: // receive quiz
          this.goToFinish();
          break;
        case 4: // finish
          this.goToProducts();
          break;
        default:
          break;
      }
    },
    toggleMenu() {
      if (toggleStatus === 0) {
        $(".menu").toggleClass("menu-active");
        $("#menu-button").toggleClass("menu-button-active");
        toggleStatus = 1;
      } else if (toggleStatus === 2) {
        $(".menu").toggleClass("menu-open");
        toggleStatus = 1;
        $(".menu-list")
          .children()
          .show();
        $("#wallet-menu").hide();
        $("#shoplist-menu").hide();
        $("#shopcart-menu").hide();
      } else {
        $(".menu").toggleClass("menu-active");
        $("#menu-button").toggleClass("menu-button-active");
        setTimeout(function() {
          $(".menu-list")
            .children()
            .show();
          $("#wallet-menu").hide();
          $("#shoplist-menu").hide();
          $("#shopcart-menu").hide();
        }, 1000);

        toggleStatus = 0;
      }
    },
    toggleButton(event) {
      var elementId = event.currentTarget.id;
      if (toggleStatus === 1) {
        toggleStatus = 2;
        $(".menu").toggleClass("menu-open");
        $(".menu-list")
          .children()
          .hide();
        switch (elementId) {
          default:
            break;
          case "toggle-wallet":
            $("#" + elementId).show();
            $("#wallet-menu").show();
            break;
          case "toggle-shop-cart":
            $("#" + elementId).show();
            $("#shopcart-menu").show();
            break;
          case "toggle-shop-list":
            $("#" + elementId).show();
            $("#shoplist-menu").show();
            break;
        }
      }
    },
    selectAnswer(event) {
      // one selected answer will have a different style
      // while it unselects the rest of the choices
      $(".choice").toggleClass("choice-selected", false);
      $("#" + event.currentTarget.id).toggleClass("choice-selected", true);
      answer = event.currentTarget.id;

      // match the right answer with the user selected answer
      // if wrong, return to the first page
    },
    goToProducts() {
      appState = 0;
      $("#thanks-container").hide();
      $("#shop-items").show();
      this.button = "Go to cashier";
    },
    goToPay() {
      appState = 1;
      $("#shop-items").hide();
      $("#multi-quiz").show();
      this.action = "pay";
      this.choice = [42, 53, 62, 32];
      this.button = "Submit answer";
    },
    goToCoins() {
      if (answer) {
        appState = 2;
        $("#multi-quiz").hide();
        $("#quiz-select-coins").show();
        this.button = "Pay coins";
      } else {
        // TODO warning message: You must select an answer
        $("#message-box").show();
        this.warnMessage = "Please select an answer.";
      }
    },
    goToReceive() {
      appState = 3;
      $("#quiz-select-coins").hide();
      $("#multi-quiz").show();
      this.action = "receive";
      this.choice = [2, 3, 5, 1];
      this.button = "Submit answer";
    },
    goToFinish() {
      appState = 4;
      $("#multi-quiz").hide();
      $("#thanks-container").show();
      this.button = "Exit shop";
    },
    closeMessage() {
      $("#message-box").hide();
    }
  }
});
