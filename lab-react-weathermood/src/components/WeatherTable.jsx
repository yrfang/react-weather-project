import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

import './weather_table.css';

export default class WeatherTable extends React.Component {
  static propTypes = {
      temp: PropTypes.number,
      description: PropTypes.string,
      unit: PropTypes.string,
  };

  static getUnitString(unit) {
      return unit === 'metric' ? 'C' : 'F';
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="weather_table">
          <Table inverse>
               <thead>
                   <tr>
                     <th>Table</th>
                     <th>Day1(Today)</th>
                     <th>Day2</th>
                     <th>Day3</th>
                     <th>Day4</th>
                     <th>Day5</th>
                   </tr>
               </thead>
               <tbody>
                   <tr>
                       <th scope="row">Temperature&nbsp;&ordm;&nbsp;{(this.props.unit === 'metric')
                           ? 'C'
                           : 'F'}</th>
                       {
                         this.props.list.map((m, index) => <td key={index}>{m.temp}</td>)
                       }
                     </tr>
                     <tr>
                       <th scope="row">Description</th>
                       {
                         this.props.list.map((m, index) => <td key={index}>{m.description}</td>)
                       }
                     </tr>
               </tbody>
           </Table>
      </div>
    );
  }
}
