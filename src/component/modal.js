import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [userData,setUserData] = React.useState({})

  useEffect(() => {
    let url = `https://reqres.in/api/users/${props.id}`
    fetch(url, {
        method: "get",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then((res) => { return res.json() }
        )
        .then((response, error) => {
            console.log(response)
            setUserData(response.data)

        })
        .catch((error) => console.log(error))
});

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.change(props.id,false)
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
            {Object.keys(userData).length>0&&<div className="user-profile">
            <h3>{userData.first_name+" "+userData.last_name}</h3>
                <img src={userData.avatar}></img>
                <p>{userData.email}</p>
                </div>}
         
        </List>
      </Dialog>
    </div>
  );
}