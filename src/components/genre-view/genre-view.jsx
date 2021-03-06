import React from 'react';
import PropTypes from 'prop-types';
import './genre-view.scss';
import {Container, Card, Row, Button} from 'react-bootstrap';


export class GenreView extends React.Component {

    render() {
        const { genre, movies } = this.props;

        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title style={{ textAlign: "center", fontSize: "36px", margin:"1rem"}}>Genre</Card.Title>
                        <Card.Text>
                            <span className="label">Name: </span>
                            <span className="value">{genre.Name}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="label">Description: </span>
                            <span className="value">{genre.Description}</span>
                        </Card.Text>

                        <Button
                    label="Back"
                    onClick={() => {
                      history.back();
                    }}
                    style={{ textAlign: "center" }}
                  >Back</Button>
                    </Card.Body>
                </Card>
                <Row style={{ textAlign: "center", fontSize: "36px", margin:"2rem", display:"grid"}}>
                    {movies.map(movie => (
                        <Card className="favorite-movie card-content" key={movie._id} style={{ margin:"2rem"}}>
                            <Card.Img
                                className="fav-poster"
                                variant="top"
                                src={movie.ImageURL} />
                            <Card.Body>
                                <Card.Title className="movie_title">
                                    {movie.Title}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        );
    }
}

GenreView.proptypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};
