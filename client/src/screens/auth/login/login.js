import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as Actions from '../../../config/Store/Actions/user.actions';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://i.ibb.co/XCV0qgy/conference-bridge.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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

}));

export default function Login(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {
        let obj = {
            email: email,
            password: password
        }

        dispatch(Actions.login_user(obj))
        dispatch(Actions.user_loged_in())
    }

    useEffect(() => {
        if (user && user.email !== undefined) {
            dispatch(Actions.all_users())
            props.history.push(
                {
                    pathname: `/dashboard`,
                    state: "user come from login"
                }
            )
        }


    }, [user])

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={false} md={7} className={classes.image}>

            </Grid>
            <img src={'https://i.ibb.co/sKLFVC4/logo.png'} className={'loginLogo'} />
            <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        SIGN IN
          </Typography>
                    <form className={classes.form} action={"javascript:void(0)"} onSubmit={() => { handleLogin() }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <Grid container>
                            <Grid item xs>
                                <Link href="JavaScript:void(0)" variant="body2">
                                    Forgot password?
                             </Link>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}