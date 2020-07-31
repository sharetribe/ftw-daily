import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  spacing: 5,
  typography: {
    fontFamily: 'Fira Sans, Helvetica, Arial, sans-serif'
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#5cbce0',
    },
    success: {
      main: '#5ce073'
    },
    error: {
      main: '#f4480e',
    },
    warning: {
      main: '#F2B63F'
    },
    background: {
      default: '#ffffff',
    },
  },
})

export default theme
