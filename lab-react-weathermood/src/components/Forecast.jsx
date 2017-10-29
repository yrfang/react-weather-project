import React from 'react';
import PropTypes from 'prop-types';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import WeatherTable from 'components/WeatherTable.jsx';
import {getForecast} from 'api/open-weather-map.js';

import './weather.css';

export default class Forecast extends React.Component {
    static propTypes = {
        masking: PropTypes.bool,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string
    };

    static getInititalForecastState() {
        return {
          city: 'na',
          code: -1,
          group: 'na',
          description: 'N/A',
          temp: NaN
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            ...Forecast.getInititalForecastState(),
            loading: false,
            masking: false,
            list:[]

        };

        // TODO
        this.handleFormQuery = this.handleFormQuery.bind(this);
    }

    componentDidMount() {
        this.getForecastWeather('Taipei', 'metric');
    }

    render() {
        return (
            <div className={`forecast weather-bg ${this.state.group}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                    <WeatherDisplay {...this.state}/>
                    <WeatherTable list={this.state.list}/>
                    <WeatherForm city={this.state.city} unit={this.props.unit}
                    onQuery={this.handleFormQuery}/>
                </div>
            </div>
        );
    }

    getForecastWeather(city, unit) {
      this.setState({
        loading: true,
        masking: true,
        city: city
      }, () => {
        getForecast(city, unit).then(weather => {
          this.setState({
            ...weather[0],
            list: weather,
            loading: false
          }, () => this.notifyUnitChange(unit));
        }).catch(err => {
          console.error('Error getting weather', err);

          this.setState({
            ...Forecast.getInititalForecastState(unit),
            loading: false
          }, () => this.notifyUnitChange(unit));
        });
      });

      setTimeout(() => {
        this.setState({
          masking: false
        });
      }, 600);
    }

    handleFormQuery(city, unit) {
        this.getForecastWeather(city, unit);
    }

    notifyUnitChange(unit) {
        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }
    }
}
