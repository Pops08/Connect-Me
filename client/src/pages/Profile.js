// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useMutation } from '@apollo/react-hooks';
// import Auth from "../utils/auth";
// import { ADD_USER, UPDATE_USER } from "../utils/mutations";
// import ImageUpload from "../components/ImageUpload";
// import { Redirect, useParams } from 'react-router-dom';
// import { QUERY_PROFILE, QUERY_ME } from '../utils/queries';
// //import Preview from '../assets/preview.jpg'
// import { useQuery } from '@apollo/react-hooks';
// // //Icons
// import { FaEdit, FaHome } from "react-icons/fa";
// //Bootstarp imports
// import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useDispatch, useSelector } from 'react-redux';


// function Profile(props) {
//     const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: ''});
//   const [updateUser] = useMutation(UPDATE_USER);
//   console.log(updateUser);

// //   const state = useSelector((state) => {
// //     return state
// //   });
// //   const dispatch = useDispatch();

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const mutationResponse =  await updateUser({
//       variables: {
//         firstName: formState.firstName, 
//         lastName: formState.lastName,
//         email: formState.email, 
//         password: formState.password,
//         location: formState.location,
//         tutor: formState.tutor,
//         bio: formState.bio
//       }
//     });
//     const token = mutationResponse.data.updateUser.token;
//     Auth.login(token);
//   };
//   const handleChange = event => {
//     const { name, value } = event.target;
//     console.log(event);
//     console.log(event.target.name);
//     console.log(event.target.value);
//     setFormState({
//       ...formState,
//       [name]: value
//         // [event.target.name]: event.target.value
//     });
//   };

//     // const { user } = state;
//     const { email: userParam } = useParams();
//     const { loading, data } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
//         variables: { email : userParam }
//     });
//     const user = data?.me || data?.user || {};
//     //redirect to personal profile page if email is the loggedin user's
//     if(Auth.loggedIn() && Auth.getProfile().data.email.toLowerCase() === `${userParam ? userParam.toLowerCase() : ''}`) {
//         return <Redirect to="/profile" />
//     }
//     if(loading) {
//         return <div>Loading...</div>;
//     }
//     //if not loggedin
//     if(!user?.email) {
//         return(
//             <h4>
//                 You need to be loggedIn to see this page. Use the navigation link to Signup or Login!
//             </h4>
//         )
//     }
//   //Image upload ===============================================================
//   return(
//     <form className = "mx-auto my-5 p-3 mb-2 bg-light text-dark" onSubmit={handleFormSubmit}>
//                      <div className = "form-row">
//                          <div className = "form-group col-md-6">
//                             <label htmlFor = "firstName">First Name</label>
//                          <p name='firstName' type = "text" className="form-control border border-info" id = "firstName" value = {user.firstName} onChange={handleChange}/>
//                          </div>
//                        <div className = "form-group col-md-6">
//                             <label htmlFor = "lastName">Last Name</label>
//                             <p name='lastName' type = "text" className="form-control border border-info" id = "lastName" value = {user.lastName} onChange={handleChange} />
//                         </div>
//                     </div>
//                     <div className = "form-group">
//                         <label htmlFor="email">Email</label>
//                         <p type = "text" name='email' className = "form-control border border-info" id = "email" value = {user.email} onChange={handleChange}/>
//                     </div>
//                     <div className = "form-group">
//                         <label htmlFor="bio">Bio</label>
//                         <textarea type = "text" name = 'bio' className = "form-control border border-info" id = "bio" value = {user.bio} rows = "4"  onChange={handleChange}/>
//                      </div>
//                      <div className = "form-row">
//                          <div className="form-group col-md-4">
//                              <label htmlFor="location">Location</label>
//                              <select id = "location" name='location' className = "form-control border border-info" onChange={handleChange}>
//                                  <option value="AMER">AMER</option>
//                                  <option value="EMEA">EMEA</option>
//                                  <option value="APAC">APAC</option>
//                              </select>
//                         </div>
//                          {/* <div className="form-group col-md-4">
//                              <label htmlFor="zone">Timezone</label>
//                              <select id = "zone" name={user.timezone} className = "form-control border border-info" onChange={handleChange}>
//                                  <option value="UTC+8:00">UTC+8:00</option>
//                                  <option value="UTC+5:30">UTC+5:30</option>
//                                  <option value="UTC+8:45">UTC+8:45</option>
//                                 <option value="UTC+9:00">UTC+9:00</option>
//                                  <option value="UTC+9:30">UTC+9:30</option>
//                                  <option value="UTC+10:00">UTC+10:00</option>
//                              </select>
//                          </div> */}
//                          <div className="form-group col-md-4">
//                              <label htmlFor="subject">Pick Subjects</label>
//                             <select id = "subject" name='subject' className = "form-control border border-info" multiple onChange={handleChange}>
//                                  <option value={user.subject}>Computer Science</option>
//                                  <option value={user.subject}>Science</option>
//                                  <option value={user.subject}>Maths</option>
//                                  <option value={user.subject}>Biology</option>
//                                  <option value={user.subject}>Geography</option>
//                              </select>
//                         </div>
//                      </div>
//                      {/* <div className = "form-group">
//                          <div className = "form-check">
//                              <p className = "form-check-p" type="checkbox" id="tutor"/>
//                              <label className = "form-check-label" htmlFor = "tutor">
//                                  I am a tutor
//                              </label>
//                          </div>
//                      </div>  */}
//                     <div className="flex-row space-between my-2">
//                     <label htmlFor="tutor">Signing up as?</label>
//                     <select id="tutor" name={user.tutor} onChange={handleChange}>
//                         <option value={user.tutor}>Student</option>
//                         <option value={user.tutor}>Tutor</option>
//                     </select>
//                     </div>
//                     <button type="submit" className = "btn btn-primary ml-auto">Save</button>
//                     <button type="submit" className = "btn btn-light ml-auto"><Link to="/">Home</Link></button>
//                 </form>
//     //     
//   )
// }
// export default Profile;

import React, { useState, Component, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER, UPDATE_USER } from "../utils/mutations";
import ImageUpload from "../components/ImageUpload";
import { Redirect, useParams } from 'react-router-dom';
import { QUERY_PROFILE, QUERY_ME } from '../utils/queries';
//import Preview from '../assets/preview.jpg'
import { useQuery } from '@apollo/react-hooks';
// //Icons
import { FaEdit, FaHome } from "react-icons/fa";
//Bootstarp imports
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Comprehend } from "aws-sdk";
// import { Button, Box } from '@material-ui/core';


function Profile(props) {
    const { email: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
        variables: { email : userParam }
    });
    const user = data?.me || data?.user || {};
    console.log(user);
    const [state, setState] = useState({open: false});


    const [updateUser, { newData }] = useMutation(UPDATE_USER)
    console.log(newData )
    // console.log(state)

//     const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const mutationResponse =  await updateUser({
//       variables: {
//         firstName: formState.firstName, 
//         lastName: formState.lastName,
//         email: formState.email, 
//         password: formState.password,
//         location: formState.location,
//         tutor: formState.tutor,
//         bio: formState.bio
//       }
//     });
//     const token = mutationResponse.data.updateUser.token;
//     Auth.login(token);
//   };


    // useEffect(() => {
    //     // Update the document title using the browser API
    //     //document.title = `You clicked ${count} times`;
    //     setState({
    //         firstName: user.firstName,
    //         email: user.email
    //     })
    //   },[state]);

    


    //redirect to personal profile page if email is the loggedin user's
    if(Auth.loggedIn() && Auth.getProfile().data.email.toLowerCase() === `${userParam ? userParam.toLowerCase() : ''}`) {
        return <Redirect to="/profile" />
    }
    if(loading) {
        return <div>Loading...</div>;
    }
    //if not loggedin
    if(!user?.email) {
        return(
            <h4>
                You need to be loggedIn to see this page. Use the navigation link to Signup or Login!
            </h4>
        )
    }



    // const linkRouting = React.forwardRef((props,ref) => (
    //       <a ref={ref}>{props.children}</a>
    // ))
    //============
  //Image upload ===============================================================
  return(
    <form className = "mx-auto my-5 p-3 mb-2 bg-light text-dark" onSubmit={async event => {event.preventDefault()}}>
                     <div className = "form-row">
                         <div className = "form-group col-md-6">
                            <label htmlFor = "firstName">First Name</label>
                            <p>{user.firstName}</p>


                         {/* <p name="firstName" type = "text" className="form-control border border-info" id = "firstName" value = {user.firstName} /> */}
                        </div>
                       <div className = "form-group col-md-6">
                            <label htmlFor = "lastName">Last Name</label>
                            <p>{user.lastName}</p>
                        </div>
                    </div>

                    <div className = "form-group">
                        <label htmlFor="email">Email</label>
                        <p>{user.email}</p>
                    </div>

                    {/* <div className = "form-group">
                        <label htmlFor="tutor">Tutor?</label>
                        <p>{user.tutor}</p>
                    </div> */}

                    <div className="flex-row space-between my-2">
                    <label htmlFor="tutor">Signing up as?</label>
                    {/* <p id="tutor" name ="tutor">{user.tutor}</p> */}
                    
                    <select id="tutor" name ="tutor" >
                        <option >{user.tutor}</option>
                        {/* <option value="Tutor">Tutor</option> */}
                    </select>
                    </div>

                    <textarea 
                        htmlFor="bio" 
                        type="text" 
                        name="bio" 
                        className = "form-control border border-info" 
                        id="bio"
                        >
                        {user.bio}
                        </textarea>
        
                    {/* <div className = "form-group">
                        <label htmlFor="bio">Bio</label>
                        
                        <textarea type = "text" name = {user.bio} className = "form-control border border-info" id = "bio" value = {user.bio} rows = "4"  />
                     </div> */}


                     <div className = "form-row">
                         <div className="form-group col-md-4">
                             <label htmlFor="location">Location</label>
                             <select id = "location" name="location" className = "form-control border border-info" >
                                <option>{user.location}</option>
                                {/* <option value="EMEA">EMEA</option>
                                <option value="APAC">APAC</option> */}
                             </select>
                             {/* <p htmlFor="location" id = "location" name={user.location} className = "form-control border border-info">Location</p> */}
                        </div>


                         <div className="form-group col-md-4">
                             <label htmlFor="subject">Your Subjects</label>
                            <select id = "subject" name="subject" className = "form-control border border-info" multiple >
                                 <option>{[user.subject]}</option>
                                 {/* <option value="Science">Science</option>
                                 <option value="Maths">Maths</option>
                                 <option value="Biology">Biology</option>
                                 <option value="Geography">Geography</option> */}
                             </select>
                        </div>
                     </div>

             
                    {/* <button type="submit" className = "btn btn-primary ml-auto">Save</button> */}
                    {/* <button onClick={async () => {
                        await updateUser({
                            variables: { 
                                p: {
                                newData: setState
                                }
                            }
                        })
                    } 
                    } type="submit">Update</button> */}
                    <button type="submit" className = "btn btn-light ml-auto" onClick={() => {setState({open: !state.open})}}><Link to ={{pathname: '/profileupdate',user }}>Edit Profile</Link></button>
                    {/* <button type="submit" className = "btn btn-light ml-auto"><Link to="/manageofferings">Manage Offerings</Link></button> */}
                    <button type="submit" className = "btn btn-light ml-auto"><Link to="/">Home</Link></button>
                    {/* <Button color="primary">Hello World</Button>
                    <Box component="div" display="inline">This is a sample box</Box> */}

     </form>
    //     



    
  )
  
}
export default Profile;