import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Payvand Group {new Date().getFullYear()}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignIn() {
  const classes = useStyles()
  let history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [open, setOpen] = React.useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const handleChangeUsername = e => {
    const value = e.currentTarget.value
    setUsername(value)
  }
  const handleChangePassword = e => {
    const value = e.currentTarget.value
    setPassword(value)
  }
  const onLogin = e => {
    e.preventDefault()
    fetch('/api/1.0/auth', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Basic ${btoa(username + ':' + password)}`,
      },
    })
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            'tut response Looks like there was a problem. Status Code: ' +
              response.status,
          )
          setOpen(true)
          // return
        }

        if (response.status === 200) {
          // ставим флажок, что пользователь зарегистрирован
          localStorage.setItem('isLoggedIn', true)
          history.push('/tickets')
        }
        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data)
          localStorage.setItem("authData", JSON.stringify(data.user))
        })
      })
      .then(function(response) {})
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        )
        // console.log('was doljen bit alert')

        // return <Alert severity="error">This is an error message!</Alert>
      })
    // localStorage.setItem('isLoggedIn', true)
    // history.push('/')
  }

  return (
      <Container component="main" maxWidth="xs">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ top: '30%' }}
      >
        <Alert severity="error" onClose={handleClose}>
          Неправильный логин или пароль!
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход в <b>HELPDESK</b>
        </Typography>
        <form className={classes.form} noValidate onSubmit={onLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            // id="username"
            label="Логин"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChangeUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            // id="password"
            autoComplete="current-password"
            onChange={handleChangePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Запомнить меня"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
