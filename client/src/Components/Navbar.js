import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
const Navbar = (props) => {
    const [adminCode,setAdminCode] = useState("");
    const history = useHistory();
    const login = () =>{
        fetch('/adminLogin',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                code: adminCode
            })
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                M.toast({html:result.error,classes:"#c62727 red darken-3"});
                setAdminCode("");
            }
            else{
                document.getElementById('adminLogin').click();
                localStorage.setItem("jwt",result.token);
                props.onChange(true);
                M.toast({html:"Signin successful",classes:"#43a047 green darken-1"})
                document.getElementById('exampleModal').style.display="None";
                const hide = document.getElementsByClassName('modal-backdrop')[0];
                const body = document.getElementsByTagName('body')[0];
                body.removeChild(hide);
                body.classList.remove('modal-open');
                setAdminCode("");
            }
        })
    }
    useEffect(()=>{
        if(localStorage.getItem('jwt')!=null)
            props.onChange(true);
    },[])
    const logout = ()=>{
        localStorage.clear();
        props.onChange(false);
        history.push('/');
        M.toast({html:"Logged out",classes:"#43a047 green darken-1"})
    }
    return (
        <>
        <nav>
            <div className="nav-wrapper #42a5f5 blue lighten-1">
                <Link to='/' className="logo">Hacker Polls</Link>
                <ul id="nav-mobile" className="right">
                    {!props.isAdmin?<li><a data-toggle="modal" data-target="#exampleModal" id='adminLogin'>Admin Login</a></li>:null}
                    {props.isAdmin?<li><a onClick={()=>logout()}>Logout</a></li>:null}
                </ul>
            </div>
        </nav>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Admin Login</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setAdminCode("")}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="adminCode" className="col-form-label">Admin Code</label>
                                    <input type="number" className="form-control" value = {adminCode} onChange = {(e)=>setAdminCode(e.target.value)} id="adminCode" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" style={{marginRight:"20px"}} onClick={()=>setAdminCode("")}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={()=>login()}>Login </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar;
