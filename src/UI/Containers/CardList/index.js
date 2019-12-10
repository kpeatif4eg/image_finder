import React from 'react';
import { connect } from 'react-redux';
import CardItem from '../../Components/CardItem';
import { changeTags, isEditTagsHandler } from '../../../Business/actions';

class CardList extends React.Component {
    static objToArr(obj) {
        if (obj === Object(obj)) {
            const arr = [];
            const keys = Object.keys(obj);
            keys.forEach((key) => {
                arr.push(obj[key]);
            });
            return arr;
        }
        return null;
    }

    constructor(props) {
        super(props);
        this.changedTags = this.changedTags.bind(this);
    }


    changedTags(tags, id) {
        const { child, changeTags } = this.props;
        const { img } = child;
        if (!Object.keys(tags).length) {
            return;
        }
        const newState = img.map((item) => {
            if (item.id === id) {
                let counter = 0;
                const keys = Object.keys(item);
                for (let i = 0; i < keys.length; i += 1) {
                    keys[i] = tags[counter];
                    counter += 1;
                }
                return item;
            }
            return item;
        });
        const state = newState.slice();
        changeTags(state);
    }

    render() {
        const { props, changedTags } = this;
        const { isEditTagsHandler } = props;
        return (
            <CardItem
              {...props}
              changedTags={changedTags}
              isEditTags={isEditTagsHandler}
            />
        );
    }
}

export default connect(
    store => ({
        isTags: store.IsEditTags,
    }),
    {
        isEditTagsHandler,
        changeTags,
    },
)(CardList);
