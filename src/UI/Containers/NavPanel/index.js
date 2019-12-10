import React from 'react';
import { debounce } from '../../../static/utils';
import styles from './style.scss';

class NavPanel extends React.Component {
    constructor(props) {
        super(props);
        const { child } = props;
        const { searchImgs, searchTags } = child;
        this.state = {
            debImg: debounce(searchImgs, 300),
            debTags: debounce(searchTags, 300),
            sortArrowLikes: undefined,
            sortArrowComments: undefined,
        };
        this.inputRefTag = React.createRef();
        this.inputRefSearch = React.createRef();
    }

      debounsedSearchImg(e) {
        const { debImg } = this.state;
        const { target } = e;
        const { value } = target;
        debImg(value);
        this.setState({
            sortArrowLikes: undefined,
            sortArrowComments: undefined,
        });
      }

      debounsedSearchTags(e) {
        const { debTags } = this.state;
        const { target } = e;
        const { value } = target;
        debTags(value);
        this.setState({
            sortArrowLikes: undefined,
            sortArrowComments: undefined,
        });
      }

      focus(ref) {
        ref.classList.add(styles.inputTitleActive);
      }

      blur(ref, e) {
          const { value } = e.currentTarget;
          if (!value.trim()) {
            ref.classList.add(styles.inputTitleBeforeRemove);
            ref.classList.remove(styles.inputTitleActive);
            setTimeout(() => {
                ref.classList.remove(styles.inputTitleBeforeRemove);
            }, 400);
          }
      }

    render() {
        const { child } = this.props;
        const { sortingImgsBy, img } = child;
        const { sortArrowComments, sortArrowLikes } = this.state;
        return (
            <nav className={styles.nav}>
                <div className={styles.button_block}>
                    <button
                      type='button'
                      className={styles.button}
                      onClick={() => {
                                    sortingImgsBy(img, 'likes');
                                    this.setState(prevState => ({
                                        sortArrowLikes: !prevState.sortArrowLikes,
                                        sortArrowComments: undefined,
                                    }));
                                }
                            }
                    >
                        Sort by likes
                        {
                            sortArrowLikes !== undefined
                            ? (
                                <i
                                  className={`fas fa-sort-up ${
                                            sortArrowLikes
                                            ? styles.arrowRotate
                                            : styles.arrowDefault
                                        }`
                                    }
                                />
                                )
                            : null
                        }
                    </button>
                    <button
                      type='button'
                      className={styles.button}
                      onClick={() => {
                                sortingImgsBy(img, 'comments');
                                this.setState(prevState => ({
                                        sortArrowComments: !prevState.sortArrowComments,
                                        sortArrowLikes: undefined,
                                    }));
                        }}
                    >
                        Sort by comments
                        {
                            sortArrowComments !== undefined
                            ? (
                                <i className={`fas fa-sort-up ${
                                        sortArrowComments
                                        ? styles.arrowRotate
                                        : styles.arrowDefault
                                        }`
                                    }
                                />
                                )
                            : null
                        }
                    </button>
                </div>
                <div className={styles.input_block}>
                    <div className={styles.input_wrapper}>
                        <span
                          ref={this.inputRefTag}
                          className={styles.inputTitle}
                        >
                            Search by name
                        </span>
                        <div className={styles.field_wrapper}>
                            <input
                              className={styles.input}
                              type='search'
                              onKeyUp={e => this.debounsedSearchImg(e)}
                              onFocus={() => this.focus(this.inputRefTag.current)}
                              onBlur={(e) => { this.blur(this.inputRefTag.current, e); }}
                            />
                            <div className={styles.underline} />
                        </div>
                    </div>
                    <div className={styles.input_wrapper}>
                        <span
                          ref={this.inputRefSearch}
                          className={styles.inputTitle}
                        >
                            Search by tag
                        </span>
                        <div className={styles.field_wrapper}>
                            <input
                              className={styles.input}
                              type='search'
                              onKeyUp={e => this.debounsedSearchTags(e)}
                              onFocus={() => this.focus(this.inputRefSearch.current)}
                              onBlur={e => this.blur(this.inputRefSearch.current, e)}
                            />
                            <div className={styles.underline} />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavPanel;
