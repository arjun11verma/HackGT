import React, {useState, useEffect, useRef, useCallback, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory, useLocation} from "react-router-dom";
import * as firebase from 'firebase'

import {IoMdCall, IoMdBook} from "react-icons/io";

import '../App.css';
import {colors} from '../App.js'

const topics = ["Response to COVID-19", "Racial Justice", "Election 2020", "American Healthcare", "Climate Change", "Legal and Illegal Immigration", "Education"];

export default function Dashboard() {
    const history = useHistory();
    if (firebase.auth().currentUser == null) {
        history.push("/account");
    }
    
    return (
        <div className="container" style={{backgroundImage: 'url(' + require('../cool-background-4.svg') + ')', backgroundSize: "cover"}}>
            {firebase.auth().currentUser != null ?
                <div style={{height: 680, minHeight: 680, overflowY: "scroll", backgroundColor: "white", borderRadius: 10, boxShadow: "0px 2px 20px grey", padding: 16, width: "50%", marginLeft: "25%"}}>
                    <h1>Explore Topics</h1>
                    <SearchBar/>
                    <div style={{display: "flex", flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
                        {topics.map(topic => <TopicCard topic={topic}/>)}
                    </div>
                </div>
            :
                <div>
                    <h1>Log In or Sign Up</h1>
                </div>
            }
        </div>
    );
}

function TopicCard(props) {
    const history = useHistory();

    return (
        <div className="topic-card">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <h2 className="link" onClick={() => history.push("/topicview/" + props.topic)}>{props.topic}</h2>
                <div style={{width: "20%", flexDirection: "row", display: "flex", padding: 8, justifyContent: "space-evenly"}}>
                    <IoMdBook className="menu-button" size={28} style={{alignSelf: "center", color: colors.primary, borderRadius: 10, padding: 8}} onClick={() => history.push("/topicview/" + props.topic)}/>
                    <IoMdCall className="menu-button" size={28} style={{alignSelf: "center", color: colors.primary, borderRadius: 10, padding: 8}} onClick={() => history.push("/callscreen/" + props.topic)}/>
                </div>
            </div>
        </div>
    )
}

function SearchBar(props) {
    const [text, setText] = useState("");
    const [results, setResults] = useState([]);
    
    useEffect(() => {
        setResults(text.length > 0 ? topics.filter(topic => topic.toLowerCase().includes(text.toLowerCase())) : []);
    }, [text]);

    return (
        <form onSubmit={(e) => e.preventDefault()} style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 32}}>
            <input placeholder="Search for topics..." value={text} onChange={event => setText(event.target.value)}/>
            <div style={{position: "absolute", top: 236, background: "white", boxShadow: "0px 1px 10px grey", borderRadius: 10, width: "30%", overflowY: "scroll", maxHeight: 400, alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", paddingTop: results.length * 16}}>
                {results.map(result => <TopicCard topic={result} style={{width: "100%"}}/>)}
            </div>
        </form>
    );
}