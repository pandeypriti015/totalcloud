import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Modal from './modal'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
   
  },
  gridList: {
    width: 800,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [id,setId] = React.useState(0)
  const handleClickOpen = (id,bool) => {
      console.log(id)
    setOpen(bool);
    setId(id)
  };

  let tileData=props.data

  return (<React.Fragment>
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
        <GridListTile key={tile.avatar} onClick={()=>handleClickOpen(tile.id,true)} >
            <img src={tile.avatar} alt={tile.title} />
            <GridListTileBar
              title={tile.first_name +" "+tile.last_name}
              subtitle={<span>email: {tile.email}</span>}
             
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
    {open&&<Modal change={handleClickOpen} id={id} ></Modal>}
    </React.Fragment>
  );
}