import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import db from './firebase';


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        email: '',
        pushNotifToken: '',
        link: '', 
        caption: ''
    };
  }

    async addVideo(e) {
      e.preventDefault();
        try{
          const user = await db.collection('users').doc(this.state.email); //get user from database
          await user.update({ //update the video url and captin in the database
            vidURL: this.state.link,
            caption: this.state.caption
          })
          
          //get the user's push notification token
          await user.get().then((doc) => { 
            this.setState({ pushNotifToken: doc.data().pushNotifToken });
            console.log(this.state.pushNotifToken)
          });
          
          //after adding video to the database, send a push notification to the specific user
          this.sendPushNotification(this.state.pushNotifToken); 
          
        }
        catch(err){
          console.log(err)
        }
    }

      sendPushNotification =  async (pushNotifToken) => {

        try{
          await fetch('https://exp.host/--/api/v2/push/send',{
            mode: 'no-cors',
            method: "POST",
            headers: {
              host: "exp.host",
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: pushNotifToken, 
                sound: 'default', 
                title: 'Furu', //change title of notification here
                body: 'Your video is ready!' //change body of notification here
            })
        }) 
        }
        catch(err) {
          console.log(err)
        }
        
        alert('Sent') //alerts a sent as of right now, can style it in the future
      
    };
    onEmailChange(e) {
      this.setState({
        email: e.target.value
      });
    }
    onLinkChange(e) {
      this.setState({
        link: e.target.value
      });
    }
    onCaptionChange(e) {
      this.setState({
        caption: e.target.value
      });
    }


  render() {

    return (
    
      <div className="container mt-5">
          <form onSubmit={(e) => this.addVideo(e)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input onChange={(e) => this.onEmailChange(e)} value={this.state.email} type="email" className="form-control mb-3" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Video Link</label>
              <input onChange={(e) => this.onLinkChange(e)} value={this.state.link} type="text" className="form-control mb-3" placeholder="Enter video URL" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Caption</label>
              <input onChange={(e) => this.onCaptionChange(e)} value={this.state.caption} type="text" className="form-control" placeholder="Enter caption" />
            </div>

            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          
          </form>
      </div>
       
    );
  }
}
