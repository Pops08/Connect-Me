import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import OfferingItem from "../OfferingItem";
import { QUERY_OFFERINGS, QUERY_ALL_OFFERINGS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"
import { UPDATE_OFFERINGS } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
// import { off } from '../../../../server/models/User';
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import Auth from "../../utils/auth";
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER, UPDATE_USER } from "../../utils/mutations";

//changes
import { QUERY_PROFILE, QUERY_ME } from '../../utils/queries';



function ProfileUpdate () {
    //changes
    // const { email: userParam } = useParams();
    // const { loading, data } = useQuery(userParam ? QUERY_PROFILE : QUERY_ME, {
    //     variables: { email : userParam }
    // });
    // const user = data?.me || data?.user || {};
    // console.log(user);
    // const [state, setState] = useState({open: false});


    // const [updateUser, { newData }] = useMutation(UPDATE_USER)
    // console.log(newData )

    //changes
    let location = useLocation();
    console.log(location);

    const [formState, setFormState] = useState({ 
        firstName: location.user.firstName, 
        lastName: location.user.lastName, 
        email: location.user.email, 
        password: location.user.password,
        location: location.user.location,
        tutor: location.user.tutor,
        bio: location.user.bio,
        subject: location.user.subject
    });
    // const [state, formState] = useState({ email: props.user.email , firstName: props.user.firstName});
    const [updateUser] = useMutation(UPDATE_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse =  await updateUser({
          variables: {
            firstName: formState.firstName, 
            lastName: formState.lastName,
            email: formState.email, 
            password: formState.password,
            location: formState.location,
            tutor: formState.tutor,
            bio: formState.bio,
            subject: formState.subject
          }
        });
        const token = mutationResponse.data.updateUser.token;
        Auth.login(token);
        useHistory.push('/Profile')
      };

    return(
        <form className = "mx-auto my-5 p-3 mb-2 bg-light text-dark" onSubmit={async event => {event.preventDefault()}}>
                         <div className = "form-row">
                             <div className = "form-group col-md-6">
                                <label htmlFor = "firstName">First Name</label>
                             <input name="firstName" type = "text" className="form-control border border-info" id = "firstName" value = {formState.firstName || ''}  
                                onChange={event => {
                                    const { name, value } = event.target;
                                     console.log(event);
                                     console.log(event.target.name);
                                     console.log(event.target.value);
                                     setFormState({
                                     ...formState,
                                     [name]: value
                                     });
                                 }}  
                                 />
                            </div>
                           <div className = "form-group col-md-6">
                                <label htmlFor = "lastName">Last Name</label>
                                <input name="lastName" type = "lastname" className="form-control border border-info" id = "lastName" value = {formState.lastName || ''} 
                                onChange={event => {
                                   const { name, value } = event.target;
                                    console.log(event);
                                    console.log(event.target.name);
                                    console.log(event.target.value);
                                    setFormState({
                                    ...formState,
                                    [name]: value
                                    });
                                }}  
                                />
                            </div>
                        </div>
                        <div className = "form-group">
                            <label htmlFor="email">Email</label>
                            <input type = "text" name="email" className = "form-control border border-info" id = "email" value = {formState.email || ''} 
                               onChange={event => {
                                const { name, value } = event.target;
                                 console.log(event);
                                 console.log(event.target.name);
                                 console.log(event.target.value);
                                 setFormState({
                                 ...formState,
                                 [name]: value
                                 });
                             }}  
                             />
                        </div>
                        <div className = "form-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea type = "text" name ='bio' className = "form-control border border-info" id = "bio" value = {formState.bio || ''} rows = "4"  
                               onChange={event => {
                                   const { name, value } = event.target;
                                    console.log(event);
                                    console.log(event.target.name);
                                    console.log(event.target.value);
                                    setFormState({
                                    ...formState,
                                    [name]: value
                                    });
                                }}  
                                />
                         </div>
                         <div className = "form-row">
                             <div className="form-group col-md-4">
                                 <label htmlFor="location">Location</label>
                                 <select id = "location" name="location" className = "form-control border border-info" value = {formState.location || ''} 
                                    onChange={event => {
                                        const { name, value } = event.target;
                                            console.log(event);
                                            console.log(event.target.name);
                                            console.log(event.target.value);
                                            setFormState({
                                            ...formState,
                                            [name]: value
                                            });
                                        }}  
                                        >

                                    <option value="AMER">AMER  </option>
                                    <option value="EMEA">EMEA</option>
                                    <option value="APAC">APAC</option>
                                 </select>
                            </div>

                             <div className="form-group col-md-4">
                                 <label htmlFor="subject">Your Subjects</label>
                                <select id = "subject" name="subject" className = "form-control border border-info" multiple value = {[formState.subject] || ''} 

                                        onChange={event => {
                                            const { name, value } = event.target;
                                                console.log(event);
                                                console.log(event.target.name);
                                                console.log(event.target.value);
                                                setFormState({
                                                ...formState,
                                                [name]: value
                                                });
                                            }}  
                                        >
                                     <option value="Computer Science">Computer Science</option>
                                     <option value="Science">Science</option>
                                     <option value="Maths">Maths</option>
                                     <option value="Biology">Biology</option>
                                     <option value="Geography">Geography</option>
                                 </select>
                            </div>
                         </div>
                    {/* <button type="submit" className = "btn btn-primary ml-auto" onClick={() => {setState({open: !state.open})}}><Link to ={{pathname: '/profileupdate',user }}>Update Profile</Link></button> */}
                    <button type="submit" className = "btn btn-light ml-auto"><Link to="/">Home</Link></button>
                    <button className = "btn btn-light ml-auto" type="submit" onClick={handleFormSubmit}>Update</button>
         </form>
    )
}

export default ProfileUpdate;