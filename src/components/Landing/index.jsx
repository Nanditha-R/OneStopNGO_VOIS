import React from "react";
import { Link } from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import './styles.css';
import { db } from '../../services/firebase'
import { useState, useEffect } from "react"
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc
} from "firebase/firestore"
import "react-bootstrap"




function Landing() {
    const [ngos, setNgos] = useState([])
    const [form, setForm] = useState({
      title: "",
      desc: "",
      cities: [],
      members: []
    })
    const [popupActive, setPopupActive] = useState(false)
  
    const ngosCollectionRef = collection(db, "ngo")
  
    useEffect(() => {
      onSnapshot(ngosCollectionRef, snapshot => {
        setNgos(snapshot.docs.map(doc => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data()
          }
        }))
      })
    }, [])
  
    const handleView = id => {
      const ngosClone = [...ngos]
  
      ngosClone.forEach(ngo => {
        if (ngo.id === id) {
          ngo.viewing = !ngo.viewing
        } else {
          ngo.viewing = false
        }
      })
  
      setNgos(ngosClone)
    }
  
    const handleSubmit = e => {
      e.preventDefault()
  
      if (
        !form.title ||
        !form.desc ||
        !form.cities ||
        !form.members
      ) {
        alert("Please fill out all fields")
        return
      }
  
      addDoc(ngosCollectionRef, form)
  
      setForm({
        title: "",
        desc: "",
        cities: [],
        members: []
      })
  
      setPopupActive(false)
    }
  
    const handleCities = (e, i) => {
      const citiesClone = [...form.cities]
  
      citiesClone[i] = e.target.value
  
      setForm({
        ...form,
        cities: citiesClone
      })
    }
  
    const handleMembers = (e, i) => {
      const membersClone = [...form.members]
  
      membersClone[i] = e.target.value
  
      setForm({
        ...form,
        members: membersClone
      })
    }
  
    const handleCitiesCount = () => {
      setForm({
        ...form,
        cities: [...form.cities, ""]
      })
    }
  
    const handleMembersCount = () => {
      setForm({
        ...form,
        members: [...form.members, ""]
      })
    }
  
    const [vols, setVols] = useState([])
    const [form_v, setForm_v] = useState({
      title: "",
      desc: "",
      cities: [],
      members: []
    })
    const [popupActive_state, setPopupActive_state] = useState(false)
  
    const volsCollectionRef = collection(db, "vol")
  
    useEffect(() => {
      onSnapshot(volsCollectionRef, snapshot => {
        setVols(snapshot.docs.map(doc => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data()
          }
        }))
      })
    }, [])
  
    const handleViewState = id => {
      const volsClone = [...vols]
  
      volsClone.forEach(vol => {
        if (vol.id === id) {
          vol.viewing = !vol.viewing
        } else {
          vol.viewing = false
        }
      })
  
      setVols(volsClone)
    }
  
    const handleSubmitState = e => {
      e.preventDefault()
  
      if (
        !form_v.title ||
        !form_v.desc ||
        !form_v.cities ||
        !form_v.members
      ) {
        alert("Please fill out all fields")
        return
      }
  
      addDoc(volsCollectionRef, form_v)
  
      setForm_v({
        title: "",
        desc: "",
        cities: [],
        members: []
      })
  
      setPopupActive_state(false)
    }
  
    const handleCitiesState = (e, i) => {
      const citiesClone = [...form_v.cities]
  
      citiesClone[i] = e.target.value
  
      setForm_v({
        ...form_v,
        cities: citiesClone
      })
    }
  
    const handleMembersState = (e, i) => {
      const membersClone = [...form_v.members]
  
      membersClone[i] = e.target.value
  
      setForm_v({
        ...form_v,
        members: membersClone
      })
    }
  
    const handleCitiesStateCount = () => {
      setForm_v({
        ...form_v,
        cities: [...form_v.cities, ""]
      })
    }
  
    const handleMembersStateCount = () => {
      setForm_v({
        ...form_v,
        members: [...form_v.members, ""]
      })
    }
    const usersData = [
      {id:1,name:'Logesh',username:'jvlogesh'},
      {id:2,name:'Ramesh',username:'rameshtr'},
      {id:3,name:'Daniel',username:'danielradcliff'},
  ];
  
  const addUser = (user)=>{
      user.id = users.length + 1;
      setUsers([...users,user])
  }
  const deleteUser = (id)=>{
      setUsers(users.filter((user)=>user.id!==id))
      setEditing(false);
  }
  
      const [users,setUsers] = useState(usersData);
      const [editing,setEditing] = useState(false)
      
  
      const initialFormState = {id:null,name:'',username:''}
  
      const [currentUser,setCurrentUser] = useState(initialFormState);
  
      const editRow = (user)=>{
          setEditing(true);
          setCurrentUser({id:user.id,name:user.name,username:user.username});
      }
  
      const updateUser = (id,updatedUser)=>{
          setEditing(false);
          setUsers(users.map((user)=>(user.id===id?updatedUser:user)))
      }


    return(
        <>
        
        <h1>NGO Gallery</h1>
        <div className="App">
        <p style={{"color":"black"}}>Welcome to the NGO gallery. NGOs and their details can be added here. It will be moderated by the admins. Scroll down to reach out to other volunteer groups or connect with volunteers and leaders in the chat room. Chat rooms are custom created for the NGOs added here.</p>
        <button onClick={() => setPopupActive(!popupActive)}>Add ngo</button>
  
        <div className="ngos">
          { ngos.map((ngo, i) => (
            <div className="ngo" key={ngo.id}>
              <h3>{ ngo.title }</h3>
  
              <p dangerouslySetInnerHTML={{ __html: ngo.desc }}></p>
  
              { ngo.viewing && <div>
                <h4>Cities</h4>
                <ul>
                  { ngo.cities.map((cities, i) => (
                    <li key={i}>{ cities }</li>
                  ))}
                </ul>
  
                <h4>Members</h4>
                <ol>
                  { ngo.members.map((members, i) => (
                    <li key={i}>{ members }</li>
                  ))}
                </ol>
              </div>}
  
              <div className="buttons">
                <button onClick={() => handleView(ngo.id)}>View { ngo.viewing ? 'less' : 'more' }</button>
            
              </div>
            </div>
          ))}
        </div>
  
        { popupActive && <div className="popup">
          <div className="popup-inner">
            <h2>Add a new ngo</h2>
  
            <form onSubmit={handleSubmit}>
  
              <div className="form-group">
                <label style={{"color":"white"}}>Title</label>
                <input 
                  type="text" 
                  value={form.title} 
                  onChange={e => setForm({...form, title: e.target.value})} />
              </div>
  
              <div className="form-group">
                <label style={{"color":"white"}}>Description</label>
                <textarea 
                  type="text" 
                  value={form.desc} 
                  onChange={e => setForm({...form, desc: e.target.value})} />
              </div>
  
              <div className="form-group">
                <label style={{"color":"white"}}>Cities</label>
                {
                  form.cities.map((cities, i) => (
                    <input 
                      type="text"
                      key={i}
                      value={cities} 
                      onChange={e => handleCities(e, i)} />
                  ))
                }
                <button type="button" onClick={handleCitiesCount}>Add City</button>
              </div>
  
              <div className="form-group">
                <label style={{"color":"white"}}>Members</label>
                {
                  form.members.map((members, i) => (
                    <textarea 
                      type="text"
                      key={i}
                      value={members} 
                      onChange={e => handleMembers(e, i)} />
                  ))
                }
                <button type="button" onClick={handleMembersCount}>Add Member</button>
              </div>
  
              <div className="buttons">
                <button type="submit">Submit</button>
                <button type="button" class="remove" onClick={() => setPopupActive(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>}
      </div>
      <h1>Volunteer Groups</h1>
      <div className="App">
        
        <button onClick={() => setPopupActive_state(!popupActive_state)}>Add Groups</button>
  
        <div className="ngos">
          { vols.map((vol, i) => (
            <div className="ngo" key={vol.id}>
              <h3>{ vol.title }</h3>
  
              <p dangerouslySetInnerHTML={{ __html: vol.desc }}></p>
  
              { vol.viewing && <div>
                <h4>Cities</h4>
                <ul>
                  { vol.cities.map((cities, i) => (
                    <li key={i}>{ cities }</li>
                  ))}
                </ul>
  
                <h4>Members</h4>
                <ol>
                  { vol.members.map((members, i) => (
                    <li key={i}>{ members }</li>
                  ))}
                </ol>
              </div>}
  
              <div className="buttons">
                <button onClick={() => handleViewState(vol.id)}>View { vol.viewing ? 'less' : 'more' }</button>
            
              </div>
            </div>
          ))}
        </div>
  
        { popupActive_state && <div className="popup">
          <div className="popup-inner">
            <h2>Add a new volunteer group</h2>
  
            <form onSubmit={handleSubmitState}>
  
              <div className="form-group">
                <label style={{"color":"white"}}>Title</label>
                <input 
                  type="text" 
                  value={form_v.title} 
                  onChange={e => setForm_v({...form_v, title: e.target.value})} />
              </div>
  
              <div className="form-group">
                <label style={{"color":"white"}}>Description</label>
                <textarea 
                  type="text" 
                  value={form_v.desc} 
                  onChange={e => setForm_v({...form_v, desc: e.target.value})} />
              </div>
  
              <div className="form-group">
                <label style={{"color":"white"}}>Cities</label>
                {
                  form_v.cities.map((cities, i) => (
                    <input 
                      type="text"
                      key={i}
                      value={cities} 
                      onChange={e => handleCitiesState(e, i)} />
                  ))
                }
                <button type="button" onClick={handleCitiesStateCount}>Add City</button>
              </div>
  
              <div className="form-group">
                <label style={{"color":"white"}}>Members</label>
                {
                  form_v.members.map((members, i) => (
                    <textarea 
                      type="text"
                      key={i}
                      value={members} 
                      onChange={e => handleMembersState(e, i)} />
                  ))
                }
                <button type="button" onClick={handleMembersStateCount}>Add Member</button>
              </div>
  
              <div className="buttons">
                <button type="submit">Submit</button>
                <button type="button" class="remove" onClick={() => setPopupActive_state(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>}
      </div>




            <h1>Connect with us</h1>
            <ul className="chat-room-list">
                {chatRooms.map((room) => (
                    <li key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.title}</Link>
                    </li>
                ))}
            </ul>
            
            </>
    );
}
export {Landing};