import React from 'react';
import styles from './style.scss';

export default function DatailHoc(Component) {
    return class extends React.PureComponent {
        render() {
            const { hits, path } = this.props;
            const {
                    downloads, favorites, user, views, pageURL, userImageURL,
                } = hits[0];

            return (
                <div className={styles.container}>
                    <div>
                        <div className={styles.details_container}>
                            <div className={styles.author_container}>
                                <div>
                                    <span>
                                        Author:
                                    </span>
                                    {' '}
                                    <span style={{ fontSize: '20px' }}>{ user }</span>
                                </div>
                                <img className={styles.author_img} src={userImageURL} alt='img' />
                            </div>
                            <div className={styles.info}>
                                <span className={styles.detail_info}>
                                    Downloads:
                                    {downloads}
                                </span>
                                <span className={styles.detail_info}>
                                    Favorites:
                                    {favorites}
                                </span>
                                <span className={styles.detail_info}>
                                    Views:
                                    {views}
                                </span>
                                <a href={pageURL} className={styles.detail_info}>
                                    More info
                                </a>
                            </div>
                        </div>
                        <div className={styles.component_wrapper}>
                            <Component child={{ img: hits, path }} />
                        </div>
                    </div>
                </div>
            );
        }
    };
}
