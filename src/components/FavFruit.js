import React from 'react';
import axios from 'axios';
import {Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from "@auth0/auth0-react";
import UpdateModal from './UpdateModal';
import FavoriteItem from './ItemComponents/FavoriteItem';

class FavFruit extends React.Component {

  constructor(props){
    super(props)

    this.state={
      favoriteItemsArray: []
    }
  }

  componentDidMount=()=>{
    const url = `http://localhost:3010/getFavoriteFruits?email=${this.props.auth0.user.email}`;
    console.log(url);
    axios
    .get(url)
    .then(result=>{
      this.setState({
        favoriteItemsArray: result.data
      })
      console.log(result.data)
    })
    .catch(err=>{
      console.log(err);
    })
  }

  updateThisItem=(object)=>{
    const id= object.id;
    const url = `http://localhost:3010/updateFavoriteItem/${id}`;

    axios
    .put(url,object)
    .then(result=>{
      this.setState({
        favoriteItemsArray: result.data,
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  deleteItem=(object)=>{
    const id= object.id;
    const url = `http://localhost:3010/deleteItem/${id}`;
    axios
    .delete(url,object)
    .then(result=>{
      this.setState({
        favoriteItemsArray: result.data,
      })
    })
    .catch(err=>{
      console.log(err);
    })

  }

  render() {
    return(
      <>
      <UpdateModal />
        <h1>My Favorite Fruits</h1>
        <Row>
          {this.state.favoriteItemsArray.length > 0 && this.state.favoriteItemsArray.map(item=>{
            return <FavoriteItem item={item} updateThisItem={this.updateThisItem} deleteItem={this.deleteItem}/>
          })}
        </Row>
      </>
    )
  }
}

export default withAuth0(FavFruit);
