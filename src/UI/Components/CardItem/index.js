import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './style.scss';
import { tagsParser } from '../../../static/utils';

const FieldsStore = (props) => {
    const { defaultValue, collect, index } = props;
    function setCollect(e) {
        collect(e, index);
    }
    setCollect(defaultValue, index);
    return (
        <>
            <span>
                {defaultValue.key}
                :
            </span>
            <input
              type='text'
              defaultValue={defaultValue.value}
              onChange={e => setCollect(e.target.value)}
            />
        </>
   );
};

const CardContent = (props) => {
    const { cardRequire } = props;
    const {
            previewURL, webformatURL, tags, likes, comments, id, user,
        } = cardRequire;
    const { imgView } = props;
    let styleImg;
    let styleWrapper;
    if (imgView === 'preview') {
        styleImg = styles.img_prev;
        styleWrapper = styles.preview_wrapper;
    } else {
        styleImg = styles.img_default;
        styleWrapper = styles.default_wrapper;
    }
    const propsArr = () => {
        const propsArray = [];
        const keys = Object.keys(cardRequire);
        keys.forEach((key) => {
            propsArray.push({
                            value: cardRequire[key],
                            key,
                        });
        });
        return propsArray;
    };
    const {
            path, layout, foo, collector,
        } = props;
    const [isEditTags, tagsHandle] = useState(null);
    if (isEditTags !== null) {
        foo(id);
    }

    return (
        <div
          className={styles.card}
          key={id}
          onDoubleClick={() => tagsHandle(!isEditTags)}
        >
            <Link
              to={path || `/about${id}`}
              className={styles.link}
            >
                <div className={styleWrapper}>
                    <img
                      className={styleImg}
                      src={layout === 'grid'
                          ? previewURL
                          : webformatURL
                      }
                      alt={`by ${user}`}
                    />
                </div>
            </Link>
            <div
              className={styles.tags_container}
            >
                {
                    isEditTags
                    ? (
                        propsArr().map((item, index) => (
                            <FieldsStore
                              defaultValue={item}
                              key={item}
                              index={index}
                              collect={collector}
                            />
                        )))
                        : tagsParser(tags).map(item => (
                            <span
                              className={styles.tag}
                              key={item}
                            >
                                {item}
                            </span>
                        ))
                }
            </div>
            <div className={styles.commentsAmount}>
                <span>
                    <i className="far fa-comments" />
                    {' '}
                    <span>{comments}</span>
                </span>
                <br />
                <span>
                    <i className="far fa-thumbs-up" />
                    {' '}
                    <span>{likes}</span>
                </span>
            </div>
        </div>
    );
};

 const CardItem = (props) => {
    const { child, changedTags } = props;
    const { img, layout } = child;
    const Memo = React.memo(CardContent);
    const inputCollector = () => {
        const obj = {};
        return (str, index) => {
            if (!str) {
                return obj;
            }
            obj[index] = str.value;
            return null;
        };
    };
    const collect = inputCollector();
    const collectHandler = (id) => {
        changedTags(collect(), id);
    };
    return (
        <div
          className={
              layout === 'grid'
              ? `list_RT ${styles.container_grid}`
              : `list_RT ${styles.container_flex}`
          }
        >
            <TransitionGroup component={null}>
                {
                    img.length
                    ? img.map(item => (
                        <CSSTransition
                          key={item.id}
                          timeout={500}
                          classNames='TR_item'
                        >
                            <Memo
                              key={item.id}
                              cardRequire={item}
                              {...child}
                              foo={collectHandler}
                              collector={collect}
                            />
                        </CSSTransition>
                    )) : (
                        <CSSTransition timeout={100}>
                            <div className={styles.no_found}>
                                <span className={styles.no_results_message}>
                                    No results
                                </span>
                                <i className="fas fa-times" />
                            </div>
                        </CSSTransition>
                    )
                }
            </TransitionGroup>
        </div>
    );
};

export default CardItem;
