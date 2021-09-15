const socketio = require('socket.io')
const {
    getOngoinMeetingById,
    joinMeeting,
    endMeeting,
    leaveMeeting,
} = require('./ongoing-meeting-service');

const socket = {
    configure: function (server) {
        console.log(server, 'server');
        const io = socketio(server, {
            path: '/api/sockets/',
            maxHttpBufferSize: 1e8,
            cors: {
                origin: ["https://vfield.co"],
                allowedHeaders: ["my-custom-header"],
                credentials: true
            }
            // wsEngine: require("eiows").Server
        });
        io.on('connection', (socket) => {
            console.log('socket connect');
            socket.on('disconnecting', () => {
                console.log('dicontecting called');
                Object.keys(socket.rooms).forEach((meetingId) => {
                    console.log(meetingId, 'meeting ids');
                    const meeting = getOngoinMeetingById(meetingId);
                    console.log(meeting, 'meetings');

                    if (meeting) {
                        const user = meeting.users.find((user) => user.socketId == socket.id);
                        // console.log(user, 'user ois disconeting');

                        meeting.users.splice(meeting.users.indexOf(user), 1);
                        // console.log(meeting, 'meeeting final after reload');

                        socket.broadcast.to(meetingId).emit('left', { user });
                    }
                });
            });

            socket.on('join', ({ username, meetingId }, callback) => {
                const meeting = joinMeeting(meetingId, username, socket.id);
                const user = meeting.users.find((u) => u.socketId == socket.id);
                socket.join(meetingId);
                socket.broadcast.to(meetingId).emit('joined', { user });
                callback(meeting);
            });

            socket.on('leave', ({ username, meetingId }) => {
                const { meeting, user } = leaveMeeting(meetingId, username, socket.id);

                if (meeting) {
                    socket.leave(meetingId);
                    socket.broadcast.to(meetingId).emit('left', { user });

                    // console.log(!meeting.users.length, 'meeting.users.length');
                    if (!meeting.users.length) {
                        endMeeting(meetingId);
                    }
                }
            });

            socket.on('meeting-end', ({ meetingId }) => {
                endMeeting(meetingId);
                socket.broadcast.to(meetingId).emit('meeting-ended', {});
            });

            socket.on('make-offer', function ({ offer, to }) {
                console.log(offer, 'offer');
                console.log(to, 'to');
                console.log(socket, 'socket');

                socket.to(to).emit('offer-made', { offer, by: socket.id });
            });

            socket.on('make-answer', function ({ answer, to }) {
                socket.to(to).emit('answer-made', { answer, by: socket.id });
            });

            socket.on('p1-ice-candidate', function ({ candidate, to }) {
                if (socket.id === to) { return; }
                socket.to(to).emit('p2-ice-candidate', { candidate, by: socket.id });
            });

            socket.on('p2-ice-candidate', function ({ candidate, to }) {
                if (socket.id === to) { return; }
                socket.to(to).emit('p1-ice-candidate', { candidate, by: socket.id });
            });
        });
    }
}

module.exports = socket;