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

// interface SplashProps { }
// interface AppState {
//   peoples: any[]
// }
class Splash extends React.Component {
    // db = ReactIndexedDB;
    // state = { drinks: [] }
    constructor(props) {
        super(props);
        this.state = { drinkstoday: 0 }
        this.db = new ReactIndexedDB('myDB', 1);
        this.db.openDatabase(1, (evt) => {
            const request = evt.currentTarget;
            let objectStore = request.result.createObjectStore('drinks', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('id', 'id', { unique: true });
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('time', 'time', { unique: false });
            objectStore.createIndex('class', 'class', { unique: false });
            objectStore.createIndex('date', 'date', { unique: false });
        }).then(() => {
            // this.getAll();
        });
    }

    // idb = function () {


    //     //check for support
    //     if (!('indexedDB' in window)) {
    //         console.log('This browser doesn\'t support IndexedDB');
    //         return;
    //     }

    // var dbPromise = indexedDB.open('drinksies', 1);
    // dbPromise.onerror = function (event) {
    //     console.log(event)
    //     // This is done for handling errors. 
    // };
    // dbPromise.onupgradeneeded = function (event) {
    //     var db = event.target.result;
    //     // let time = moment()
    //     var objectStore = db.createObjectStore("drinks", { keyPath: "time" });
    //     var addBeer = function () {
    //         objectStore.add({ drink: "beer", time: moment() })
    //     }


    // }
    addBeer = () => {
        let timestamp = moment().format('hhmmss')
        let datestamp = moment().format("YYMMDD")
        this.db.add("drinks", { name: "beer", date: datestamp, time: timestamp, class: "beer" }).then(err => err ? this.countDrinks() : console.log(err))

    }
    addWine = () => {
        let timestamp = (moment().format('hhmmss'))
        let datestamp = moment().format("YYMMDD")

        this.db.add("drinks", { name: "wine", date: datestamp, time: timestamp, class: "wine" }).then(err => err ? alert("you done drank a wine") : console.log(err))
    }
    addCocktail = () => {
        let timestamp = (moment().format('hhmmss'))
        let datestamp = moment().format("YYMMDD")

        this.db.add("drinks", { name: "cocktail", date: datestamp, time: timestamp, class: "cocktail" }).then(err => err ? alert("you done drank a liquer") : console.log(err))
    }
    countDrinks = () => {
        let today = moment().format("YYMMDD")
        let arr = this.db.getAll('drinks', IDBKeyRange.upperBound(today - 1), "date")
            .then((res, err) => console.log(res)).then(drink => console.log(drink))
        console.log("in here", arr)
        this.setState({ drinkstoday: arr.length })
        console.log(this.state.drinkstoday)
    }


    componentDidMount() {
        this.db.openDatabase(1, (evt) => {
            const request = evt.currentTarget;
            let objectStore = request.result.createObjectStore('drinks', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('id', 'id', { unique: true });
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('time', 'time', { unique: false });
            objectStore.createIndex('class', 'class', { unique: false });
        }).then(() => {
            this.db.getAll().then(drink => console.log(drink));
        });
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
                        today I've had: {this.state.drinkstoday} drinks
        </Col>
                </Row>
            </Container >
        )
    }
}

export default Splash


