import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap'
import moment from "moment"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import { faWineGlassAlt } from '@fortawesome/free-solid-svg-icons'
import { faGlassWhiskey } from '@fortawesome/free-solid-svg-icons'
import { faGlassMartiniAlt } from '@fortawesome/free-solid-svg-icons'

import db from "./db"

import PieChart from "./pieChart"


console.log(db)
// interface SplashProps { }
// interface AppState {
//   peoples: any[]
// }
class Splash extends React.Component {

    constructor(props) {
        super(props);
        this.state = { drinksToday: [] }
        // this.makeCharts()
    }

    addBeer = () => {
        let timestamp = moment().format('HHmmss')
        let datestamp = moment().format("YYMMDD")
        let beer = {
            name: "beer", date: datestamp, time: timestamp, class: "beer"
        }
        db.table("drinks").add(beer)
        this.countDrinks()
        this.makeCharts()

        console.log(this.state)
    }
    addWine = () => {
        let timestamp = (moment().format('HHmmss'))
        let datestamp = moment().format("YYMMDD")
        let wine = {
            name: "wine", date: datestamp, time: timestamp, class: "wine"
        }
        db.table("drinks").add(wine)
        this.countDrinks()
        this.makeCharts()
    }
    addCocktail = () => {
        let timestamp = (moment().format('HHmmss'))
        let datestamp = moment().format("YYMMDD")
        let cocktail = {
            name: "cocktail", date: datestamp, time: timestamp, class: "cocktail"
        }
        db.table("drinks").add(cocktail).then(() => {
            // this.countDrinks().then(() => {

            //     this.makeCharts()
            // });
        })


    }
    countDrinks = () => {
        let today = moment().format("YYMMDD")
        db.table('drinks').where("date").startsWith(today)
            .toArray()
            .then((drinks) => {
                this.setState({ drinksToday: drinks });
            });
        db.table('drinks').where("date").startsWith(today)
            .and(function (x) { return x.class == "beer" })
            .toArray().then(drinks => this.setState({ beersToday: drinks.length }))

        db.table('drinks').where("date").startsWith(today)
            .and(function (x) { return x.class == "wine" })
            .toArray().then(drinks => this.setState({ winesToday: drinks.length }))

        db.table('drinks').where("date").startsWith(today)
            .and(function (x) { return x.class == "cocktail" })
            .toArray().then(drinks => this.setState({ cocktailsToday: drinks.length }))


    }

    makeCharts = () => {
        let chart = {
            // chart: {
            labels: ['Beer', 'Wine', 'Cocktails'],
            datasets: [{
                label: '# of Drinks',
                data: [this.state.beersToday, this.state.winesToday, this.state.cocktailsToday],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',

                ],
                borderWidth: 1
            }]
            // }
        }
        this.setState((state) => { return { chartData: chart } })
        console.log("xxx", this.state.chartData)//this is a suggestion, not a force for chartData
    }


    componentDidMount() {
        this.countDrinks()
        this.makeCharts()
    }


    render() {

        return (
            < Container >
                <Row>

                </Row>
                <Row>
                    <Col sm="6" md="4">
                        {/* <Row><Button outline class="spaced" color="secondary" size="lg" onClick={this.addBeer()}>Beer</Button></Row> */}
                        <Row><Button outline className="spaced" color="secondary" size="lg" onClick={this.addBeer}><FontAwesomeIcon icon={faBeer} />Beer</Button></Row>
                        <Row><Button outline className="spaced" color="secondary" size="lg" onClick={this.addWine}><FontAwesomeIcon icon={faWineGlassAlt} />Wine</Button></Row>
                        <Row><Button outline className="spaced" color="secondary" size="lg" onClick={this.addCocktail}><FontAwesomeIcon icon={faGlassWhiskey} />Single</Button></Row>
                        <Row><Button outline className="spaced" color="secondary" size="lg" onClick={this.addCocktail}><FontAwesomeIcon icon={faGlassMartiniAlt} />Double</Button></Row>
                    </Col>
                    <Col sm="6" md="8">
                        today I've had: {this.state.drinksToday.length} drinks
                        <ol>
                            {this.state.drinksToday.map((v, i) => {
                                return [<li key={i}>{v.name} {v.time}</li>]
                            }
                            )}
                        </ol>
                    </Col>
                    <PieChart chartData={this.state.chartData} />
                </Row>
            </Container >
        )
    }
}
// ReactDOM.render(
//     <Splash />,
//     document.getElementById('root')
// )

export default Splash


