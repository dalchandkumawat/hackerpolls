import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';
const AddCandidate = () =>{
    const [name,setName]=useState("");
    const [noOfChallengesSolved,setNoOfChallengesSolved]=useState("");
    const [expertiseLevel,setExpertiseLevel] = useState("");
    const [dsExpertiseLevel,setDsExpertiseLevel] = useState("");
    const [algoExpertiseLevel,setAlgoExpertiseLevel] = useState("");
    const [cppExpertiseLevel,setCppExpertiseLevel] = useState("");
    const [javaExpertiseLevel,setJavaExpertiseLevel] = useState("");
    const [pythonExpertiseLevel,setPythonExpertiseLevel] = useState("");
    const history= useHistory();
    const [editMode,setEditMode] = useState(false);
    const [candidateId,setCandidateId] = useState("");
    const [activeClass,setActiveClass]=useState("");
    useEffect(()=>{
        const path= history.location.pathname;
        if(path.substring(path.indexOf("AddCandidate")+13)!=""){
            setCandidateId(path.substring(path.indexOf("AddCandidate")+13));
            setEditMode(true);
        }
    },[])
    const addCandidate = () =>{
        let methodToCall = editMode?'/editCandidate':'/addCandidates';
        let postmethod = editMode ? 'put' : 'post';
        fetch(methodToCall,{
            method:postmethod,
            headers:{
                "Content-Type":"application/json",
                "authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                _id:candidateId,name,noOfChallengesSolved,candidateExpertiseLevel:expertiseLevel,
                expertIn:{
                    dsExpertiseLevel, algoExpertiseLevel, cppExpertiseLevel, javaExpertiseLevel, pythonExpertiseLevel
                }
            })
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                M.toast({html:result.error,classes:"#c62727 red darken-3"});
            }
            else{
                let message = editMode?"Hacker details updated":"Hacker added";
                M.toast({html:message,classes:"#43a047 green darken-1"});
                history.push('/');
            }
        })
        .catch(err=>console.log(err));
    }
    useEffect(()=>{
        if(editMode){
            fetch('/getCandidate/' + candidateId, {
                method: "get"
            }).then(res => res.json())
            .then(result => {
                result = result[0];
                setName(result.name);
                setNoOfChallengesSolved(result.noOfChallengesSolved);
                setExpertiseLevel(result.candidateExpertiseLevel);
                setDsExpertiseLevel(result.expertIn.dsExpertiseLevel);
                setAlgoExpertiseLevel(result.expertIn.algoExpertiseLevel);
                setCppExpertiseLevel(result.expertIn.cppExpertiseLevel);
                setJavaExpertiseLevel(result.expertIn.javaExpertiseLevel);
                setPythonExpertiseLevel(result.expertIn.pythonExpertiseLevel); 
                setActiveClass("active");             
            })
            .catch(err => console.log(err));
        }
    },[editMode])
    return (
        <div className="wrapper">
            <div className="inner">
            <form className="col s12">
                        <div className="row">
                            <div className="col s12 text-center">
                                <h3 style={{color:"#1CC4F0"}}>{editMode?"Edit Hacker Details": "Add Hacker"}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-sm-12 col-md-6">
                                <input id="name" type="text" value={name} className="validate" onChange={(e) => setName(e.target.value)}></input>
                                <label className={activeClass} htmlFor="name">Name</label>
                            </div>
                            <div className="input-field col-sm-12 col-md-6">
                                <input id="noOfChallengesSolved" type="text" value={noOfChallengesSolved} className="validate" onChange={(e) => setNoOfChallengesSolved(e.target.value)}></input>
                                <label className={activeClass} htmlFor="noOfChallengesSolved">No of Challenges Solved</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-sm-12 col-md-6">
                                <input id="expertiseLevel" type="text" value={expertiseLevel} className="validate" onChange={(e) => setExpertiseLevel(e.target.value)}></input>
                                <label className={activeClass} htmlFor="expertiseLevel">Overall Expertise Level (1-5)</label>
                            </div>
                            <div className="input-field col-sm-12 col-md-6">
                                <input id="dsExpertiseLevel" type="text" value={dsExpertiseLevel} className="validate" onChange={(e) => setDsExpertiseLevel(e.target.value)}></input>
                                <label className={activeClass} htmlFor="dsExpertiseLevel">Data Structures (1-5)</label>
                            </div>
                        </div>
                        <div className="row">
                        <div className="input-field col-sm-12 col-md-6">
                                <input id="algoExpertiseLevel" type="text" value={algoExpertiseLevel} className="validate" onChange={(e) => setAlgoExpertiseLevel(e.target.value)}></input>
                                <label className={activeClass} htmlFor="algoExpertiseLevel">Algorithms (1-5)</label>
                            </div>
                            <div className="input-field col-sm-12 col-md-6">
                                <input id="cppExpertiseLevel" type="text" value={cppExpertiseLevel} className="validate" onChange={(e) => setCppExpertiseLevel(e.target.value)}></input>
                                <label className={activeClass} htmlFor="cppExpertiseLevel">C++ (1-5)</label>
                            </div>
                        </div>
                        <div className="row">
                        <div className="input-field col-sm-12 col-md-6">
                                <input id="javaExpertiseLevel" type="text" value={javaExpertiseLevel} className="validate" onChange={(e) => setJavaExpertiseLevel(e.target.value)}></input>
                                <label className={activeClass} htmlFor="javaExpertiseLevel">Java (1-5)</label>
                            </div>
                            <div className="input-field col-sm-12 col-md-6">
                                <input id="pythonExpertiseLevel" type="text" value={pythonExpertiseLevel} className="validate" onChange={(e) => setPythonExpertiseLevel(e.target.value)}></input>
                                <label className={activeClass} htmlFor="pythonExpertiseLevel">Python (1-5)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 rightAlign">
                                <button className="btn btn-primary right" type="button" onClick={()=>addCandidate()}>{editMode?"Save":"Add"}
                                </button>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    )
}
export default AddCandidate;