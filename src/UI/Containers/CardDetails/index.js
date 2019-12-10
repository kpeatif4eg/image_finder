import React from 'react';
import { withRouter } from 'react-router-dom';
import CardItem from '../../Components/CardItem';
import Detail from '../../HOC/Detail';
import Spinner from '../../Components/Spinner';


 class Details extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
            imgId: props.match.params.id,
            targetImg: '',
        };
       this.fetchByImgId();
   }

    fetchByImgId() {
        const { imgId } = this.state;
        const fetchImages = fetch(`https://pixabay.com/api/?key=13936975-bc3855cc8c354f48fd7976a1b&id=${imgId}`);
        fetchImages.then(resp => resp.json())
        .then(resp => this.setState({ targetImg: resp }));
    }

    render() {
        const { targetImg } = this.state;
        const HOC = Detail(CardItem);
        return (
            <>
                {
                    targetImg
                    ? (
                        <HOC
                          path='/'
                          {...targetImg}
                        />
                    )
                    : <Spinner />
                }
            </>
        );
    }
}

export default withRouter(Details);
