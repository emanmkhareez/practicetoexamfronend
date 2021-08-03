import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleRecipe from './components/SingleRecipe';
import './BestBooks.css';
import axios from 'axios'
import { Card, Button } from 'react-bootstrap/'
import 'bootstrap/dist/css/bootstrap.min.css';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataarray: [],
      emailuser: '',
      show:false,
      index:0,
      label:'',
      image:'',
      source:'',
    }
  }
  componentDidMount = async () => {

    const { user } = this.props.auth0
    await this.setState({
      emailuser: `${user.email}`
    })
    const email = this.state.emailuser
    let respons = await axios.get(`${process.env.REACT_APP_PORT}/getfromdb?email=${email}`)
    this.setState({
      dataarray: respons.data
    })
    console.log('datafromdb', this.state.dataarray);
  }

  deleteFun =async (idx)=>{
    const email=this.state.emailuser;
    let result=await axios.delete(`${process.env.REACT_APP_PORT}/delFun/${idx}?email=${email}`)
this.setState({
  dataarray:result.data
})

  }
  ShowForm=(idx)=>{
    this.setState({
      show:true,
      index:idx,
      label:this.state.dataarray[idx].label,
      image:this.state.dataarray[idx].image,
      source:this.state.dataarray[idx].source,


    })


  }
  updateFun=async (event)=>{
    event.preventDefault()
    const email=this.state.emailuser
    const idx=this.state.index
    let obj={
      label:event.target.label.value,
      image:event.target.image.value,
      source:event.target.source.value

    }
    let result=await axios.put(`${process.env.REACT_APP_PORT}/update/${idx}?email=${email}`,obj)
    this.setState({
      dataarray:result.data
    })
}

  render() {
    return (
      <>
        {
          this.state.dataarray.map((item, idx) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.label}</Card.Title>
                  <Card.Text>
                    {item.source}
                  </Card.Text>
                  <Button variant="primary" onClick={() => this.deleteFun(idx)}>DELETE</Button>
                  <Button variant="primary" onClick={() => this.ShowForm(idx)}>Update</Button>

                </Card.Body>
              </Card>

            )
          })
        }
        {this.state.show &&
        <SingleRecipe
        label={this.state.label}
        image={this.state.image}
        source={this.state.source}
        updateFun={this.updateFun}
        />
        
        }
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
