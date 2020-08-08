import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import M from 'materialize-css';
const Home = (props) => {
    const [candidates,setCandidates] = useState([]);
    useEffect(()=>{
        fetch('/getCandidates',{
            method:"get"
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                M.toast({html:result.error,classes:"#c62727 red darken-3"});
            }
            else{
                setCandidates(result);
            }
        })
    },[])
    return (
        <>
            <div className="wrapper">
                <div className="inner">
                    <h2 style={{color:"#1CC4F0"}}>Vote your favourite hacker {props.isAdmin?<Link to='/AddCandidate'><button className="btn btn-secondary right">Add Hacker</button></Link>:null} </h2>
                    <br></br><br></br>
                    {
                        candidates.map(item=>{
                            let candidateId = "Candidate/"+item._id;
                            return (
                                <Link to={candidateId} key={item._id}>
                                    <div className="candidateCard">
                                        {item.name}    
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default Home;