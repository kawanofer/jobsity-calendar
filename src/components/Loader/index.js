import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// import theme from '~/assets/theme/HBTheme'

const styles = theme => ({
    progress: {
        textAlign: 'center',
        position: 'fixed',
        left: '50%',
        top: '50%',
        overflow: 'hidden',
        zIndex: 9999,
        color: "#fff"
    }
});

function Loader(props) {
    const { classes } = props;
    return (
        <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 5000,
            display: props.active ? "block" : "none"
        }}>
            <CircularProgress className={classes.progress} size="100px" />
        </div>
    );
}

export default withStyles(styles)(Loader);
