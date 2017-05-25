$(function () {

    // $(".calc__range-slider-mobile").rangeslider({
    //     polyfill: false,
    //     onSlide: function(position, value) {
    //         if (value >= 2) {

    //             $(".calc__range-block-mobile").each(function() {
    //                 var self = $(this);

    //                 if(self.index()  <= value) {
    //                     self.addClass("calc__range-block-mobile_active");
    //                 } else {
    //                     self.removeClass("calc__range-block-mobile_active");
    //                 }
    //             });
    //         }

    //         if (value == 6) {
    //             $(".calc__range-wrap").addClass("calc__range-wrap_full");
    //         } else {
    //             $(".calc__range-wrap").removeClass("calc__range-wrap_full");
    //         }
    //     }
    // });

    if ($('input[type=range]').length) {
        $('input[type=range]').rangeslider({
            polyfill: false,
            onInit: function () {
                $("#val1").text("100 000");
                $("#val2").text("81 000");
                $("#val3").text("30 000");
                $("#val4").text("1 359 876");
            },
            onSlide: function (position, value) {
                if (value == 1) {
                    $("#val1").text("100 000");
                    $("#val2").text("81 000");
                    $("#val3").text("30 000");
                    $("#val4").text("1 359 876");
                } else if (value == 2) {
                    $("#val1").text("500 000");
                    $("#val2").text("40 000");
                    $("#val3").text("100 000");
                    $("#val4").text("11 638 284");
                } else if (value == 3) {
                    $("#val1").text("300 000");
                    $("#val2").text("380 000");
                    $("#val3").text("200 000");
                    $("#val4").text("11 292 384");
                } else if (value == 4) {
                    $("#val1").text("500 000");
                    $("#val2").text("380 000");
                    $("#val3").text("200 000");
                    $("#val4").text("11 292 384");
                } else if (value == 5) {
                    $("#val1").text("1 000 000");
                    $("#val2").text("380 000");
                    $("#val3").text("200 000");
                    $("#val4").text("10 745 232");
                } else if (value == 6) {
                    $("#val1").text("1 500 000");
                    $("#val2").text("380 000");
                    $("#val3").text("200 000");
                    $("#val4").text("7 462 728");
                }
                if (value >= 2) {

                    $(".calc__range-block").each(function () {
                        var self = $(this);

                        if (self.index() + 3 <= value) {
                            self.addClass("calc__range-block_active");
                        } else {
                            self.removeClass("calc__range-block_active");
                        }
                    });
                }

                if (value == 6) {
                    $(".calc__range-wrap").addClass("calc__range-wrap_full");
                } else {
                    $(".calc__range-wrap").removeClass("calc__range-wrap_full");
                }
            }
        });
    }

    function setSec3TextPaddingLeft() {
        var sec2TextBlockNumberWidth = $("h2").width();
        console.log(sec2TextBlockNumberWidth);
        $(".sec3__text").css("padding-left", sec2TextBlockNumberWidth - 30);
    }

    //setSec3TextPaddingLeft();


    webshim.setOptions('forms', {
        lazyCustomMessages: true,
        replaceValidationUI: true
    });
    webshim.polyfill('forms');

    function phoneLink() {
        var md = new MobileDetect(window.navigator.userAgent);
        var phoneLink = $("[data-phone]");

        if (md.mobile()) {
            phoneLink.attr("href", "tel:" + $(".phone-link").data("phone"));
            phoneLink.removeClass("js-small-btn");
            console.log("mobile");
        } else {
            phoneLink.attr("href", "");
            phoneLink.addClass("js-small-btn");
            console.log("pc");
        }
    }
    phoneLink();

    // form handler
    var body = $("body");
    var name;

    $("input[name=phone]").inputmask({
        "mask": "+9(999)999-9999",
        greedy: false
    });

    body.on("click", ".js-small-btn", function (e) {
        e.preventDefault();

        if (!$(".thanks").length) {
            $("html").addClass("form-open");
            $(".form-wrap_small").addClass("form-wrap_open");
        }
    });

    body.on("click", function (e) {
        var self = $(e.target);

        if (self.hasClass("form-wrap_small") || self.hasClass("form__close")) {
            $("html").removeClass("form-open");
            $(".form-wrap").removeClass("form-wrap_open");
        } else if (self.hasClass("form-wrap_big")) {
            location = "thanks.html";
        }
    });

    if (typeof wl != "undefined") {
        wl.callbacks.onFormSubmit = function ($form, res) {
            if ($form.data('next')) {

                if (res.status == 200) {
                    $(".form-wrap_open").removeClass("form-wrap_open");

                    var selfName = $form.find("input[name=name]");
                    var selfPhone = $form.find("input[name=phone]");
                    var selfEmail = $form.find("input[name=email]");
                    var formData = $form.serialize();
                    console.log(formData);

                    $("[name=name1]").val(selfName.val());
                    $("[name=phone1]").val(selfPhone.val());
                    $("[name=email1]").val(selfEmail.val());

                    $("html").addClass("form-open");
                    $(".form-wrap_big").addClass("form-wrap_open");

                    name = selfName.val();

                    if (name) {
                        localStorage.setItem("landclientname", name + ", наши");
                    } else {
                        localStorage.setItem("landclientname", "Наши");
                    }
                } else {
                    wl.callbacks.def.onFormSubmit($form, res);
                }
            } else {
                location = "thanks.html";
            }
        };
    } else {
        $("#smallForm, #bottomForm").submit(function (e) {
            e.preventDefault();
            $(".form-wrap_open").removeClass("form-wrap_open");

            var self = $(this);
            var selfName = self.find("input[name=name]");
            var selfPhone = self.find("input[name=phone]");
            var selfEmail = self.find("input[name=email]");
            var formData = self.serialize();
            console.log(formData);

            $("[name=name1]").val(selfName.val());
            $("[name=phone1]").val(selfPhone.val());
            $("[name=email1]").val(selfEmail.val());

            $.when($.ajax({
                type: "POST",
                url: "php/send.php",
                data: formData,
                success: function (data) {}
            }), $.ajax({
                type: "POST",
                url: "php/sendwe.php",
                data: formData,
                success: function (data) {}
            }));

            $("html").addClass("form-open");
            $(".form-wrap_big").addClass("form-wrap_open");

            name = selfName.val();

            if (name) {
                localStorage.setItem("landclientname", name + ", наши");
            } else {
                localStorage.setItem("landclientname", "Наши");
            }
        });

        $("#bigForm").submit(function (e) {
            e.preventDefault();

            var self = $(this);
            var formData = self.serialize();

            $.ajax({
                type: "POST",
                url: "php/sendpresent.php",
                data: formData,
                success: function (data) {
                    location = "thanks.html";
                }
            });
        });
    }

    if ($("#thanksName").length) {
        $("#thanksName").text(localStorage.getItem("landclientname"));
    };
});
//# sourceMappingURL=app.js.map
