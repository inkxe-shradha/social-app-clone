import { Button, Dialog, DialogActions, DialogTitle, withStyles } from '@material-ui/core';
import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import CustomButton from '../../utils/CustomButton';
import { DeleteOutline } from '@material-ui/icons';
import { deleteScream } from '../../redux/action/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
}


const DeleteScream = (props) => {
    const [open, setStateOpen] = useState(false);
    const { classes } = props;
    const handleOpen = () => {
        setStateOpen(true);
    }
    
    const handleClose = () => {
        setStateOpen(false);
    }
    const removeScream = () => {
        props.deleteScream(props.screamId);
        setStateOpen(false);
    }
    return (
        <div>
            <Fragment>
                <CustomButton tipe="Delete Scream" onClick={handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary" />
                </CustomButton>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Are you sure you want to delete this scream ?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancle
                        </Button>
                        <Button onClick={removeScream} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        </div>
    )
}
DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}
const mapDispatchToProps = (dispatch) => ({
    deleteScream: (screamId) => dispatch(deleteScream(screamId))
})
export default connect(null, mapDispatchToProps)(withStyles(styles)(DeleteScream));
