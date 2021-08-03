import React, { Component } from 'react'

 class SingleRecipe extends Component {
    render() {
        return (
            <div>
              <form onSubmit={this.props.updateFun}>
                  
                  <input type="text"  name="image"defaultValue={this.props.image}/>
                  <input type="text"  name="label"defaultValue={this.props.label}/>
                  <input type="text"  name="source"defaultValue={this.props.source}/>
                  <input type="submit"/>
                  </form>  
            </div>
        )
    }
}

export default SingleRecipe
