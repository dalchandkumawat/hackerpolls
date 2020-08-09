import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import M from 'materialize-css';
import { PromiseProvider } from 'mongoose';
const Candidate = (props) => {
    const [candidate, setCandidate] = useState(null);
    const [ip,setIp] = useState(null);
    const [editCandidateId,setEditCandidateId]= useState("");
    const history = useHistory();
    const [enableVote,setEnableVote] = useState(false);
    useEffect(() => {
        fetch(`https://geolocation-db.com/json/`)
        .then(res => res.json())
        .then(json => setIp(json.IPv4));
        const candidateId = history.location.pathname.substring(history.location.pathname.indexOf('/Candidate') + 11);
        fetch('/getCandidate/' + candidateId, {
            method: "get"
        }).then(res => res.json())
        .then(result => {
            setCandidate(result[0]);                
            setEditCandidateId("AddCandidate/"+result[0]._id);
        })
        .catch(err => console.log(err));
    }, [enableVote])
    useEffect(()=>{
        if(ip!==null){
            let votesList=[];
            fetch('/getCandidates',{
                method:"get"
            }).then(res=>res.json())
            .then(result=>{
                result.map(item=>{
                    item.votes.map(singleItem=>votesList.push(singleItem));
                })
                if(!votesList.includes(ip)){
                    setEnableVote(true);
                }
            })
            .catch(err=>console.log(err));
        }
    },[ip])
    const giveVote=()=>{
        fetch('/addVote',{
            method:"put",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                _id:candidate._id, ip
            })
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.error){
                M.toast({html:"Error voting",classes:"#c62727 red darken-3"});
            }
            else{                
                setEnableVote(false);
                M.toast({html:"Voted",classes:"#43a047 green darken-1"})
            }
        })
        .catch(err=>console.log(err));
    }
    const deleteCandidate = ()=>{
        fetch('/deleteCandidate/'+candidate._id,{
            method:"delete",
            headers:{
                "authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(result=>{
            M.toast({html:"Deleted",classes:"#43a047 green darken-1"})
            history.push('/');
        })
        .catch(err=>console.log(err));
    }
    return (
        <div className="wrapper">
            <div className="inner">
                <h3 style={{ color: "#1CC4F0" }} className="text-center">Hacker details</h3>
                <br></br><br></br>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{candidate?candidate.name:""}</td>
                        </tr>                        
                        <tr>
                            <td>Votes</td>
                            <td>{candidate?candidate.votes.length:""}</td>
                        </tr>
                        <tr>
                            <td>Challenges Solved</td>
                            <td>{candidate?candidate.noOfChallengesSolved:""}</td>
                        </tr>
                        <tr>
                            <td>Overall Rating </td>
                            <td>{candidate?candidate.candidateExpertiseLevel:""}/5</td>
                        </tr>
                        <tr>
                            <td>Data Structures </td>
                            <td>{candidate?candidate.expertIn.dsExpertiseLevel:""}/5</td>
                        </tr>
                        <tr>
                            <td>Algorithms </td>
                            <td>{candidate?candidate.expertIn.algoExpertiseLevel:""}/5</td>
                        </tr>
                        <tr>
                            <td>C++ </td>
                            <td>{candidate?candidate.expertIn.cppExpertiseLevel:""}/5</td>
                        </tr>
                        <tr>
                            <td>JAVA </td>
                            <td>{candidate?candidate.expertIn.javaExpertiseLevel:""}/5</td>
                        </tr>
                        <tr>
                            <td>Python </td>
                            <td>{candidate?candidate.expertIn.pythonExpertiseLevel:""}/5</td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                {
                    ip? 
                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            {props.isAdmin?<>
                                <button className="btn btn-secondary left" type="button" onClick={()=>history.push(editCandidateId)}>Edit Details</button>
                                <button className="btn btn-danger" style={{marginLeft:"20px"}} type="button" onClick={()=>deleteCandidate()}>Delete</button>
                            </>:null}
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <button className="btn btn-primary right" type="button" disabled={!enableVote} onClick={()=>giveVote()}> {enableVote?"Give Vote":"You have already voted"}
                            </button>
                        </div>
                    </div> :null
                }
            </div>
        </div>
    )
}
export default Candidate;
