import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { settings, layout, InputContainer } from '@pie-lib/config-ui';
import PropTypes from 'prop-types';
import debug from 'debug';
import Typography from '@material-ui/core/Typography';
import EditableHtml from '@pie-lib/editable-html';
import GraphingConfig from './graphing-config';
import CorrectResponse from './correct-response';

const { Panel, toggle, radio, numberFields } = settings;
const log = debug('@pie-element:graphing:configure');

const styles = theme => ({
  title: {
    fontSize: '1.1rem',
    display: 'block',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  content: {
    marginTop: theme.spacing.unit * 2
  },
  promptHolder: {
    width: '100%',
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  prompt: {
    paddingTop: theme.spacing.unit * 2,
    width: '100%'
  },
});

export class Configure extends React.Component {
  static propTypes = {
    onModelChanged: PropTypes.func,
    onConfigurationChanged: PropTypes.func,
    classes: PropTypes.object,
    imageSupport: PropTypes.object,
    model: PropTypes.object.isRequired,
    configuration: PropTypes.object.isRequired,
  };

  static defaultProps = {
    classes: {}
  };

  constructor(props) {
    super(props);

    this.defaults = JSON.parse(JSON.stringify(props.model));
  }

  onRationaleChange = rationale => {
    const { onModelChanged, model } = this.props;

    onModelChanged({
      ...model,
      rationale
    });
  };

  onPromptChange = prompt => {
    const { onModelChanged, model } = this.props;

    onModelChanged({
      ...model,
      prompt
    });
  };

  render() {
    const {
      classes,
      model,
      configuration,
      onConfigurationChanged,
      onModelChanged,
      imageSupport,
    } = this.props;
    const config = model.graph;

    const {
      arrows,
      graphTitle,
      padding,
      labels,

      rationale,
      scoringType,
      studentInstructions,
      teacherInstructions,

      prompt = {}
    } = configuration;
    log('[render] model', model);

    return (
      <layout.ConfigLayout
        settings={
          <Panel
            model={model}
            configuration={configuration}
            onChangeModel={onModelChanged}
            onChangeConfiguration={onConfigurationChanged}
            groups={{
              'Item Type': {
                arrows: arrows.settings && toggle(arrows.label),
                'graphTitle.enabled': graphTitle.settings &&
                toggle(graphTitle.label, true),
                padding: padding.settings && toggle(padding.label),
                labels: labels.settings && toggle(labels.label),
                graph: numberFields('Graph Display Size', {
                  domain: {
                    label: 'Domain',
                    suffix: 'px',
                    min: 400,
                    max: 700
                  },
                  range: {
                    label: 'Range',
                    suffix: 'px',
                    min: 400,
                    max: 700
                  },
                })
              },
              'Properties': {
                'teacherInstructions.enabled': teacherInstructions.settings &&
                toggle(teacherInstructions.label, true),
                'studentInstructions.enabled': studentInstructions.settings &&
                toggle(studentInstructions.label, true),
                'rationale.enabled': rationale.settings &&
                toggle(rationale.label, true),
                scoringType: scoringType.settings &&
                radio(scoringType.label, ['auto', 'rubric']),
              },
            }}
          />
        }
      >
        <div className={classes.content}>
          <Typography component="div" type="body1">
            <span>
              This interaction asks a student to draw a line that meets specific criteria.
              The student will draw the line by clicking on two points on the graph.
            </span>
          </Typography>

          {prompt.settings && (
            <InputContainer
              label={prompt.label}
              className={classes.promptHolder}
            >
              <EditableHtml
                className={classes.prompt}
                markup={model.prompt}
                onChange={this.onPromptChange}
                imageSupport={imageSupport}
                nonEmpty={!prompt.settings}
                disableUnderline
              />
            </InputContainer>
          )}

          {rationale.enabled && (
            <InputContainer
              label={rationale.label || 'Rationale'}
              className={classes.promptHolder}
            >
              <EditableHtml
                className={classes.prompt}
                markup={model.rationale || ''}
                onChange={this.onRationaleChange}
                imageSupport={imageSupport}
              />
            </InputContainer>)
          }

          <GraphingConfig
            authoringEnabled={configuration.authoring && configuration.authoring.enabled}
            config={config}
            model={model}
            onChange={this.props.onModelChanged}
          />

          <CorrectResponse
            config={config}
            model={model}
            onChange={this.props.onModelChanged}
          />
        </div>
      </layout.ConfigLayout>
    );
  }
}

export default withStyles(styles)(Configure);
