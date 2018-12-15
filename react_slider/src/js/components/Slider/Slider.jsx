import React from 'react';
import PropTypes from 'prop-types';

import './Slider.css';

/**
 * Слайдер
 */
export default class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftRangeValue: this.props.leftRangeValue,
            rightRangeValue: this.props.rightRangeValue
        };

        this.onChange = this.onChange.bind(this);
    }

    /**
     * Вызывается при изменении значений инпутов
     *
     * @param element
     */
    onChange(element) {
        if (element.target.classList.contains('slider__range--left')) {
            this.setState({
                leftRangeValue: element.target.value
            });

            this.props.onChange(element.target.value, this.state.rightRangeValue);
        } else if (element.target.classList.contains('slider__range--right')) {
            this.setState({
                rightRangeValue: element.target.value
            });

            this.props.onChange(this.state.leftRangeValue, element.target.value);
        }
    }

    /**
     * Отдает background стиль для инпута (левого или правого)
     *
     * @param min
     * @param max
     * @param location - left/right
     * @return {string}
     */
    getBackgroundStyle(min, max, location) {
        if (location === 'left') {
            let result = 100 - Math.abs(this.state.leftRangeValue) * 100 / (max - min);

            return 'repeating-linear-gradient(to right, #d7dcdf 0%, #d7dcdf ' + result +
                '%, rgba(180, 0, 0, 0.8) 0, rgba(180, 0, 0, 0.8) 100%)';
        } else if (location === 'right') {
            let result = 100 - Math.abs(this.state.rightRangeValue) * 100 / (max - min);

            return 'repeating-linear-gradient(to left, #d7dcdf 0%, #d7dcdf ' + result +
                '%, rgba(0, 80, 0, 0.8) 0, rgba(0, 80, 0, 0.8) 100%)';
        }
    }

    /**
     * Формирует время в нормальном формате по значению даты в миллисекундах
     *
     * @param date
     * @return {string}
     */
    timeStr(date) {
        return (date.getTime() === 86400000) ? '00:00' :
            (date.getUTCHours() < 10 ? "0" : "") + date.getUTCHours() + ":" + (date.getUTCMinutes() < 10 ? "0" : "") + date.getUTCMinutes();
    }

    /**
     * Формирует дату в нормальном формате по ее значению в миллисекундах
     *
     * @param date
     * @return {string}
     */
    dateStr(date) {
        return (date.getDate() < 10 ? "0" : "") + date.getDate() + "-" + (date.getMonth() + 1 < 10 ? "0" : "") +
            (date.getMonth() + 1) + "-" + (date.getFullYear());
    }

    /**
     * Преобразует выбранное значение к формату даты/времени/процентов
     *
     * @param value
     * @param sliderClass
     * @return {string}
     */
    transformValue(value, sliderClass) {
        if (sliderClass.indexOf('time') !== -1) {
            if (sliderClass.indexOf('hours') !== -1) {
                return this.timeStr(new Date(Math.abs(value)));
            } else {
                return this.dateStr(new Date(Math.abs(value)));
            }
        } else {
            return value + '%';
        }
    }

    render() {
        let sliderClass = 'slider';

        return (
            <div className={sliderClass}>
                <div className={'slider__block'}>
                    <input type='range' className='slider__range--left' value={this.state.leftRangeValue} min='-100'
                           max='0'
                           style={{background: this.getBackgroundStyle(-100, 0, 'left')}} onChange={this.onChange}/>
                    <div className='slider__value--left'>{this.transformValue(this.state.leftRangeValue, sliderClass)}</div>
                </div>
                <div className='slider__middleBlock'/>
                <div className={'slider__block'}>
                    <input type='range' className='slider__range--right' value={this.state.rightRangeValue} min='0'
                           max='1000'
                           style={{background: this.getBackgroundStyle(0, 1000, 'right')}} onChange={this.onChange}/>
                    <div className='slider__value--right'>{this.transformValue(this.state.rightRangeValue, sliderClass)}</div>
                </div>
            </div>
        );
    }
}

Slider.propTypes = {
    /**
     * Значение левого инпута
     */
    leftRangeValue: PropTypes.number,

    /**
     * Значение правого инпута
     */
    rightRangeValue: PropTypes.number,

    /**
     * Вызывается при изменении значений
     */
    onChange: PropTypes.func
};

Slider.defaultProps = {
    leftRangeValue: -75,
    rightRangeValue: 75,
    onChange: function (leftRangeValue, rightRangeValue) {
        console.log('leftRange: ' + leftRangeValue);
        console.log('rightRange: ' + rightRangeValue + '\n');
    },
};