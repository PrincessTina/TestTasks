let ranges = $('.range-multi-slider'),
    slider = $('.range-multi-slider .range-slider'),
    range = $('.range-multi-slider .range-slider__range'),
    value = $('.range-multi-slider .range-slider__value'),
    ranges_S2 = $('.range-multi-slider.style_2'),
    range_S2 = $('.range-multi-slider.style_2 .range-slider__range');

function timeStr(d) {
    return (d.getTime() === 86400000) ? '24:00' :
        (d.getUTCHours() < 10 ? "0" : "") + d.getUTCHours() + ":" + (d.getUTCMinutes() < 10 ? "0" : "") + d.getUTCMinutes();
}

function dateStr(d) {
    let m = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    return (d.getDate() < 10 ? "0" : "") + d.getDate() + "-" + m[d.getMonth()] + "-" + (d.getYear() + 1900);
}

function getSliderPos(slider) {
    let range = $(slider).find('.range-slider__range');
    let min = range.attr('min');
    let max = range.attr('max');
    let value = range.val() - range.attr('min');

    return value / Math.abs(max - min) * 100;
}

function setBgHover($range) {
    let sliders = $range.find('.range-slider');
    let minPos, maxPos, left, width;

    for (let i = 0; i <= sliders.length - 1; i++) {
        if (i === 0) {
            left = 0;
            minPos = 0;
            maxPos = (getSliderPos(sliders[i]) + getSliderPos(sliders[i + 1])) / 2;
        } else {
            left += (getSliderPos(sliders[i - 1]) + getSliderPos(sliders[i])) / 2 + 0.3;
            minPos = (getSliderPos(sliders[i - 1]) + getSliderPos(sliders[i])) / 2 + 0.3;

            if (i === sliders.length - 1) {
                maxPos = 100;
            } else {
                maxPos = (getSliderPos(sliders[i + 1]) + getSliderPos(sliders[i + 2])) / 2;
            }
        }

        width = maxPos - minPos;

        let hover = $(sliders[i]).find('.hover');

        TweenMax.set(hover, {
            css: {
                left: left + '%',
                minWidth: width + '%',
                maxWidth: width + '%'
            }
        });
    }
}

function setBgBar($range) {
    let sliders = $range.find('.range-slider');
    let minPos, maxPos, left, width;

    for (let i = 0; i <= sliders.length - 1; i++) {
        let bar = $(sliders[i]).find('.bar');

        if (i === 0) {
            left = 0;
            width = getSliderPos(sliders[i]) - left;
        } else {
            if (i === sliders.length - 1) {
                left = getSliderPos(sliders[i]);
                width = 100 - left;
            }
        }

        TweenMax.set(bar, {
            css: {
                left: left + '%',
                minWidth: width + '%',
                maxWidth: width + '%'
            }
        });
    }
}

// начало работы
ranges.each(function () {
    setBgHover($(this));
});

value.each(function () {
    let value = $(this).closest('.range-slider').find('.range-slider__range').attr('value');

    if ($(this).closest('.range-multi-slider').hasClass('time')) {
        let time = new Date(value);
        let text = $(this).closest('.range-multi-slider').hasClass('hours') ? timeStr(time) : dateStr(time);

        $(this).html(text);
    } else {
        $(this).html(value);
    }
});

range.on('input', function () {
    let label = $(this).closest('.range-slider').find('.range-slider__value');

    $(this).attr('value', this.value);

    if (this.value > $(this).closest('.range-slider').next('.range-slider').find('.range-slider__range').attr('value')) {
        this.value = $(this).closest('.range-slider').next('.range-slider').find('.range-slider__range').attr('value');
    }

    if (this.value < $(this).closest('.range-slider').prev('.range-slider').find('.range-slider__range').attr('value')) {
        this.value = $(this).closest('.range-slider').prev('.range-slider').find('.range-slider__range').attr('value');
    }

    if (label.closest('.range-multi-slider').hasClass('time')) {
        let time = new Date(this.value);
        let text = label.closest('.range-multi-slider').hasClass('hours') ? timeStr(time) : dateStr(time);
        label.html(text);
    } else {
        label.html(this.value);
    }

    setBgHover($(this).closest('.range-multi-slider'));
});

ranges_S2.each(function () {
    setBgBar($(this));
});

range_S2.on('input', function () {
    setBgBar($(this).closest('.range-multi-slider'));
});