import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import './dashboard.css';

class PieChart extends Component {
constructor(props){
    super(props);
    this.state={
        chartData:{
            labels: ['Boston','Springfield'],
            datasets:[
                {
                    label: 'Population',
                    data:[617594,181045]
                }
            ],
                 backgroundColor:[
                'rgba(255,99,132,0.6)',
                'rgb(255,255,0,0.6)'
                
            ]
        }
    }
}
    render() { 
        return (
            <div className="chart">

                <Pie
                data={this.state.chartData}
                options={{ maintainAspectRatio: true }}
                />
            </div>
        );
    }
}
 
export default PieChart;