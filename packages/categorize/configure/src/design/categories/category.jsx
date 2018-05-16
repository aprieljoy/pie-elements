import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import InputHeader from '../input-header';
import CardActions from '@material-ui/core/CardActions';
import { DeleteButton } from '../buttons';

import PlaceHolder from './droppable-placeholder';

export class Category extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    category: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteChoice: PropTypes.func,
    onAddChoice: PropTypes.func
  };

  static defaultProps = {};

  changeLabel = l => {
    const { category, onChange } = this.props;
    category.label = l;
    onChange(category);
  };

  render() {
    const {
      category,
      classes,
      className,
      onDelete,
      onDeleteChoice,
      onAddChoice
    } = this.props;

    return (
      <Card className={classNames(classes.category, className)}>
        <InputHeader
          label={category.label}
          onChange={this.changeLabel}
          onDelete={onDelete}
        />
        <PlaceHolder
          className={classes.placeHolder}
          choices={category.choices}
          onDeleteChoice={onDeleteChoice}
          onDropChoice={onAddChoice}
          categoryId={category.id}
        />
        <CardActions className={classes.actions}>
          <DeleteButton label={'delete'} onClick={onDelete} />
        </CardActions>
      </Card>
    );
  }
}
const styles = theme => ({
  placeHolder: {
    minHeight: '100px'
  },
  deleteButton: {
    margin: 0
  },
  actions: {
    padding: 0,
    paddingBottom: 0,
    paddingTop: theme.spacing.unit
  },
  iconButtonRoot: {
    width: 'auto',
    height: 'auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  category: {
    padding: theme.spacing.unit
  },
  editor: {
    flex: '1',
    paddingBottom: theme.spacing.unit * 2
  }
});
export default withStyles(styles)(Category);
