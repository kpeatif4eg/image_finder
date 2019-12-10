import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../CardList';
import NavPanel from '../NavPanel';
import Spinner from '../../Components/Spinner';
import styles from './style.scss';
import {
        getImgs, sortImagesBy, sortOrder, searchImgs, searchTags, changeStore,
    } from '../../../Business/actions';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.sortingImgsBy = this.sortingImgsBy.bind(this);
        this.searchTags = this.searchTags.bind(this);
    }

    search(item) {
        const { searchImgs } = this.props;
        searchImgs(item);
    }

    sortingImgsBy(arr, type) {
        const {
            bySmaller, sortOrder, sortImagesBy,
        } = this.props;
        arr.sort((a, b) => {
            if (bySmaller) {
                return a[type] < b[type] ? 1 : -1;
            }
            return a[type] > b[type] ? 1 : -1;
        });
        sortOrder();
        const newArr = arr.slice();
        sortImagesBy(newArr);
    }

    searchTags(tag) {
        const croppedTag = tag.trim();
        const { defaultListOfImages, searchTags } = this.props;
        const state = defaultListOfImages;
        if (tag.length) {
            const selectedImgByTag = state.filter((item) => {
                const tagsAvailable = item.tags.split(',');
                for (let i = 0; i < tagsAvailable.length; i += 1) {
                    // проходим по всем доступным тегам в карточке
                    let n = 0;
                    for (; n < tagsAvailable[n].length; n += 1) {
                        // проходим по каждому тегу из доступных в карточке
                        const currentTag = tagsAvailable[n];
                        for (let x = 0; x < currentTag.length; x += 1) {
                        // перебираем отдельные части строки,
                        // длиной соответствующие длине введенного тэга
                            const z = tagsAvailable[n].slice(x, croppedTag.length + x);
                            if (z === croppedTag) {
                                return true;
                            }
                        }
                        if (tagsAvailable.length === n + 1) {
                            break;
                        }
                    }
                }
                return false;
             });
            searchTags(selectedImgByTag);
        } else {
            searchTags(state);
        }
    }

    render() {
        const { img, isLoad, error } = this.props;
        const { sortingImgsBy, search, searchTags } = this;
        return (
            <div className={styles.app_padding}>
                <NavPanel
                  child={
                    {
                        sortingImgsBy,
                        searchImgs: search,
                        searchTags,
                        img,
                    }
                  }
                />
                {
                    !isLoad
                    ? (
                        <CardList
                          child={
                              {
                                  img,
                                  layout: 'grid',
                                  imgView: 'preview',
                              }
                          }
                        />
                    )
                    : error.length !== 0
                    ? <span>{ error }</span>
                    : <Spinner />
                }
            </div>
        );
    }
}

export default connect(
    store => ({
        img: store.imgs,
        defaultListOfImages: store.defaultListOfImages,
        bySmaller: store.bySmaller,
        isLoad: store.isLoad,
        error: store.error,
    }),
    {
        sortImagesBy,
        sortOrder,
        searchImgs,
        getImgs,
        searchTags,
        changeStore,
    },
)(Cards);
