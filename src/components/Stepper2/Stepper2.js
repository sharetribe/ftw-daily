import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NamedLink } from '../../components';
import css from './Stepper2.css';
import { FaSearchLocation } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { IconContext } from "react-icons";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <FaHome className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      background: '#41a6df',
    },
  },
  completed: {
    '& $line': {
      background: '#41a6df',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 55,
    height: 55,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    background: '#41a6df',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    background: '#41a6df',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <FaSearchLocation size={27} />,
    2: <FaCalendarCheck size={27} className={css.calendarIcon} />,
    3: <FaHome size={28} />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    <span className={css.stepTitle}>Choose Pet Sitter</span>,
    <span className={css.stepTitle}>Book Pet Sitter</span>,
    <span className={css.stepTitle}>Pets are Happy at Home</span>,
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <p>We offer a wider choice of local, national and international pet sitters.</p>;
    case 1:
      return (
        <p>
          Book your Pet Sitter using our secure payment provider. All bookings are covered by 24/7
          Vet Advice and Emergency Insurance.
        </p>
      );
    case 2:
      return (
        <p>
          Your Pet stays home with our verified Pet Sitter, happy and secure in their own familiar
          space.
        </p>
      );
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(3);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <div className={css.disable}>
        <Stepper
          className={css.class}
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={css.flexContainer}>
          <div className={css.flexItem}>
            <span>
              Trust My Pet Sitter introduces a wider choice of local, national and international pet
              sitters.
            </span>
          </div>
          <div className={css.flexItem}>
            <span>
              Book your Pet Sitter using our secure payment provider. All bookings are covered by
              24/7 Vet Advice and Emergency Insurance.
            </span>
          </div>
          <div className={css.flexItem}>
            <span>
              Your Pet stays home with our verified Pet Sitter, happy and secure in their own
              familiar space.
            </span>
          </div>
        </div>
        <div className={css.lastbtn}>
          <NamedLink name="SignupPage">Start Now</NamedLink>
        </div>
      </div>
    </div>
  );
}
