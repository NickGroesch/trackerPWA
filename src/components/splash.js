import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap'
import moment from "moment"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import { faWineGlassAlt } from '@fortawesome/free-solid-svg-icons'
import { faGlassWhiskey } from '@fortawesome/free-solid-svg-icons'
import { faGlassMartiniAlt } from '@fortawesome/free-solid-svg-icons'
import { ReactIndexedDB } from 'react-indexed-db'

import db from "./db"

console.log(db)
// interface SplashProps { }
// interface AppState {
//   peoples: any[]
// }
class Splash extends React.Component {
    // db = ReactIndexedDB;
    // state = { drinks: [] }
    constructor(props) {
        super(props);
        this.state = { drinksToday: [] }
    }

    addBeer = () => {
        let timestamp = moment().format('HHmmss')
        let datestamp = moment().format("YYMMDD")
        let beer = {
            name: "beer", date: datestamp, time: timestamp, class: "beer"
        }
        db.table("drinks").add(beer)
        this.countDrinks()
    }
    addWine = () => {
        let timestamp = (moment().format('HHmmss'))
        let datestamp = moment().format("YYMMDD")
        let wine = {
            name: "wine", date: datestamp, time: timestamp, class: "wine"
        }
        db.table("drinks").add(wine)
        this.countDrinks()
    }
    addCocktail = () => {
        let timestamp = (moment().format('HHmmss'))
        let datestamp = moment().format("YYMMDD")
        let cocktail = {
            name: "cocktail", date: datestamp, time: timestamp, class: "cocktail"
        }
        db.table("drinks").add(cocktail)
        this.countDrinks()
    }
    countDrinks = () => {
        let today = moment().format("YYMMDD")
        db.table('drinks').where("date").startsWith(today)
            .toArray()
            .then((drinks) => {
                this.setState({ drinksToday: drinks });
            });
    }


    componentDidMount() {
        this.countDrinks()
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
                                return [<li>{v.name} {v.time}</li>]
                            }
                            )}
                        </ol>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default Splash


