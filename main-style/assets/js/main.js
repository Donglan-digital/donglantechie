(function ($) {
  var $window = $(window),
    $body = $("body"),
    $header = $("#header"),
    $all = $body.add($header);

  // Breakpoints.
  breakpoints({
    xxlarge: ["1681px", "1920px"],
    xlarge: ["1281px", "1680px"],
    large: ["1001px", "1280px"],
    medium: ["737px", "1000px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Touch mode.
  if (browser.mobile) $body.addClass("is-touch");
  else {
    breakpoints.on("<=small", function () {
      $body.addClass("is-touch");
    });

    breakpoints.on(">small", function () {
      $body.removeClass("is-touch");
    });
  }

  // Fix: IE flexbox fix.
  if (browser.name == "ie") {
    var $main = $(".main.fullscreen"),
      IEResizeTimeout;

    $window
      .on("resize.ie-flexbox-fix", function () {
        clearTimeout(IEResizeTimeout);

        IEResizeTimeout = setTimeout(function () {
          var wh = $window.height();

          $main.each(function () {
            var $this = $(this);

            $this.css("height", "");

            if ($this.height() <= wh) $this.css("height", wh - 50 + "px");
          });
        });
      })
      .triggerHandler("resize.ie-flexbox-fix");
  }

  // Section transitions.
  if (browser.canUse("transition")) {
    var on = function () {
      // Galleries.
      $(".gallery").scrollex({
        top: "30vh",
        bottom: "30vh",
        delay: 50,
        initialize: function () {
          $(this).addClass("inactive");
        },
        terminate: function () {
          $(this).removeClass("inactive");
        },
        enter: function () {
          $(this).removeClass("inactive");
        },
        leave: function () {
          $(this).addClass("inactive");
        },
      });

      // Generic sections.
      $(".main.style1").scrollex({
        mode: "middle",
        delay: 100,
        initialize: function () {
          $(this).addClass("inactive");
        },
        terminate: function () {
          $(this).removeClass("inactive");
        },
        enter: function () {
          $(this).removeClass("inactive");
        },
        leave: function () {
          $(this).addClass("inactive");
        },
      });

      $(".main.style2").scrollex({
        mode: "middle",
        delay: 100,
        initialize: function () {
          $(this).addClass("inactive");
        },
        terminate: function () {
          $(this).removeClass("inactive");
        },
        enter: function () {
          $(this).removeClass("inactive");
        },
        leave: function () {
          $(this).addClass("inactive");
        },
      });
    };

    var off = function () {
      // Galleries.
      $(".gallery").unscrollex();

      // Generic sections.
      $(".main.style1").unscrollex();

      $(".main.style2").unscrollex();
    };
    on();
  }

  // Events.
  var resizeTimeout, resizeScrollTimeout;

  $window
    .on("resize", function () {
      $body.addClass("is-resizing");

      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(function () {
        $('a[href^="#"]').scrolly({
          speed: 1500,
          offset: $header.outerHeight() - 1,
        });

        setTimeout(function () {
          $body.removeClass("is-resizing");
          $window.trigger("scroll");
        }, 0);
      }, 100);
    })
    .on("load", function () {
      $window.trigger("resize");
    });

  // Transition of Profile Image in Section One
  (function ($) {
    $window.on("load", function () {
      $(".profile-pic").removeClass("animate-in");
      $("#one .profile-pic").scrollex({
        top: "10vh",
        bottom: "10vh",
        delay: 100,
        initialize: function () {
          $(this).removeClass("animate-in");
        },
        enter: function () {
          var $profilePic = $(this);
          $profilePic.removeClass("animate-in");
          $profilePic[0].offsetHeight;
          setTimeout(function () {
            $profilePic.addClass("animate-in");
          }, 50);
        },
        leave: function () {
          $(this).removeClass("animate-in");
        },
      });
    });
  })(jQuery);

  // Tech icons in Section Two animation
  (function ($) {
    $(window).on("load", function () {
      $("#two .tech-icon").scrollex({
        top: "5vh",
        bottom: "5vh",
        delay: 100,
        initialize: function () {
          $("#two .tech-icon").removeClass("fly-in");
        },
        enter: function () {
          $("#two .tech-icon").each(function (i) {
            var $icon = $(this);
            setTimeout(function () {
              $icon.addClass("fly-in");
            }, i * 60);
          });
        },
        leave: function () {
          $("#two .tech-icon").removeClass("fly-in");
        },
      });
    });
  })(jQuery);
})(jQuery);
