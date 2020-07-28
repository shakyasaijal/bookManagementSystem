import React from 'react';
import PopularBooks from '../../components/PopularBooks';
import LatestBooks from './Components/LatestBooks';
import { loadNotification, clearNotification } from '../../actions/notification';
import { clearNotificationStarter } from '../../actions/auth';
import { connect } from 'react-redux';

const Home = props => {
    React.useEffect(() => {
        if (props.notification) {
            if (props.notification != "Data not found") {
                props.clearNotificationStarter();
                props.clearNotification();
            }
        }
    }, [props]);

    return (
        <>
            {props.flash && <div className={props.type ? "success" : "invalid"}>{props.flash}<div className="close" onClick={props.clearNotification}>x</div></div>}
            <PopularBooks />
            <LatestBooks />
        </>
    );
}


const mapStateToProps = state => ({
    notificationType: state.auth.notificationType,
    notification: state.auth.notification,
    flash: state.notification.notification,
    type: state.notification.type
});

export default connect(mapStateToProps, { loadNotification, clearNotification, clearNotificationStarter })(Home);
