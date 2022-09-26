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
  
    const removeNgo = id => {
      deleteDoc(doc(db, "ngo", id))
    }
  
    return(
        <>
        
        <h1>NGO Gallery</h1>
        <div className="App">
        <p style={{"color":"black"}}>Welcome to the NGO gallery. NGOs and their details can be added here. It will be moderated by the admins. Scroll down to connect with volunteers and leaders in the chat room. Chat rooms are custom created for the NGOs added here.</p>
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

            <h2 style={{"color":"black"}}>Choose a Chat Room</h2>
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
export {Landing} ;