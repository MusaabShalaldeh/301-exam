import React from "react";
import { Card, Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class FavoriteItem extends React.Component {
  updateThis = () => {
    const obj = {
      name: this.props.item.name,
      image: this.props.item.image,
      price: this.props.item.price,
      email: this.props.auth0.user.email,
      id: this.props.item._id,
    };
    this.props.updateThisItem(obj);
  };

  deleteThis = () => {
    const obj = {
      name: this.props.item.name,
      image: this.props.item.image,
      price: this.props.item.price,
      email: this.props.auth0.user.email,
      id: this.props.item._id,
    };

    this.props.deleteItem(obj);
  };

  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.item.image} />
        <Card.Body>
          <Card.Title>{this.props.item.name}</Card.Title>
          <Card.Text>Price: {this.props.item.price}</Card.Text>
          <Button variant="primary" onClick={this.updateThis}>
            Update
          </Button>
          <Button variant="btn btn-danger" onClick={this.deleteThis}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default withAuth0(FavoriteItem);
