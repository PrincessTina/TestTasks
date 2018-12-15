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

        this.onRightRangeChange = this.onRightRangeChange.bind(this);
        this.onLeftRangeChange = this.onLeftRangeChange.bind(this);
        this.getBackgroundStyle = this.getBackgroundStyle.bind(this);
    }

    /**
     * Ставит новый кейс
     *
     * @param id - номер кейса
     *
     * @props onChange
     */
    changeCase(id) {
        if (id !== this.props.case) {
            this.props.onChange(id);
        }
    }

    /**
     * Отдает класс строки в меню по ее id
     *
     * @param id - номер строки
     *
     * @return {string}
     */
    getRowClass(id) {
        return (id === this.props.case) ? 'tabsMenu__row--selected' : 'tabsMenu__row';
    }

    /**
     * Отдает расположение слайдера, исходя из номера текущего кейса
     *
     * @return {Object}
     */
    getSliderStyle() {
        return {
            top: 21 + 32 * this.props.case
        };
    }

    /**
     * Отдает верстку для всех кейсов
     *
     * @props array
     *
     * @return {Array}
     */
    createMenuCases() {
        const array = this.props.array;
        let content = [];

        for (let i = 0; i < array.length; i++) {
            content.push(
                <div className={this.getRowClass(i)} key={i} onClick={() => this.changeCase(i)}>{array[i]}</div>
            );
        }

        return content;
    }

    onRightRangeChange(element) {
        this.setState({
            rightRangeValue: element.target.value
        });
    }

    onLeftRangeChange(element) {
        this.setState({
            leftRangeValue: element.target.value
        });
    }

    getBackgroundStyle(min, max, location) {
        if (location === 'left') {
            let result = 100 - Math.abs(this.state.leftRangeValue) * 100 / (max - min);

            return "repeating-linear-gradient(to right, #d7dcdf 0%, #d7dcdf " + result +
                "%, rgba(180, 0, 0, 0.8) 0, rgba(180, 0, 0, 0.8) 100%)";
        } else if (location === 'right') {
            let result = 100 - Math.abs(this.state.rightRangeValue) * 100 / (max - min);

            return "repeating-linear-gradient(to left, #d7dcdf 0%, #d7dcdf " + result +
                "%, rgba(0, 80, 0, 0.8) 0, rgba(0, 80, 0, 0.8) 100%)";
        }
    }

    render() {
        return (
            <div className="slider">
                <div className={"slider__block"}>
                    <input type="range" className="slider__range--left" value={this.state.leftRangeValue} min="-100" max="0"
                    style={{background: this.getBackgroundStyle(-100, 0, 'left')}} onChange={this.onLeftRangeChange}/>
                    <div className="slider__value--left">{this.state.leftRangeValue}</div>
                </div>
                <div className="slider__middleBlock"/>
                <div className={"slider__block"}>
                    <input type="range" className="slider__range--right" value={this.state.rightRangeValue} min="0" max="1000"
                           style={{background: this.getBackgroundStyle(0, 1000, 'right')}} onChange={this.onRightRangeChange}/>
                    <div className="slider__value--right">{this.state.rightRangeValue}</div>
                </div>
            </div>
        );
    }
}

Slider.propTypes = {
    /**
     * Значение левого инпута
     */
    leftRangeValue: PropTypes.number.isRequired,

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
    onChange: function () {
        console.log('leftRange: ' + this.state.leftRangeValue);
        console.log('rightRange: ' + this.state.rightRangeValue);
        console.log();
    },
};