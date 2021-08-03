import axios from 'axios'
import React, { Component } from 'react'
import {Card,Button} from 'react-bootstrap/'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
 class RenderAPI extends Component {
     constructor(props){
         super(props)
         this.state={
             datafromAPI:[],
             userEmail:''
         }
     }
     componentDidMount =async ()=>{
      let result= await axios.get(`${process.env.REACT_APP_PORT}/getData?searchQuery=meat`)
      this.setState({
          datafromAPI:result.data
      })
      console.log(this.state.datafromAPI)
     }
     ADDtofav= async(item)=>{
         const { user }=this.props.auth0
         this.setState({
             userEmail:`${user.email}`
         })
         const email=this.state.userEmail
         let result=axios.post(`${process.env.REACT_APP_PORT}/adddb?email=${email}`,item)



     }
     

    render() {
        return (
            <div>
                {
                    this.state.datafromAPI.map((item,idx)=>{
                        return (
                            <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={item.image} />
  <Card.Body>
    <Card.Title>{item.label}</Card.Title>
    <Card.Text>
      {item.source}
    </Card.Text>
    <Button variant="primary" onClick={()=>this.ADDtofav(item)}>ADD to fav</Button>
  </Card.Body>
</Card>

                        )
                    })
                }
            </div>
        )
    }
}

export default withAuth0 (RenderAPI)
