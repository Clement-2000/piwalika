
    var content = document.querySelector("#content");
    var header = document.querySelector("#header");

    var transparency;
    var steps;

    var sizeUpdate = function () {
        transparency = {};
        steps = [];

        content.childNodes.forEach(element => {
            if (element.nodeType == document.ELEMENT_NODE) {
                if (element.classList.contains("parallax-section") || element.classList.contains("map-section")) {
                    transparency[element.offsetTop] = true;
                } else {
                    transparency[element.offsetTop] = false;
                }
                steps.push(element.offsetTop);
            }
        });

        scrollUpdate();
    };

    var scrollUpdate = function() {
        let next_step = 0;
        let previous_step = 0;

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            if (window.pageYOffset <= step) {
                next_step = step;
                if (i > 0) {
                    previous_step = steps[i-1];
                } else {
                    previous_step = 0;
                }
                break;
            }
        }

        if ((window.pageYOffset + header.offsetHeight > next_step - 1 && transparency[next_step] || window.pageYOffset + header.offsetHeight <= next_step && transparency[previous_step]) && !header.classList.contains("transparent-header")) {
            header.classList.add("transparent-header");
        } else if ((window.pageYOffset + header.offsetHeight > next_step - 1 && !transparency[next_step] || window.pageYOffset + header.offsetHeight <= next_step && !transparency[previous_step]) && header.classList.contains("transparent-header")) {
            header.classList.remove("transparent-header");
        }
    }

    window.onresize = sizeUpdate;
    window.onscroll = scrollUpdate;

    sizeUpdate();
    scrollUpdate();
