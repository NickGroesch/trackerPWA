import React from 'react';
import { Pie, Bar } from "react-chartjs-2"

class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chart: props.chartData,
            // chartx: {
            //     labels: ['Beer', 'Wine', 'Cocktails'],
            //     datasets: [{
            //         label: '# of Drinks',
            //         data: [12, 19, 3],
            //         backgroundColor: [
            //             'rgba(255, 99, 132, 0.2)',
            //             'rgba(54, 162, 235, 0.2)',
            //             'rgba(255, 206, 86, 0.2)',

            //         ],
            //         borderColor: [
            //             'rgba(255, 99, 132, 1)',
            //             'rgba(54, 162, 235, 1)',
            //             'rgba(255, 206, 86, 1)',

            //         ],
            //         borderWidth: 1
            //     }]
            // },
        }
    }


    render() {
        console.log(this.state, this.props)
        return (
            <div><Bar data={this.props.chart} /></div>
            // <div><Bar data={this.state.chart} /></div>
        )
    }
}

export default Chart