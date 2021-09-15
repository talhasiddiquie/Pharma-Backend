import React, { useState, useEffect } from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import * as UserActions from '../../../config/Store/Actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';
import Chart from "react-google-charts";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment';
import * as RepresentativeActions from '../../../config/Store/Actions/representative.actions';
import * as CityActions from '../../../config/Store/Actions/city.action';
import * as ZoneActions from '../../../config/Store/Actions/zone.action';
import * as EmployeeAttendace from '../../../config/Store/Actions/attendaceEmployee.actions';
import * as UsersActions from '../../../config/Store/Actions/user.actions';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 200,
        width: "100%",
        marginTop: 20,
    },
    chartContainer: {
        height: '300px',
        margin: '50px',
        width: '300px'
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 140,
    },
    chartContainerDiv: {
        marginLeft: '50px',
        fontSize: 'xx-large'
    },
    barChartContainer: {
        margin: '30px',
        alignItems: 'justifyContent'
    }
}));

var data = [
    { value: 10, color: '#000' },
    { value: 15, color: '#a00000' },
    { value: 20, color: '#00aeef' },
];

function Dashboard() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const user = useSelector((state) => state.user.user);
    const userLogedIn = useSelector((state) => state.user.userLogedIn);
    const allRepresentatives = useSelector((state) => state.representative.allRepresentatives);
    const allCities = useSelector((state) => state.city.allCities);
    const allZone = useSelector((state) => state.zone.allZones);

    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        var userLogIn = location.state
        if (userLogIn !== "" && userLogIn !== undefined) {

            //attendace not completed set first you should check today attendance is store or nor then add the attendance
            if (userLogedIn) {
                if (!allRepresentatives) {
                    dispatch(RepresentativeActions.get_all_representatives())
                }
                if (!allCities) {
                    dispatch(CityActions.get_cities())
                }
                if (!allZone) {
                    dispatch(ZoneActions.get_zones())
                }

                var startTime = moment().format('HH:mm');
                var todayDate = moment().format('DD-MM-YYYY');
                let obj = {
                    designation: user.designation,
                    designationId: user.designationId,
                    empEmail: user.email,
                    employeeName: user.name,
                    employeeRole: user.role,
                    employeeUserId: user._id,
                    status: 'P',
                    startTime: startTime,
                    todayDate: todayDate,
                }

                var zoneName = '';
                //matched rep data wit user
                for (var key in allRepresentatives) {
                    if (allRepresentatives[key].representativeId === user._id) {
                        var zonesId = allRepresentatives[key].zoneId;
                        //get rep city name
                        for (var city in allCities) {
                            if (allCities[city]._id === allRepresentatives[key].headquarterId) {
                                obj.cityName = allCities[city].name;
                                obj.cityId = allCities[city]._id
                            }
                        }
                        //get rep zones name
                        for (var i = 0; i < zonesId.length; i++) {
                            for (var zone in allZone) {
                                if (allZone[zone]._id === zonesId[i]) {
                                    if (zoneName !== "") {
                                        zoneName = zoneName + ',' + allZone[zone].name;
                                    }
                                    else {
                                        zoneName = allZone[zone].name
                                    }
                                }
                            }
                        }
                    }
                }
                obj.zoneName = zoneName;
                obj.zonesIds = zonesId;
                
                dispatch(EmployeeAttendace.add_employee_attendance(obj))
                dispatch(UsersActions.user_loged_in_checked())
            }
        }

        if (!refresh) {
            dispatch(UserActions.all_users());
            setRefresh(true)
        }
    })

    return (
        user && user.email !== undefined ?
            <>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="javascript:void(0)" onClick={() => { history.push('/dashboard') }}>
                        Home
                    </Link>
                    <Typography color="textPrimary">Dashboard</Typography>
                </Breadcrumbs>

                <Card className={classes.root}>
                    <CardContent>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span
                                style={{
                                    color: 'black',
                                    fontSize: 'xxx-large'
                                }}
                            >
                                Dashboard

                            </span>
                        </div>
                    </CardContent>

                    <Grid container className={classes.root} spacing={3}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={2} style={{ alignItems: "center" }}>

                                <FormControl variant="outlined" className={classes.formControl}>
                                    <div class="wrapper count-title d-flex">
                                        <div class="icon"><i class="icon-user"></i></div>
                                        <div class="name"><strong class="text-uppercase">New Clients</strong>
                                            <div class="count-number">10</div>
                                        </div>
                                    </div>
                                </FormControl>

                                <FormControl variant="outlined" className={classes.formControl}>
                                    <div class="wrapper count-title d-flex">
                                        <div class="icon"><i class="icon-padnote"></i></div>
                                        <div class="name"><strong class="text-uppercase">Total Repersentative</strong>
                                            <div class="count-number">15</div>
                                        </div>
                                    </div>
                                </FormControl>


                                <FormControl variant="outlined" className={classes.formControl}>
                                    <div class="wrapper count-title d-flex">
                                        <div class="icon"><i class="icon-check"></i></div>
                                        <div class="name"><strong class="text-uppercase">Surveys</strong>
                                            <div class="count-number">5</div>
                                        </div>
                                    </div>
                                </FormControl>

                                <FormControl variant="outlined" className={classes.formControl}>
                                    <div class="wrapper count-title d-flex">
                                        <div class="icon"><i class="icon-bill"></i></div>
                                        <div class="name"><strong class="text-uppercase">PV-Reported</strong>
                                            <div class="count-number">12</div>
                                        </div>
                                    </div>
                                </FormControl>

                                <FormControl variant="outlined" className={classes.formControl}>
                                    <div class="wrapper count-title d-flex">
                                        <div class="icon"><i class="icon-list"></i></div>
                                        <div class="name"><strong class="text-uppercase">Total Plan Calls</strong>
                                            <div class="count-number">100</div>
                                        </div>
                                    </div>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid xs={2} sm={2}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel id="Filter">Filter</InputLabel>

                                <Select
                                    labelId="Filter"
                                    label="Filter"
                                    name='Filter'
                                    fullWidth
                                >
                                    <MenuItem value={'Y-T-D'}>
                                        Y-T-D
                                        </MenuItem>
                                    <MenuItem value={'M-T-D'}>
                                        M-T-D
                                        </MenuItem>
                                    <MenuItem value={'Today'}>
                                        Today
                                </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={5} sm={5}>
                            <div className={classes.chartContainerDiv}>
                                Attendance
                                </div>
                            <PieChart
                                className={classes.chartContainer}
                                data={data}
                            />

                        </Grid>
                        <Grid xs={5} sm={5}>
                            <div className={classes.chartContainerDiv}>
                                Visit
                                </div>
                            <PieChart
                                className={classes.chartContainer}
                                data={data}
                            />

                        </Grid>

                        <Grid xs={12}>
                            <Chart
                                className={classes.barChartContainer}
                                width={'1000px'}
                                height={'400px'}
                                chartType="Bar"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Months', 'Exen-D', 'X-Bone', 'Envera'],
                                    ['Aug', 1030, 540, 350],
                                    ['SEPT', 1000, 400, 200],
                                    ['OCT', 1170, 460, 250],
                                    ['Nov', 660, 1120, 300],
                                ]}
                                options={{
                                    // Material design options
                                    chart: {
                                        title: 'Products Performance',
                                        // subtitle: 'Sales, Expenses, and Profit: 2017-2020',
                                    },
                                }}
                                // For tests
                                rootProps={{ 'data-testid': '2' }}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </>
            : null
    )
}

export default Dashboard